import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/Billboard";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/container";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { getServerSession } from "next-auth";

export const revalidate = 0;

export default async function Home() {
  const billboard = await getBillboard("8e4c388d-0c11-4dcd-8e03-212375efb024");
  const products = await getProducts({
    isFeatured:true,
  });
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return (
        <Container>
          <div className='space-y-10 pb-10 mt-16'>
            <Billboard textColor='#fff' data={billboard} />
            <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
              <ProductList title='Featured Products' items={products} />
            </div>
          </div>
        </Container>
      );
    }

    const currentUser = await db.user.findUnique({
      where: { email: session?.user?.email },
      include: {
        favorites: true,
        wishlist: true,
      },
    });

    if (!currentUser) {
      return (
        <Container>
          <div className='space-y-10 pb-10 mt-16'>
            <Billboard textColor='#fff' data={billboard} />
            <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
              <ProductList title='Featured Products' items={products} />
            </div>
          </div>
        </Container>
      );
    }

    const favorites = await db.favorite.findMany({
      where: {
        userId: currentUser.id,
      },
    });
    const wishlist = await db.wishlist.findMany({
      where: {
        userId: currentUser.id,
      },
    });

  return (
    <Container>
      <div className='space-y-10 pb-10 mt-16'>
        <Billboard textColor='#fff' data={billboard} />
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
          <ProductList favorites={favorites} wishlists={wishlist} title='Featured Products' items={products} />
        </div>
      </div>
    </Container>
  );
}
