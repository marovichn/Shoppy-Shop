"use client";

import Variant from "@/types";
import { FC } from "react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { MdCastForEducation } from "react-icons/md";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import Input from "@/components/inputs/Input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import Select from "@/components/inputs/Select";

interface AuthFormProps {
  initVariant: Variant;
}

const AuthForm: FC<AuthFormProps> = ({ initVariant }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [variant, setVariant] = useState(initVariant);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/");
    }
  }, [session?.status, router]);

  const handleVariant = () => {
    setVariant((p) => {
      if (p === "LOGIN") {
        return "REGISTER";
      } else {
        return "LOGIN";
      }
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      lastname: "",
      age: 18,
      gender: "",
      email: "",
      password: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    if (variant === "REGISTER") {
      axios
        .post("/api/register", data)
        .then(() =>
          signIn("credentials", {
            ...data,
            redirect: false,
          })
        )
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            toast.success("Successfully logged in!");
            router.push("/");
          }
        })
        .catch(() => {
          toast.error(
            "Something went wrong! Make sure you selected all the necessary fields."
          );
        })
        .finally(() => {
          setIsLoading(false);
        });
    }

    if (variant === "LOGIN") {
      signIn("credentials", {
        ...data,
        redirect: false,
      })
        .then((callback) => {
          if (callback?.error) {
            toast.error("Invalid credentials!");
          }

          if (callback?.ok) {
            toast.success("Successfully logged in!");
            router.push("/");
          }
        })
        .finally(() => setIsLoading(false));
    }
  };

  return (
    <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-xl'>
      <div
        className='
        bg-white
          px-[50px]
          py-16
          pb-20
          shadow
          sm:rounded-lg
          sm:px-6 relative
        '
      >
        <form className='space-y-6 ' onSubmit={handleSubmit(onSubmit)}>
          <div className='flex flex-col items-center justify-center gap-x-5 mb-10'>
            <div className='font-extrabold text-4xl'>Shoppy</div>
            <h2
              className=' 
            text-center 
            tracking-tight 
            text-gray-900
          '
            >
              {variant === "LOGIN"
                ? "Sign in to your account"
                : "Register for Shoppy"}
            </h2>
          </div>
          {variant === "REGISTER" && (
            <>
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id='name'
                label='Name'
              />
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id='lastname'
                label='Last Name'
              />
              <Input
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id='age'
                label='Age'
                type='number'
                min={18}
              />

              <Select
                name='gender'
                options={["Male", "Female", "Other"]}
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                id='gender'
                label='Gender'
              />
            </>
          )}
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='email'
            label='Email address'
            type='email'
          />
          <Input
            disabled={isLoading}
            register={register}
            errors={errors}
            required
            id='password'
            label='Password'
            type='password'
          />
          <div>
            <Button disabled={isLoading} type='submit'>
              {variant === "LOGIN" ? "Sign in" : "Register"}
            </Button>
          </div>
        </form>
        <div className='absolute bottom-3'>
          {variant === "LOGIN" ? (
            <>
              <span className='text-xs'>You do not have an account?</span>
              <span
                className='hover:underline block text-sm font-bold'
                onClick={handleVariant}
              >
                Register now!
              </span>
            </>
          ) : (
            <>
              <span className='text-xs'>You already have an account?</span>
              <span
                className='hover:underline block text-sm font-bold'
                onClick={handleVariant}
              >
                Log in
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
