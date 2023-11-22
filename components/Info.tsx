"use client";

import {
  ArrowBigDownDash,
  ArrowBigDownIcon,
  ArrowBigUpDash,
  ArrowBigUpIcon,
  MinusCircle,
  PlusCircle,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";

import { Product } from "@/types";
import Currency from "./ui/Currency";
import { Button } from "./ui/button";
import useCart from "@/hooks/use-cart";
import { useState } from "react";
import toast from "react-hot-toast";
import ProductActions from "@/app/(routes)/product/[productId]/components/ProductActions";
import { useRouter } from "next/navigation";
import Link from "next/link";
import BrandCard from "./BrandCard";

interface InfoProps {
  data: Product;
  sessionEmail?: string;
  favorites?: any;
  wishlist?: any;
}

const Info: React.FC<InfoProps> = ({
  data,
  sessionEmail,
  favorites,
  wishlist,
}) => {
  const cart = useCart();
  const stockAmount = data?.stockAmount ? Number(data?.stockAmount) : 1;
  const [amountChosen, setAmountChosen] = useState(1);
  const [hidden, setHidden] = useState(false);
  const router = useRouter();

  const onAddToCart = () => {
    if (amountChosen > stockAmount || amountChosen <= 0) return;
    if (
      cart.items.filter((item: Product) => item.id === data.id).length ===
      stockAmount
    ) {
      return toast("Whole stock of this product is in cart.");
    }
    for (let i = 0; i < amountChosen; i++) {
      cart.addItem(data);
    }
    toast.success(`Added ${amountChosen} ${data.name}`);
  };

  const onAmountMinus = () => {
    setAmountChosen((p) => {
      if (p < 2) {
        return p;
      }
      return p - 1;
    });
  };

  const onAmountPlus = () => {
    setAmountChosen((p) => {
      if (p == stockAmount) {
        return p;
      }
      return p + 1;
    });
  };

  return (
    <div>
      <h1 className='text-3xl font-bold text-gray-900'>{data.name}</h1>
      <div className='mt-3 flex items-end justify-between'>
        <p className='text-2xl text-gray-900 flex gap-x-5 items-start justify-center'>
          <Currency value={data?.price} />
          {sessionEmail && (
            <ProductActions
              favorites={favorites}
              wishlist={wishlist}
              data={data}
            />
          )}
        </p>
      </div>
      <hr className='my-4' />
      <div className='flex flex-col gap-y-6'>
        <div className='flex flex-col items-start gap-y-4'>
          <div className='flex items-center gap-x-4'>
            <h3 className='font-semibold text-black'>Brand:</h3>
            <Link
              href={`/brands/${data?.brand?.id}`}
              className='curosor-pointer underline'
            >
              {data?.brand?.name}
            </Link>
          </div>
          <BrandCard data={data?.brand} badge></BrandCard>
        </div>
        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-black'>Size:</h3>
          <div>{data?.size?.value}</div>
        </div>
        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-black'>Color:</h3>
          <div
            className='h-6 w-6 rounded-full border border-gray-600'
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
        <div className='flex items-center gap-x-4'>
          <h3 className='font-semibold text-black'>In-stock:</h3>
          <div>{stockAmount}</div>
        </div>
        <div className='flex flex-col justify-center items-start gap-y-4 trasnition'>
          <h3 className='font-semibold text-black'>Description:</h3>
          {!hidden && (
            <div className='transition'>
              {data.description?.slice(0, 50)}...
            </div>
          )}
          {hidden && (
            <div className='transition'>
              {data.description?.split(". ").map((sentance) => (
                <p key={sentance} className='py-3'>
                  {sentance}.
                </p>
              ))}
            </div>
          )}
          <div
            className='flex gap-x-2 justify-center items-center border-[1px] border-black p-2 rounded-md hover:bg-black/10 transition cursor-pointer'
            onClick={() => setHidden((p) => !p)}
          >
            Show {!hidden ? "more" : "less"}{" "}
            {!hidden ? <ArrowBigDownIcon /> : <ArrowBigUpIcon />}
          </div>
        </div>
      </div>
      <div className='mt-10 flex items-center gap-x-3'>
        <Button
          disabled={stockAmount === 0}
          variant='outline'
          onClick={onAmountMinus}
          className='flex items-center gap-x-2 rounded-md w-fll h-full'
        >
          <MinusCircle></MinusCircle>
        </Button>
        <div className='text-xl font-bold mx-3'>{amountChosen}</div>
        <Button
          disabled={stockAmount === 0}
          variant='outline'
          onClick={onAmountPlus}
          className='flex items-center gap-x-2 rounded-md w-fll h-full'
        >
          <PlusCircle></PlusCircle>
        </Button>
      </div>
      <div className='mt-10 flex items-center gap-3 max-sm:flex-col flex-row'>
        <Button
          disabled={stockAmount === 0}
          onClick={onAddToCart}
          className='flex items-center gap-x-2 rounded-full max-sm:w-full '
        >
          {stockAmount === 0 ? (
            <p className='text-red-500 '>No more in stock.</p>
          ) : (
            "Add To Cart"
          )}
          <ShoppingCart size={20} />
        </Button>
        <Button
          onClick={() => router.push("/cart")}
          className='flex items-center gap-x-2 rounded-full max-sm:w-full px-4 py-2 text-black bg-white border-[1px] border-black hover:bg-gray-200'
        >
          <ShoppingBag size={20} color='black' />
          <span className='ml-2 text-sm font-medium text-black'>
            {cart.items.length}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default Info;
