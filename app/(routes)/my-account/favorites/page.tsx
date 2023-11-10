import ProductList from "@/components/ProductList";
import Container from "@/components/ui/container";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { Heart } from "lucide-react";
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

  const favorites = await db.favorite.findMany({
    where: {
      userId: currentUser?.id,
    },
  });
  const wishlist = await db.wishlist.findMany({
    where: {
      userId: currentUser?.id,
    },
  });

  const myFavoriteProducts = await Promise.all(
    favorites.map(async (favorite) => {
      const product = await db.product.findFirst({
        where: { id: favorite.productId },
        include: { images: true, size: true, category: true, color: true },
      });
      const formattedProduct = {
        ...product,
        stockAmount: product?.stockAmount?.toNumber().toString(),
      };
      return formattedProduct;
    })
  );

  return (
    <Container>
      <div className='mt-16 px-10 py-5 pb-20'>
        <h1
          className={`font-bold text-3xl max-sm:text-lg flex gap-x-2 py-5 items-center justify-between w-full`}
        >
          <div className='flex items-center justify-center gap-x-5'>
            <div className='p-3 bg-red-500/40 rounded-md'>
              <Heart className='text-red-500' />
            </div>
            My Favorite Products
          </div>
        </h1>
        <ProductList
          title=''
          items={myFavoriteProducts}
          favorites={favorites}
          wishlists={wishlist}
        ></ProductList>
      </div>
    </Container>
  );
};

export default page;
