import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { getProductReviews } from "@/actions/get-product-reviews";
import ProductDisplay from "./components/ProductDisplay";

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
  const productReviews = await getProductReviews(params.productId);

  if (!product) {
    return null;
  }

  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <ProductDisplay
        product={product}
        productId={product.id}
        productReviews={productReviews}
        suggestedProducts={suggestedProducts}
      />
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
      <ProductDisplay
        product={product}
        productId={product.id}
        productReviews={productReviews}
        sessionEmail={session.user.email}
        suggestedProducts={suggestedProducts}
      />
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
    <ProductDisplay
      product={product}
      productId={product.id}
      productReviews={productReviews}
      sessionEmail={session.user.email}
      suggestedProducts={suggestedProducts}
      currentUser={currentUser}
      favorites={favorites}
      wishlist={wishlist}
    />
  );
};

export default ProductPage;
