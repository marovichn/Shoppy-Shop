"use client";

import Gallery from "@/components/gallery";

import { FC, useEffect, useState } from "react";
import ReviewInput from "./ReviewInput";
import ReviewsList from "./ReviewsList";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/container";
import Info from "@/components/Info";

interface ProductDisplayProps {
  product: any;
  sessionEmail?: string;
  favorites?: any;
  wishlist?: any;
  productId: string;
  currentUser?: any;
  productReviews: any;
  suggestedProducts: any;
}

const ProductDisplay: FC<ProductDisplayProps> = ({
  product,
  sessionEmail,
  favorites,
  wishlist,
  productId,
  currentUser,
  productReviews,
  suggestedProducts,
}) => {
  const [mount, setMount] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (!mount) {
      setMount(true);
    }
  }, []);
  
  useEffect(() => {
   const totalRating = product.reviews.reduce(
     (sum: any, review: any) => sum + parseFloat(review.value),
     0
   );
   const averageRating = Math.round(totalRating / product.reviews.length);
   setRating(averageRating);
  }, [product]);

  if (!mount) {
    return <div></div>;
  }

  return (
    <div className='bg-white mt-12'>
      <Container>
        <div className='px-4 py-10 sm:px-6 lg:px-8'>
          <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
            <Gallery images={product.images} />
            <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
              <Info
                rating={rating}
                sessionEmail={sessionEmail && sessionEmail}
                favorites={favorites}
                wishlist={wishlist}
                data={product}
              />
            </div>
          </div>
          <ReviewInput productId={productId} />
          <ReviewsList
            currentUser={currentUser && currentUser}
            title='User Reviews: '
            items={productReviews}
          />
          <hr className='my-10' />
          <ProductList
            wishlists={wishlist && wishlist}
            favorites={favorites && favorites}
            title='Related Items'
            items={suggestedProducts}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductDisplay;
