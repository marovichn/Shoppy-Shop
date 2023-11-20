"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Brand } from "@/types";

interface BrandCard {
  data: Brand;
}

const BrandCard: React.FC<BrandCard> = ({ data }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/brands/${data?.id}`);
  };

  return (
    <div className='bg-white group cursor-pointer rounded-full border p-3 space-y-4'>
      {/* Image & actions */}
      <div className='' onClick={handleClick}>
        <div className='w-[200px] h-[200px] bg-gray-100 relative rounded-full'>
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
