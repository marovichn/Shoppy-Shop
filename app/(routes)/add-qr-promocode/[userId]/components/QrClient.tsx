"use client";

import Container from "@/components/ui/container";
import axios from "axios";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface QrClientProps {
  userId?: string;
}

const QrClient: FC<QrClientProps> = ({ userId }) => {
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    /*In-store checkout handler for store cash register device*/
    axios
      .post("/cash-register-checkout-handling")
      .then((data) =>
        data.data === "success" ? setSuccess(true) : setSuccess(false)
      )
      .catch((err) => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className='mt-16 p-10'>
      <Container>
        {userId && (
          <div className='text-4xl text-lime-300 py-[250px] flex items-center justify-center font-extrabold flex-col gap-y-5'>
            <span className='text-black mr-2'>
              QR Code Scanned Successfully.
            </span>
            {isLoading ? (
              <div className='w-10 h-10 border-b-black border-b-2 animate-spin rounded-full'></div>
            ) : null}
            {!isLoading && success ? (
              "Discount Aplied."
            ) : (
              <div className='text-4xl text-red-300 '>
                Code Not Apllied. Cash Register Error.
              </div>
            )}
          </div>
        )}
        {!userId && (
          <div className='text-4xl text-red-300 py-[150px] flex items-center justify-center font-extrabold flex-col gap-y-5'>
            <span className='text-black mr-2'>
              QR Code Scanned Successfully.
            </span>
            Code Not Apllied. Error with user authentification.
          </div>
        )}
      </Container>
    </div>
  );
};

export default QrClient;
