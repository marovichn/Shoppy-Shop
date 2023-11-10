import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import Container from "@/components/ui/container";
import ProductList from "@/components/ProductList";
import Info from "@/components/Info";
import Gallery from "@/components/gallery";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";

export const revalidate = 0;

interface ProductPageProps {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  });

  if (!product) {
    return null;
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className='bg-white mt-12'>
        <Container>
          <div className='px-4 py-10 sm:px-6 lg:px-8'>
            <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
              <Gallery images={product.images} />
              <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
                <Info data={product} />
              </div>
            </div>
            <hr className='my-10' />
            <ProductList title='Related Items' items={suggestedProducts} />
          </div>
        </Container>
      </div>
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
      <div className='bg-white mt-12'>
        <Container>
          <div className='px-4 py-10 sm:px-6 lg:px-8'>
            <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
              <Gallery images={product.images} />
              <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
                <Info data={product} />
              </div>
            </div>
            <hr className='my-10' />
            <ProductList title='Related Items' items={suggestedProducts} />
          </div>
        </Container>
      </div>
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
    <div className='bg-white mt-12'>
      <Container>
        <div className='px-4 py-10 sm:px-6 lg:px-8'>
          <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-8'>
            <Gallery images={product.images} />
            <div className='mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0'>
              <Info data={product} />
            </div>
          </div>
          <hr className='my-10' />
          <ProductList
            wishlists={wishlist}
            favorites={favorites}
            title='Related Items'
            items={suggestedProducts}
          />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
