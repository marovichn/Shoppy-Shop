"use client";
import Container from "@/components/ui/container";
import { FC, useEffect, useState } from "react";
import { BsCashCoin } from "react-icons/bs";
import CodeInputForm from "./components/CodeInputForm";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  const [isMount, setMount] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);

  if (!isMount) {
    return <></>;
  }

  return (
    <div className='mt-16 p-10'>
      <Container>
        <h3
          className={`font-bold text-3xl max-sm:text-lg flex gap-x-2 py-5 items-center justify-between w-full`}
        >
          <div className='flex items-center justify-center gap-x-5'>
            <div className='p-3 bg-violet-500/40 rounded-md'>
              <BsCashCoin className='text-violet-500' />
            </div>
            Enter Promocode
          </div>
        </h3>
        <CodeInputForm />
        <p className='text-start flex flex-col gap-y-5'>
          <p>
            🌟 Exclusive Online Shopping Discount Event! 🌟 🎉 Welcome to Shopy
            - Where Savings Meet Style! 🛍️ We're thrilled to present you with an
            exclusive opportunity to enjoy incredible discounts ranging from 5%
            to a whopping 20%! 🎁✨ 🔥
          </p>
          <p>
            <p className='font-bold'>How to Redeem Your Discount:</p>
            <ol className='list-decimal'>
              <li>
                Explore our extensive collection of trendy products and add your
                favorites to your cart.
              </li>

              <li>Head to the checkout page to review your selections. </li>
              <li>
                Look for the "Promo Code" or "Discount Code" field in your
                account.
              </li>
              <li>Enter the special promo code</li>
            </ol>
          </p>
          <p>
            🌈 Watch as your total magically shrinks, giving you more reasons to
            love your shopping spree!
          </p>
          <p>
            <p className='font-bold'>🚀 Why Shop with Us?</p>
            <ul className='list-disc'>
              <li>Wide variety of high-quality products for every taste.</li>
              <li>Fast and reliable shipping to your doorstep.</li>
              <li>
                Dedicated customer support to assist you every step of the way.
              </li>
            </ul>
          </p>
          <p>
            📅 Act Fast, Limited Time Offer! This incredible discount
            extravaganza is available for a limited time only. Don't miss out on
            the chance to elevate your shopping experience while saving big.
          </p>
          <p>
            💡 Pro Tip: Share the love! Tell your friends and family about this
            fantastic discount event so they can join the savings party too! 🛒
            Start Shopping Now:
            <a
              className='font-bold ml-1 underline'
              href='https://shoppy-shop.vercel.app'
            >
              Shoppy (https://shoppy-shop.vercel.app)
            </a>{" "}
            Thank you for choosing Shoppy! Happy Shopping! 🎊✨
          </p>
        </p>
      </Container>
    </div>
  );
};

export default page;
