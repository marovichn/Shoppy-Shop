import NoResults from "@/components/ui/no-results";
import { Brand, Product } from "@/types";
import BrandCard from "./BrandCard";
import ProductCard from "./ui/product-card";
import ProductHorizontalCard from "./ProductHorizontalCard";

interface ProductsHorizontalListProps {
  title: string;
  items: any;
  wishlists?: any;
  favorites?: any;
}

const ProductsHorizontalList: React.FC<ProductsHorizontalListProps> = ({
  title,
  items,
  wishlists,
  favorites,
}) => {
  return (
    <div className='space-y-4 w-full'>
      <h3 className={`font-bold text-xl flex gap-x-2 pb-4`}>{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className='flex w-[calc(100%-10px)] overflow-x-auto pb-4 gap-x-5 pr-5'>
        {items.map((item: Product) => (
          <ProductHorizontalCard
            key={item.id}
            data={item}
            favorites={favorites && favorites}
            wishlist={wishlists && wishlists}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductsHorizontalList;
