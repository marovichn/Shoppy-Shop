"use client";

import { ShoppingBag, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import useCart from "@/hooks/use-cart";
import { useSession } from "next-auth/react";

const NavbarActions = () => {
  const [isMounted, setIsMounted] = useState(false);
  const cart = useCart();
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className='ml-auto flex items-center gap-x-1 mr-6 w-full'>
      <Button
        onClick={() => router.push("/cart")}
        className='flex items-center rounded-md  px-4 py-2'
      >
        <ShoppingBag size={20} color='white' />
        <span className='ml-2 text-sm font-medium text-white'>
          {cart.items.length}
        </span>
      </Button>
      <Button
        onClick={() => {
          if (session.data?.user) {
            router.push("/my-account");
          }else{
            router.push('/login')
          }
        }}
        className='flex items-center rounded-md  px-4 py-2'
      >
        {session.data?.user ? <User size={20} color='white' /> : "Sign in"}
      </Button>
    </div>
  );
};

export default NavbarActions;
