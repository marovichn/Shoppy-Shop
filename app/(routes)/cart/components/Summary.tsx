"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

import useCart from "@/hooks/use-cart";
import { toast } from "react-hot-toast";
import Currency from "@/components/ui/Currency";
import { Button } from "@/components/ui/button";
import axios from "axios";
import Link from "next/link";

const Summary = ({ promocode }: { promocode: any }) => {
  const searchParams = useSearchParams();
  const items = useCart((state) => state.items);
  const removeAll = useCart((state) => state.removeAll);

  useEffect(() => {
    if (searchParams.get("success")) {
      toast.success("Payment completed.");
      removeAll();
    }

    if (searchParams.get("canceled")) {
      toast.error("Something went wrong.");
    }
  }, [searchParams, removeAll]);

  const totalPrice = items.reduce((total, item) => {
    if (!promocode) {
      return total + Number(item.price);
    } else {
      return (
        total +
        (Number(item.price) -
          Number(item.price) * Number(promocode.discountPercentAmount))
      );
    }
  }, 0);

  const totalInitialValue = items.reduce((total, item) => {
    return total + Number(item.price);
  }, 0);

  const totalDiscountValue = items.reduce((total, item) => {
    if (!promocode) {
      return 0;
    } else {
      return (
        total + Number(item.price) * Number(promocode.discountPercentAmount)
      );
    }
  }, 0);

  const onCheckout = async () => {
    if (!promocode) {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/checkout`,
        {
          productIds: items.map((item) => item.id),
        }
      );

      window.location = response.data.url;
    } else {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/promo-checkout`,
        {
          productIds: items.map((item) => item.id),
          promocode,
        }
      );

      window.location = response.data.url;
    }
  };

  return (
    <div className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
      <h2 className='text-lg font-medium text-gray-900'>Order summary</h2>
      {promocode && (
        <p className='text-xs'>
          Promo code:{"  "}
          <Link
            href='/my-account/discounts/promo'
            className='text-green-500 font-extrabold underline'
          >
            {promocode.userAccessCode}
          </Link>
        </p>
      )}
      <div className='mt-6 space-y-4'>
        {promocode && (
          <>
            <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
              <div className='text-base font-medium text-gray-900'>
                Initial Price
              </div>
              <Currency value={totalInitialValue} />
            </div>
            <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
              <div className='text-base font-medium text-gray-900'>
                Promotion discount
              </div>
              <Currency discount value={totalDiscountValue} />
            </div>
          </>
        )}
        <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
          <div className='text-base font-medium text-gray-900'>Order total</div>
          <Currency value={totalPrice} />
        </div>
      </div>
      <Button
        onClick={onCheckout}
        disabled={items.length === 0}
        className='w-full mt-6 rounded-full'
      >
        Checkout
      </Button>
      <div className='flex items-center justify-center w-full text-[10px] mt-1'>Small additional fees may occur. (For processing payment, tax or other...)</div>
    </div>
  );
};

export default Summary;
