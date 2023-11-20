
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
    <div className='space-y-4'>
      <h3 className={`font-bold text-3xl flex gap-x-2 pb-10`}>{title}</h3>
      {items.length === 0 && <NoResults />}
      <div className='w-[calc(100vw-55px)] flex flex-row overflow-x-auto gap-x-5 px-10 pb-10'>
        {items.map((item: Brand) => (
          <BrandCard key={item.id} data={item} />
        ))}
      </div>
    </div>
  );
};

export default BrandsList;
