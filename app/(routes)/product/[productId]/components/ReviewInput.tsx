"use client";

import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "./ReviewInputComponent";
import StarsSelect from "./StarsSelect";
import { Button } from "@/components/ui/button";
import { useSession } from "next-auth/react";
import { ArrowRightCircle } from "lucide-react";
import axios from "axios";

interface ReviewInputProps {
  productId: string;
}

const ReviewInput: FC<ReviewInputProps> = ({ productId }) => {
  const router = useRouter();
  const session = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState<number>(0);

  const onSubmit = async (values: FieldValues) => {
    try {
      setIsLoading(true);

      if (!session?.data?.user) {
        toast(
          <div className='flex items-center justify-center gap-x-4'>
            Login or register first!
            <Button
              onClick={() => router.push("/login")}
              className='rounded-full bg-green-500 hover:bg-green-300 py-6'
            >
              <ArrowRightCircle />
            </Button>
          </div>
        );
        return;
      }

      const data = {
        description: values.description,
        value: selectedValue.toString(),
        productId,
      };
      await axios.post("/api/post-review", data);

      toast.success("Review posted.");
      reset();
      router.refresh();
    } catch (err) {
      toast.error(`Something went wrong`);
    } finally {
      setIsLoading(false);
    }
  };

  const { register, handleSubmit, reset, formState } = useForm<FieldValues>({
    defaultValues: {
      value: "",
      description: "",
    },
  });
  return (
    <div className='border-[1px] border-black rounded-xl mt-10'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col items-left justify-center gap-y-6 p-5 pb-8'
      >
        <div
          className='flex md:items-center 
          items-start md:justify-between
        md:flex-row justify-center flex-col gap-y-5'
        >
          <h1 className='font-bold text-2xl'>Leave a review</h1>
          <StarsSelect onChange={(value: number) => setSelectedValue(value)} />
        </div>

        <Input
          id='description'
          disabled={isLoading}
          {...register("description", {
            required: true,
          })}
          placeholder='Best product i have ever bought...'
        />
        <Button
          disabled={isLoading}
          className='bg-black hover:bg-black/60 rounded-full'
        >
          Post
        </Button>
      </form>
    </div>
  );
};

export default ReviewInput;
