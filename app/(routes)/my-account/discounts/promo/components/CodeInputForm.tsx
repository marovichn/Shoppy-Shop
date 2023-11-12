"use client";

import { FC, useEffect } from "react";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import useCart from "@/hooks/use-cart";
import toast from "react-hot-toast";
import axios from "axios";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

interface CodeInputFormProps {}

const CodeInputForm: FC<CodeInputFormProps> = ({}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isActivated, setIsActivated] = useState(false);
  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    axios
      .post("/api/check-promocodes")
      .then((dataRaw) => dataRaw.data)
      .then((data) => {
        if (data) {
          setIsActivated(true);
        } else {
          setIsActivated(false);
        }
      });
  }, []);

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
      console.log(promotion);
      if (!promotion.data) {
        toast.error("Invalid Code");
      }
      const currentUserPromotionsExist = await axios.post(
        "/api/check-promocodes"
      );
      if (currentUserPromotionsExist.data) {
        toast.error(
          <div className='bg-white rounded-lg  flex items-center justify-center gap-x-4 transition pl-5'>
            <div>Deactivate first?</div>
            <Button
              className='bg-red-600 hover:bg-red-800'
              onClick={async () => {
                await axios.post("/api/delete-promocodes");
                cart.removeAll();
                toast.success("Deactivated successfully");
                if (location) {
                  location.reload();
                }
              }}
            >
              Yes
            </Button>
          </div>
        );
      } else {
        await axios.post("/api/add-promocode", { promocode: promotion.data });
        cart.addPromo(promotion.data);
        toast.success("Code activated!");
        if (location) {
          location.reload();
        }
      }
    } catch (error: any) {
      if (error.response.status === 403) {
        toast.error("Code expired");
      } else {
        toast.error("Code not valid");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className={cn(
        "mt-8 sm:mx-auto sm:w-full sm:max-w-xl my-20 border-2 rounded-lg border-violet-700"
      )}
    >
      <div
        className='
        bg-white
          px-[50px]
          py-10
          pb-20
          shadow
          rounded-md
          sm:px-6 relative
          border-violet-700
          border-b-2
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
              {!isLoading && (
                <div className='flex items-center justify-center gap-x-1'>
                  Enter{"  "}
                  <span
                    className={cn("font-extrabold", {
                      hidden: !isActivated,
                    })}
                  >
                    NEW
                  </span>
                  code
                </div>
              )}
              {isLoading && (
                <p className='border-b-4 border-white animate spin rounded-full h-5 w-5 animate-spin'></p>
              )}
            </Button>
          </div>
        </form>
      </div>
      <div
        className={cn(
          "flex flex-col py-5  w-full justify-center items-center text-green-600 bg-lime-300 -mt-2 gap-y-3 rounded-b-md",
          {
            hidden: !isActivated,
          }
        )}
      >
        One code is already active!
        <div className='bg-white rounded-lg  flex items-center justify-center gap-x-4 transition pl-5 border-2 border-red-600'>
          <div className='text-red-500'>Deactivate first?</div>
          <Button
            className='bg-red-600 hover:bg-red-800'
            onClick={async () => {
              await axios.post("/api/delete-promocodes");
              cart.removeAll();
              toast.success("Deactivated successfully");
              if (location) {
                location.reload();
              }
            }}
          >
            Yes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CodeInputForm;
