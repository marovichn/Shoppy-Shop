import getColors from "@/actions/get-colors";
import getProducts from "@/actions/get-products";
import getSizes from "@/actions/get-sizes";
import Container from "@/components/ui/container";
import { FC } from "react";
import Filter from "./components/Filter";
import NoResults from "@/components/ui/no-results";
import ProductCard from "@/components/ui/product-card";
import MobileFilters from "./components/MobileFIlters";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import getBrand from "@/actions/get-brand";
import Image from "next/image";
import BrandProducts from "./components/BrandProducts";

interface BrandPageProps {
  params: { brandId: string };
  searchParams: {
    colorId: string;
    sizeId: string;
  };
}

const BrandPage: FC<BrandPageProps> = async ({ params, searchParams }) => {
  // Get the current category
  const products = await getProducts({
    brandId: params.brandId,
    colorId: searchParams.colorId,
    sizeId: searchParams.sizeId,
  });
  const brand = await getBrand(params.brandId);

  const sizes = await getSizes();
  const colors = await getColors();

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <div className='bg-white mt-16'>
        <Container>
          <div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden md:hidden'>
            <div
              style={{ backgroundImage: `url(${brand?.images[0]?.url})` }}
              className='rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover'
            ></div>
            <div className='font-bold text-6xl w-full pb-10 flex items-center justify-between gap-x-5'>
              {brand.name}
            </div>
          </div>
          <div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden max-md:hidden'>
            <div className='font-bold text-4xl sm:text-6xl lg:text-8xl min-[0px]:max-sm:text-8xl w-full pb-10 flex items-center justify-between gap-x-5'>
              {brand.name}
              <div className='w-[150px] h-[150px] rounded-full flex items-center justify-center border-[1px] border-black'>
                <Image
                  src={brand?.images[0]?.url}
                  width={150}
                  height={150}
                  className='rounded-full object-cover'
                  alt='Brand Image'
                />
              </div>
            </div>
          </div>
          <div className='px-4 sm:px-6 lg:px-8 pb-24'>
            <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
              <MobileFilters sizes={sizes} colors={colors} />

              <div className='lg:block hidden'>
                <Filter name='Sizes' data={sizes} valueKey='sizeId' />
                <Filter name='Colors' data={colors} valueKey='colorId' />
              </div>
              <BrandProducts products={products} />
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
          <div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden md:hidden'>
            <div
              style={{ backgroundImage: `url(${brand?.images[0]?.url})` }}
              className='rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover'
            ></div>
            <div className='font-bold text-6xl w-full pb-10 flex items-center justify-between gap-x-5'>
              {brand.name}
            </div>
          </div>
          <div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden max-md:hidden'>
            <div className='font-bold text-4xl sm:text-6xl lg:text-8xl min-[0px]:max-sm:text-8xl w-full pb-10 flex items-center justify-between gap-x-5'>
              {brand.name}
              <div className='w-[150px] h-[150px] rounded-full flex items-center justify-center border-[1px] border-black'>
                <Image
                  src={brand?.images[0]?.url}
                  width={150}
                  height={150}
                  className='rounded-full object-cover'
                  alt='Brand Image'
                />
              </div>
            </div>
          </div>
          <div className='px-4 sm:px-6 lg:px-8 pb-24'>
            <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
              <MobileFilters sizes={sizes} colors={colors} />

              <div className='lg:block hidden'>
                <Filter name='Sizes' data={sizes} valueKey='sizeId' />
                <Filter name='Colors' data={colors} valueKey='colorId' />
              </div>
              <BrandProducts products={products} />
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
        <div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden md:hidden'>
          <div
            style={{ backgroundImage: `url(${brand?.images[0]?.url})` }}
            className='rounded-xl relative aspect-square md:aspect-[2.4/1] overflow-hidden bg-cover'
          ></div>
          <div className='font-bold text-6xl w-full pb-10 flex items-center justify-between gap-x-5'>
            {brand.name}
          </div>
        </div>
        <div className='p-4 sm:p-6 lg:p-8 rounded-xl overflow-hidden max-md:hidden'>
          <div className='font-bold text-4xl sm:text-6xl lg:text-8xl min-[0px]:max-sm:text-8xl w-full pb-10 flex items-center justify-between gap-x-5'>
            {brand.name}
            <div className='w-[150px] h-[150px] rounded-full flex items-center justify-center border-[1px] border-black'>
              <Image
                src={brand?.images[0]?.url}
                width={150}
                height={150}
                className='rounded-full object-cover'
                alt='Brand Image'
              />
            </div>
          </div>
        </div>
        <div className='px-4 sm:px-6 lg:px-8 pb-24'>
          <div className='lg:grid lg:grid-cols-5 lg:gap-x-8'>
            <MobileFilters sizes={sizes} colors={colors} />

            <div className='lg:block hidden'>
              <Filter name='Sizes' data={sizes} valueKey='sizeId' />
              <Filter name='Colors' data={colors} valueKey='colorId' />
            </div>
            <BrandProducts
              products={products}
              wishlist={wishlist}
              favorites={favorites}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default BrandPage;
