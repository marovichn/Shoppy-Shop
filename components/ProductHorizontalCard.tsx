"use client";

import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";
import {
  CheckCheck,
  Expand,
  Heart,
  ListChecks,
  ShoppingCart,
} from "lucide-react";
import { useRouter } from "next/navigation";

import useCart from "@/hooks/use-cart";
import { Product, User } from "@/types";
import usePreviewModal from "@/hooks/use-prview-modal";
import IconButton from "@/components/ui/IconButton";
import Currency from "@/components/ui/Currency";
import toast from "react-hot-toast";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import axios from "axios";
import { useSession } from "next-auth/react";

interface ProductHorizontalCard {
  data: Product;
  favorites?: any;
  wishlist?: any;
}

const ProductHorizontalCard: React.FC<ProductHorizontalCard> = ({ data, favorites, wishlist }) => {
  const session = useSession();
  const previewModal = usePreviewModal();
  const cart = useCart();
  const router = useRouter();
  const stockAmount = data?.stockAmount ? Number(data?.stockAmount) : 1;
  const [isLiked, setIsLiked] = useState(false);
  const [isWish, setIsWish] = useState(false);

  useEffect(() => {
    if (
      favorites &&
      favorites.filter((favorite: any) => favorite.productId === data.id)
        .length > 0
    ) {
      setIsLiked(true);
    }
    if (
      wishlist &&
      wishlist.filter((favorite: any) => favorite.productId === data.id)
        .length > 0
    ) {
      setIsWish(true);
    }
  }, [favorites, wishlist, data.id]);

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onPreview: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    previewModal.onOpen(data);
  };

  const onWish = async () => {
    await axios.post("/api/wish", data);
    setIsWish((p) => !p);
    router.refresh();
  };
  const onLike: MouseEventHandler<HTMLButtonElement> = async (event) => {
    event.stopPropagation();

    await axios.post("/api/like", data);
    setIsLiked((p) => !p);
    router.refresh();
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();

    if (
      cart.items.filter((item: Product) => item.id === data.id).length ===
      stockAmount
    ) {
      return toast("Whole stock of this product is in cart.");
    } else {
      cart.addItem(data);
      toast.success(`Added 1 ${data.name}`);
    }
  };

  return (
    <div className='bg-white group cursor-pointer rounded-xl border p-3 space-y-4 w-[300px] overflow-x-auto flex-shrink-0'>
      {/* Image & actions */}
      <div
        className=''
        onClick={handleClick}
      >
        <div className='aspect-square rounded-xl bg-gray-100 relative'>
          <Image
            src={data.images?.[0]?.url}
            alt=''
            fill
            className='aspect-square object-cover rounded-md'
          />
          <div className='opacity-0 group-hover:opacity-100 transition absolute w-full px-6 bottom-5'>
            <div className='flex gap-x-6 justify-center'>
              <IconButton
                onClick={onPreview}
                icon={<Expand size={20} className='text-gray-600' />}
              />
              <IconButton
                onClick={onAddToCart}
                icon={<ShoppingCart size={20} className='text-gray-600' />}
              />
            </div>
          </div>
        </div>
        {/* Description */}
        <div>
          <p className='font-semibold text-lg'>{data.name}</p>
          <p className='text-sm text-gray-500'>{data.category?.name}</p>
        </div>
        {/* Price & Reiew */}
        <div className='flex items-center justify-between'>
          <Currency value={data?.price} />
        </div>
      </div>
      {/*Add to Favorites and Wishlist*/}
      {session.data?.user && (
        <div className='transition relative z-20 pb-[38px]  '>
          <div className='flex gap-x-6 justify-center transition absolute bg-black/10 rounded-full'>
            {isLiked ? (
              <IconButton
                className=''
                onClick={onLike}
                icon={<AiFillHeart size={20} className='text-red-500' />}
              />
            ) : (
              <IconButton
                onClick={onLike}
                icon={<AiOutlineHeart size={20} className='text-red-500' />}
              />
            )}
            {isWish ? (
              <IconButton
                className='bg-green-600/20'
                onClick={onWish}
                icon={<CheckCheck size={20} className='text-green-600' />}
              />
            ) : (
              <IconButton
                onClick={onWish}
                icon={<ListChecks size={20} className='text-gray-600' />}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductHorizontalCard;
