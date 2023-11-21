"use client";

import ProductCard from "@/components/ui/product-card";
import NoResults from "@/components/ui/no-results";
import { Heart, ListChecks } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

interface ProductListProps {
  title: string;
  items: any;
  favorite?: boolean;
  wish?: boolean;
  wishlists?: any;
  favorites?: any;
}

const ProductList: React.FC<ProductListProps> = ({
  title,
  items,
  favorite,
  wish,
  wishlists,
  favorites,
}) => {
  const initialStep = 4;
  const [index, setIndex] = useState(initialStep);

  return (
    <div className='space-y-4'>
      <h3
        className={`font-bold text-3xl flex gap-x-2 pb-10 ${
          wish || favorite ? "items-center justify-center" : ""
        }`}
      >
        {favorite && !wish && <Heart className='text-red-500' />}
        {wish && !favorite && <ListChecks className='text-green-500' />}
        {title}
      </h3>
      {items.length === 0 && <NoResults />}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
        {items.slice(0, index).map((item: any) => (
          <ProductCard
            favorites={favorites}
            wishlist={wishlists}
            key={item.id}
            data={item}
          />
        ))}
      </div>
      <Button
        onClick={() =>
          setIndex((p) => {
            if (p >= items.length) {
              return initialStep;
            }
            return p + 4;
          })
        }
        className='w-full bg-black rounded-full hover:bg-black/70 font-bold'
      >
        {initialStep >= items.length
          ? "No more products here"
          : index >= items.length
          ? "No more products here, show less"
          : "Show more"}
      </Button>
    </div>
  );
};

export default ProductList;
