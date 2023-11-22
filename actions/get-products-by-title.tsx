import db from "@/lib/db";
import { Product } from "@/types";

export const getProductsByTitle = async (title: string): Promise<Product[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!title) {
        const allProducts = await db.product.findMany({
          include: {
            images: true,
            category: true,
            color: true,
            size: true,
            brand: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        const productsAllFiltered = allProducts.map((product) => ({
          ...product,
          stockAmount: Number(product.stockAmount).toString(),
        }));

        resolve(productsAllFiltered as any);
      } else {
        const products = await db.product.findMany({
          where: {
            name: {
              contains: title,
            },
          },
          include: {
            images: true,
            category: true,
            color: true,
            size: true,
            brand: true,
          },
          orderBy: {
            createdAt: "desc",
          },
        });

        const productsSearch = products.map((productSearch) => ({
          ...productSearch,
          stockAmount: Number(productSearch.stockAmount).toString(),
        }));

        resolve(productsSearch as any);
      }
    } catch (error: any) {
      console.error("Error retrieving products by title:", error.message);
      reject(error);
    }
  });
};
