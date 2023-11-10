"use client";
import IconButton from "@/components/ui/IconButton";
import axios from "axios";
import { CheckCheck, ListChecks } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, MouseEventHandler, useEffect, useState } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface ProductActionsProps {
  data?: any;
  favorites?: any;
  wishlist?: any;
}

const ProductActions: FC<ProductActionsProps> = ({
  favorites,
  wishlist,
  data,
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isWish, setIsWish] = useState(false);
  const router = useRouter();

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
  }, [favorites, wishlist]);

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
  return (
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
  );
};

export default ProductActions;
