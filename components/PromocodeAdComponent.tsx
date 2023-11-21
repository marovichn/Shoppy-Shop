import { FC } from "react";

interface PromocodeAdComponentProps {}

const PromocodeAdComponent: FC<PromocodeAdComponentProps> = ({}) => {
  return (
    <div className='w-full px-10 bg-red-500 rounded-xl flex flex-row max-md:flex-col gap-y-10 items-center justify-around py-20 text-white'>
      <h1 className='font-extrabold md:pl-20'>
        <p className='text-9xl'>20%</p>
        <p className='text-3xl'>Use Code <br></br>[ BX06T11QQK ]</p>
      </h1>
      <div className='flex flex-col gap-y-3 md:px-20'>
        <p>
          Unwrap Savings on Your First Purchase! Embark on your shopping
          journey with us and enjoy an exclusive 20% off your inaugural
          purchase!
        </p>
        <p>
          Use code in your account actions to claim your discount. It&apos;s our
          way of saying &quot;welcome&quot; and making your first experience
          extra special.
        </p>
        <p>
           Shop now and discover a world of quality products with an
          unbeatable deal. Hurry, the joy of savings awaits, but this offer
          won&apos;t last forever!
        </p>
        <p>(Expires: December 31. 2023)</p>
      </div>
    </div>
  );
};

export default PromocodeAdComponent;
