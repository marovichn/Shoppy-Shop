import ProductCard from "@/components/ui/product-card";
import { Product } from "@/types";
import NoResults from "@/components/ui/no-results";
import { Heart, ListChecks } from "lucide-react";

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
        {items.map((item:any) => (
          <ProductCard
            favorites={favorites}
            wishlist={wishlists}
            key={item.id}
            data={item}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
