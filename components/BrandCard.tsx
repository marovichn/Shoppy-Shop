"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Brand } from "@/types";
import { twMerge } from "tailwind-merge";

interface BrandCard {
  data: Brand;
  badge?: boolean;
}

const BrandCard: React.FC<BrandCard> = ({ data, badge }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/brands/${data?.id}`);
  };

  return (
    <div className='bg-white group cursor-pointer rounded-full border p-3 space-y-4'>
      {/* Image & actions */}
      <div className='' onClick={handleClick}>
        <div
          className={twMerge(
            " bg-gray-100 relative rounded-full",
            badge ? "w-[100px] h-[100px]" : "w-[150px] h-[150px]"
          )}
        >
          <Image
            src={data.images?.[0]?.url}
            alt=''
            fill
            className='object-cover rounded-full'
          />
        </div>
      </div>
    </div>
  );
};

export default BrandCard;
