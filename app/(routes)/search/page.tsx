import Container from "@/components/ui/container";
import { FC } from "react";
import SearchInput from "./components/SearchInput";
import getProducts from "@/actions/get-products";
import ProductsHorizontalList from "@/components/ProductsHorizontalList";
import ProductList from "@/components/ProductList";
import { getProductsByTitle } from "@/actions/get-products-by-title";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";

interface searchPageProps {
  searchParams: {
    title: string;
  };
}

const searchPage: FC<searchPageProps> = async ({ searchParams }) => {
  const productsSearch = await getProductsByTitle(searchParams.title);
  const products = await getProducts({
    isFeatured: true,
  });
  const allProductsLength = (await getProducts({})).length;
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <Container>
        <div className='mt-[72px]'>
          <div className='mb-2 flex flex-col gap-y-6 px-10 py-3'>
            <SearchInput />
          </div>
          <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 py-5'>
            <ProductList
              title={`${
                productsSearch.length !== allProductsLength
                  ? "Search results:"
                  : "All products"
              }`}
              items={productsSearch}
            />
          </div>
          <div className='py-10 px-4 sm:px-6 lg:px-8'></div>
        </div>
        <div className='w-full px-4 sm:px-6 lg:px-8 py-5'>
          <ProductsHorizontalList title='Featured Products' items={products} />
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
        <div className='mt-[72px]'>
          <div className='mb-2 flex flex-col gap-y-6 px-10 py-3'>
            <SearchInput />
          </div>
          <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 py-5'>
            <ProductList
              title={`${
                productsSearch.length !== allProductsLength
                  ? "Search results:"
                  : "All products"
              }`}
              items={productsSearch}
            />
          </div>
          <div className='py-10 px-4 sm:px-6 lg:px-8'></div>
        </div>
        <div className='w-full px-4 sm:px-6 lg:px-8 py-5'>
          <ProductsHorizontalList title='Featured Products' items={products} />
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
      <div className='mt-[72px]'>
        <div className='mb-2 flex flex-col gap-y-6 px-10 py-3'>
          <SearchInput />
        </div>
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8 py-5'>
          <ProductList
            title={`${
              productsSearch.length !== allProductsLength
                ? "Search results:"
                : "All products"
            }`}
            items={productsSearch}
            favorites={favorites}
            wishlists={wishlist}
          />
        </div>
        <div className='py-10 px-4 sm:px-6 lg:px-8'></div>
      </div>
      <div className='w-full px-4 sm:px-6 lg:px-8 py-5'>
        <ProductsHorizontalList
          title='Featured Products'
          items={products}
          favorites={favorites}
          wishlists={wishlist}
        />
      </div>
    </Container>
  );
};

export default searchPage;
