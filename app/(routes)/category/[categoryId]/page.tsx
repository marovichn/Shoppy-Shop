import getCategory from "@/actions/get-category";
import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Billboard from "@/components/Billboard";
import Container from "@/components/ui/container";
import { FC } from "react";
import Filter from "./components/Filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/MobileFIlters";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

interface CategoryPageProps {
  params: { categoryId: string };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const CategoryPage: FC<CategoryPageProps> = async ({
  params,
  searchParams,
}) => {
  // Get the current category
  const products = await getProducts({
    categoryId: params.categoryId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });

  const sizes = await getSizes();
  const colors = await getColors();
  const category = await getCategory(params.categoryId);

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className='bg-white mt-16'>
        <Container>
          <Billboard textColor='white' data={category.billboard} />
          <div className='px-4 sm:px-6 lg:px-8 pb-24'>
            <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
              <MobileFilters sizes={sizes} colors={colors} />

              <div className='lg:block hidden'>
                <Filter name='Sizes' data={sizes} valueKey='sizeId' />
                <Filter name='Colors' data={colors} valueKey='colorId' />
              </div>
              <div className='mt-6 lg:col-span-4 lg:mt-0'>
                {products.length === 0 && <NoResults />}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                  {products.map((product) => (
                    <ProductCard key={product.id} data={product} />
                  ))}
                </div>
              </div>
            </div>
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
      <div className='bg-white mt-16'>
        <Container>
          <Billboard textColor='white' data={category.billboard} />
          <div className='px-4 sm:px-6 lg:px-8 pb-24'>
            <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
              <MobileFilters sizes={sizes} colors={colors} />

              <div className='lg:block hidden'>
                <Filter name='Sizes' data={sizes} valueKey='sizeId' />
                <Filter name='Colors' data={colors} valueKey='colorId' />
              </div>
              <div className='mt-6 lg:col-span-4 lg:mt-0'>
                {products.length === 0 && <NoResults />}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                  {products.map((product) => (
                    <ProductCard key={product.id} data={product} />
                  ))}
                </div>
              </div>
            </div>
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
    <div className='bg-white mt-16'>
      <Container>
        <Billboard textColor='white' data={category.billboard} />
        <div className='px-4 sm:px-6 lg:px-8 pb-24'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
            <MobileFilters sizes={sizes} colors={colors} />

            <div className='lg:block hidden'>
              <Filter name='Sizes' data={sizes} valueKey='sizeId' />
              <Filter name='Colors' data={colors} valueKey='colorId' />
            </div>
            <div className='mt-6 lg:col-span-4 lg:mt-0'>
              {products.length === 0 && <NoResults />}
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {products.map((product) => (
                  <ProductCard
                    wishlist={wishlist}
                    favorites={favorites}
                    key={product.id}
                    data={product}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default CategoryPage;
