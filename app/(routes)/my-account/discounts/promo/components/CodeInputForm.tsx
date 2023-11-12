"use client";

import { FC } from "react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import axios from "axios";

interface CodeInputFormProps {}

const CodeInputForm: FC<CodeInputFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const cart = useCart();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      userAccessCode: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    try {
      const promotion = await axios.post("/api/get-promocode-data", data);
      if(!promotion){
        toast.error("Invalid Code")
      }
      const currentUserPromotions = (await axios.post(
        "/api/check-promocodes"
      )) as any[];
      if (currentUserPromotions.length === 1) {
        toast.error(
          <div className='bg-white rounded-lg  flex items-center justify-center gap-x-4 transition pl-5'>
            <div>Deactivate first?</div>
            <Button
              className='bg-red-600 hover:bg-red-800'
              onClick={async () => {
                await axios.post("/api/delete-promocodes");
                cart.removeAll();
                toast.success("Removed successfully");
              }}
            >
              Yes
            </Button>
          </div>
        );
      }
      if (currentUserPromotions.length === 0) {
        await axios.post("/api/add-promocode", promotion);
        cart.addPromo(promotion);
        toast.success("Code activated!");
      }
    } catch (error) {
      toast.error("Code not valid");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-xl my-20 border-2 rounded-lg border-violet-700'>
      <div
        className='
        bg-white
          px-[50px]
          py-10
          pb-20
          shadow
          sm:rounded-lg
          sm:px-6 relative
        '
      >
        <form className='space-y-6 ' onSubmit={handleSubmit(onSubmit)}>
          <h1 className='text-3xl font-bold w-full flex items-center justify-center py-5'>
            Enter Promocode here
          </h1>
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='userAccessCode'
            label=''
            placeholder='XXXXXXXXXX'
          />
          <div>
            <Button
              disabled={isLoading}
              type='submit'
              className='flex items-center justify-center gap-x-5 w-full bg-violet-500 hover:bg-violet-700'
            >
              {!isLoading && "Enter code"}
              {isLoading && (
                <p className='border-b-4 border-white animate spin rounded-full h-5 w-5 animate-spin'></p>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CodeInputForm;
