
import NoResults from "@/components/ui/no-results";
import { Brand } from "@/types";
import BrandCard from "./BrandCard";

interface BrandsListProps {
  title: string;
  items: any;
}

const BrandsList: React.FC<BrandsListProps> = ({
  title,
  items,
}) => {
  return (
    <div className='space-y-4 w-full'>
      <h3
        className={`font-bold text-3xl flex gap-x-2 pb-4`}
      >
        {title}
      </h3>
      {items.length === 0 && <NoResults />}
      <div className='flex w-[calc(100%-10px)] overflow-x-auto pb-4 gap-x-5'>
        {items.map((item: Brand) => (
          <BrandCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default BrandsList;
