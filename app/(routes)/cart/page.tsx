"use client";

import { useEffect, useState } from "react";

import Container from "@/components/ui/container";
import useCart from "@/hooks/use-cart";

import Summary from "./components/Summary";
import CartItem from "./components/CartItem";
import { User } from "@/types";
import axios from "axios";
import { useSession } from "next-auth/react";

export const revalidate = 0;

const CartPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>();

  const session = useSession();
  const cart = useCart();

  useEffect(() => {
    setIsMounted(true);
    if (!session) {
      return;
    }
    axios.get("/api/get-user-data").then((user) => setCurrentUser(user.data));
  }, []);

  if (!isMounted) {
    return null;
  }

  console.log(currentUser?.promocodes[0]);

  return (
    <div className='bg-white mt-16'>
      <Container>
        <div className='px-4 py-16 sm:px-6 lg:px-8'>
          <h1 className='text-3xl font-bold text-black'>Shopping Cart</h1>
          <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start gap-x-12'>
            <div className='lg:col-span-7'>
              {cart.items.length === 0 && (
                <p className='text-neutral-500'>No items added to cart.</p>
              )}
              <ul>
                {cart.items.map((item) => (
                  <CartItem key={item.id} data={item} />
                ))}
              </ul>
            </div>
            <Summary promocode={currentUser?.promocodes[0]} />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CartPage;
