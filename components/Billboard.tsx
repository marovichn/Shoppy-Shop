import { Billboard } from "@/types";

interface BillboardProps {
  data: Billboard;
  textColor:string;
}

const Billboard: React.FC<BillboardProps> = ({ data, textColor}) => {
  console;
  return (
    <div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden'>
      <div
        style={{ backgroundImage: `url(${data?.imageUrl})` }}
        className='rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover'
      >
        <div className='h-full w-full flex flex-col justify-center items-center text-center gap-y-8'>
          <div className='font-bold text-4xl sm:text-6xl lg:text-8xl sm:max-w-xl min-[0px]:max-sm:text-8xl max-w-xs' style={{color: textColor}}>
            {data.label}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billboard;
