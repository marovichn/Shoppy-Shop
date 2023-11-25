"use client";

import { FC, useEffect, useState } from "react";
import { CiStar } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { twMerge } from "tailwind-merge";

interface StarsSelectProps {
  onChange: (value: number) => void;
  disabled?: boolean;
  initValue?: number;
}

const StarsSelect: FC<StarsSelectProps> = ({
  onChange,
  initValue,
  disabled,
}) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (initValue) {
      setValue(initValue);
    }
  }, [initValue]);

  const handleStarClick = (starValue: number) => {
    if (!disabled) {
      const newValue = starValue === 1 && starValue === value ? 0 : starValue;

      setValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <div className='flex items-center justify-start gap-x-3 flex-row max-md:flex-col max-md:items-start gap-y-3'>
      {!disabled && <h1>Select:</h1>}
      <div
        className={twMerge(
          "flex items-start",
          !disabled ? "cursor-pointer" : ""
        )}
      >
        {[1, 2, 3, 4, 5].map((starValue) => (
          <div
            key={starValue}
            className='flex items-center'
            onClick={() => handleStarClick(starValue)}
          >
            {starValue <= value ? <FaStar size={30} /> : <CiStar size={30} />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StarsSelect;
