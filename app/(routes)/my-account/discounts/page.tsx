import ProductList from "@/components/ProductList";
import Container from "@/components/ui/container";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { Heart, ListChecks, Percent } from "lucide-react";
import { getServerSession } from "next-auth";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return <></>;
  }

  const currentUser = await db.user.findUnique({
    where: { email: session?.user?.email },
    include: {
      favorites: true,
      wishlist: true,
    },
  });

  return (
    <Container>
      <div className='mt-16 px-10 py-5 pb-20'>
        <h3
          className={`font-bold text-3xl max-sm:text-lg flex gap-x-2 py-5 items-center justify-between w-full`}
        >
          <div className='flex items-center justify-center gap-x-5'>
            <div className='p-3 bg-blue-500/40 rounded-md'>
              <Percent className='text-blue-500' />
            </div>
            Discounts
          </div>
        </h3>
        No discounts yet..
      </div>
    </Container>
  );
};

export default page;
