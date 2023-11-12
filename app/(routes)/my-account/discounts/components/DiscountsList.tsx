
import { QrCode } from "lucide-react";
import Link from "next/link";
import { FC } from "react";
import { BsCashCoin } from "react-icons/bs";

interface DiscountsListProps {}

const DiscountsList: FC<DiscountsListProps> = ({}) => {
  return (
    <div className='flex flex-col w-full h-full gap-y-2 items-start justify-center py-16 '>
      <Link
        href='/my-account/discounts/qr'
        className='bg-gray-50 p-3 flex items-center justify-start rounded-xl w-full hover:bg-gray-200 cursor-pointer px-6'
      >
        <h3
          className={`font-bold text-3xl max-sm:text-lg flex gap-x-2 py-5 items-center justify-between w-full`}
        >
          <div className='flex items-center justify-center gap-x-5'>
            <div className='p-3 bg-lime-500/40 rounded-md'>
              <QrCode className='text-lime-500' />
            </div>
            In-Person Scan Discount
          </div>
        </h3>
      </Link>
      <Link
        href='/my-account/discounts/promo'
        className='bg-gray-50 p-3 flex items-center justify-start rounded-xl w-full hover:bg-gray-200 cursor-pointer px-6'
      >
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
      </Link>
    </div>
  );
};

export default DiscountsList;
