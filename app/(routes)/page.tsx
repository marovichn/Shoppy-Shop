import getBillboard from "@/actions/get-billboard";
import getBrands from "@/actions/get-brands";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/Billboard";
import BrandsList from "@/components/BrandsList";
import ProductList from "@/components/ProductList";
import ProductsHorizontalList from "@/components/ProductsHorizontalList";
import PromocodeAdComponent from "@/components/PromocodeAdComponent";
import Container from "@/components/ui/container";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import { Brand } from "@/types";
import { getServerSession } from "next-auth";

export const revalidate = 0;

export default async function Home() {
  const billboard = await getBillboard("bd16dda9-9eaa-44c7-b12b-3dccbd9cffad");
  const products = await getProducts({
    isFeatured: true,
  });
  const brands = await getBrands();
  const session = await getServerSession(authOptions);

  function shuffleArray(array: any[]) {
    // Clone the array to avoid modifying the original array
    const shuffledArray = [...array];

    // Fisher-Yates shuffle algorithm
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at i and j
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }

    return shuffledArray;
  }

  if (!session?.user?.email) {
    return (
      <Container>
        <div className='space-y-10 pb-10 mt-16'>
          <Billboard textColor='#fff' data={billboard} />
          <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
            <ProductList title='Featured Products' items={products} />
          </div>
          <div className='flex flex-row gap-y-8 px-4 sm:px-6 lg:px-8'>
            <BrandsList title='Brands' items={brands} />
          </div>
          <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
            <h3 className={`font-bold text-3xl max-sm:text-2xl flex gap-x-2`}>
              Special Brand Deals
            </h3>
            {shuffleArray(brands)
              .slice(0, 2)
              .map(async (brand: any) => {
                const items = await getProducts({ brandId: brand.id });

                return (
                  <div className='w-full' key={brand.id}>
                    <ProductsHorizontalList
                      title={`${brand.name} - Special Deal`}
                      items={items}
                    />
                  </div>
                );
              })}
          </div>
          <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
            <PromocodeAdComponent />
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
          <div className='flex flex-row gap-y-8 px-4 sm:px-6 lg:px-8'>
            <BrandsList title='Brands' items={brands} />
          </div>
          <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
            <h3 className={`font-bold text-3xl max-sm:text-2xl flex gap-x-2`}>
              Special Brand Deals
            </h3>
            {shuffleArray(brands)
              .slice(0, 2)
              .map(async (brand: any) => {
                const items = await getProducts({ brandId: brand.id });

                return (
                  <div className='w-full' key={brand.id}>
                    <ProductsHorizontalList
                      title={`${brand.name} - Special Deal`}
                      items={items}
                    />
                  </div>
                );
              })}
          </div>
          <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
            <PromocodeAdComponent />
          </div>
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
        <div className='flex flex-row gap-y-8 px-4 sm:px-6 lg:px-8'>
          <BrandsList title='Brands' items={brands} />
        </div>
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
          <h3 className={`font-bold text-5xl max-sm:text-3xl flex gap-x-2`}>
            Special Brand Deals
          </h3>
          {shuffleArray(brands)
            .slice(0, 2)
            .map(async (brand: any) => {
              const items = await getProducts({ brandId: brand.id });
              return (
                <div className='w-full' key={brand.id}>
                  <ProductsHorizontalList
                    title={`${brand.name} - Special Deal`}
                    items={items}
                    favorites={favorites}
                    wishlists={wishlist}
                  />
                </div>
              );
            })}
        </div>
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
          <PromocodeAdComponent />
        </div>
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
          <ProductList
            title='Featured Products'
            items={products}
            wishlists={wishlist}
            favorites={favorites}
          />
        </div>
      </div>
    </Container>
  );
}
