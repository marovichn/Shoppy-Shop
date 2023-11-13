"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

interface CurrencyProps {
  value?: string | number;
  discount?: boolean
}

const Currency: React.FC<CurrencyProps> = ({ value = 0, discount=false }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return <div className='font-semibold'>{discount && "-"}{formatter.format(Number(value))}</div>;
};

export default Currency;
