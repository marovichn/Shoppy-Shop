"use client";

import { MinusCircle, PlusCircle, ShoppingCart } from "lucide-react";

import { Product } from "@/types";
import Currency from "./ui/Currency";
import { Button } from "./ui/button";
import useCart from "@/hooks/use-cart";
import { useState } from "react";
import toast from "react-hot-toast";

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();
  const stockAmount = data?.stockAmount ? Number(data?.stockAmount) : 1;
  const [amountChosen, setAmountChosen] = useState(1);

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
        <p className='text-2xl text-gray-900'>
          <Currency value={data?.price} />
        </p>
      </div>
      <hr className='my-4' />
      <div className='flex flex-col gap-y-6'>
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
      <div className='mt-10 flex items-center gap-x-3'>
        <Button
          disabled={stockAmount === 0}
          onClick={onAddToCart}
          className='flex items-center gap-x-2 rounded-full max-sm:w-full'
        >
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;
