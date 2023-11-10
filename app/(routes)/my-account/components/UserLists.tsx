"use client";
import {
  ArrowRightCircle,
  ArrowRightFromLine,
  Heart,
  ListChecks,
  Percent,
} from "lucide-react";
import { FC } from "react";
import Container from "@/components/ui/container";
import { Product } from "@/types";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserActionsProps {}

const UserActions: FC<UserActionsProps> = ({}) => {
  return (
    <Container>
      <div className='flex flex-col w-full h-full gap-y-2 items-start justify-center py-16 px-10'>
        <h1 className='text-2xl font-semibold mb-5'>Actions:</h1>
        <Link
          href='/my-account/favorites'
          className='bg-gray-50 p-3 flex items-center justify-start rounded-xl w-full hover:bg-gray-200 cursor-pointer px-6'
        >
          <h3
            className={`font-bold text-3xl max-sm:text-lg flex gap-x-2 py-5 items-center justify-between w-full`}
          >
            <div className='flex items-center justify-center gap-x-5'>
              <div className='p-3 bg-red-500/40 rounded-md'>
                <Heart className='text-red-500' />
              </div>
              Favorite Products
            </div>
            <ArrowRightCircle className='mt-1' />
          </h3>
        </Link>
        <Link
          href='/my-account/wishlist'
          className='bg-gray-50 p-3 flex items-center justify-start rounded-xl w-full hover:bg-gray-200 cursor-pointer px-6'
        >
          <h3
            className={`font-bold text-3xl max-sm:text-lg flex gap-x-2 py-5 items-center justify-between w-full`}
          >
            <div className='flex items-center justify-center gap-x-5'>
              <div className='p-3 bg-green-500/40 rounded-md'>
                <ListChecks className='text-green-500' />
              </div>
              My wishlist
            </div>
            <ArrowRightCircle className='mt-1' />
          </h3>
        </Link>
        <Link
          href='/my-account/discounts'
          className='bg-gray-50 p-3 flex items-center justify-start rounded-xl w-full hover:bg-gray-200 cursor-pointer px-6'
        >
          <h3
            className={`font-bold text-3xl max-sm:text-lg flex gap-x-2 py-5 items-center justify-between w-full`}
          >
            <div className='flex items-center justify-center gap-x-5'>
              <div className='p-3 bg-blue-500/40 rounded-md'>
                <Percent className='text-blue-500' />
              </div>
              Discounts
            </div>
            <ArrowRightCircle className='mt-1' />
          </h3>
        </Link>
        <div
          onClick={() => signOut()}
          className='bg-red-100 p-3 flex items-center justify-start rounded-xl w-full hover:bg-red-200 cursor-pointer px-6'
        >
          <h3
            className={`font-bold text-3xl max-sm:text-lg flex gap-x-2 py-5 items-center justify-between w-full`}
          >
            <div className='flex items-center justify-center gap-x-5 text-red-800'>
              Sign Out
            </div>
            <ArrowRightFromLine className='text-red-500' />
          </h3>
        </div>
      </div>
      {/*  <div className='pt-20 px-8'>
        <ProductList
          items={featuredProducts}
          title='Favorite Products:'
          favorite
        ></ProductList>
      </div>
      <div className='pt-14 px-8 mb-20'>
        <ProductList
          items={featuredProducts}
          title='Wishlist Products:'
          wish
        ></ProductList>
      </div> */}
    </Container>
  );
};

export default UserActions;
