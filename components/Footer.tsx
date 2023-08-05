import { FC } from "react";

interface FooterProps {}

const Footer: FC<FooterProps> = ({}) => {
  return (
    <footer className='bg-white border-t'>
      <div className='mx-auto py-20'>
        <p className='text-center text-sm font-bold text-black'>
          &copy; 2023 Shoppy, LMN Inc. All rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
