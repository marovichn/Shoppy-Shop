"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ReviewCard from "./ReviewCard";

interface ReviewsListProps {
  title: string;
  items: any;
  currentUser?: any;
}

const ReviewsList: React.FC<ReviewsListProps> = ({
  title,
  items,
  currentUser,
}) => {
  const initialStep = 1;
  const [index, setIndex] = useState(initialStep);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (items) {
      setLoading(false);
    }
  }, []);

  return (
    <div className='space-y-4 mt-5'>
      <h3 className={`font-bold text-3xl flex gap-x-2 pb-10`}>{title}</h3>
      {items.length === 0 && (
        <div className='flex items-center justify-center h-full w-full text-neutral-500'>
          No reviews on this product.
        </div>
      )}
      {!loading && (
        <div className='flex flex-col gap-y-4'>
          {items.slice(0, index).map((item: any) => (
            <ReviewCard key={item.id} data={item} currentUser={currentUser} />
          ))}
        </div>
      )}
      {loading && (
        <div className='flex w-full items-center justify-center pb-16'>
          <div className='border-b-4 border-black rounded-full p-8 animate-spin w-14 h-14'></div>
        </div>
      )}
      {items && items.length !== 0 && (
        <Button
          onClick={() =>
            setIndex((p) => {
              if (p >= items.length) {
                return initialStep;
              }
              return p + 1;
            })
          }
          className='w-full bg-black rounded-full hover:bg-black/70 font-bold'
        >
          {initialStep >= items.length
            ? "No more reviews here"
            : index >= items.length
            ? "No more reviews here, show less"
            : "Show more"}
        </Button>
      )}
    </div>
  );
};

export default ReviewsList;
