"use client";
import { Button } from "@/components/ui/button";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types";
import { FC, useState } from "react";

interface BrandProductsProps {
  products: Product[];
  wishlist?: any;
  favorites?: any;
}

const BrandProducts: FC<BrandProductsProps> = ({
  products,
  favorites,
  wishlist,
}) => {
  const initialStep = 3;
  const [index, setIndex] = useState(initialStep);
  return (
    <div className='mt-6 lg:col-span-4 lg:mt-0'>
      {products.length === 0 && <NoResults />}
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {products.slice(0, index).map((product) => (
          <ProductCard
            key={product.id}
            data={product}
            favorites={favorites && favorites}
            wishlist={wishlist && wishlist}
          />
        ))}
      </div>
      <Button
        onClick={() =>
          setIndex((p) => {
            if (p >= products.length) {
              return initialStep;
            }
            return p + initialStep;
          })
        }
        className='w-full bg-black rounded-full hover:bg-black/70 font-bold mt-5'
      >
        {initialStep >= products.length
          ? "No more products here"
          : index >= products.length
          ? "No more products here, show less"
          : "Show more"}
      </Button>
    </div>
  );
};

export default BrandProducts;
