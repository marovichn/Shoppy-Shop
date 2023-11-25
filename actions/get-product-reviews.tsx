import db from "@/lib/db";
import { Review } from "@prisma/client";

export const getProductReviews = async (
  productId: string
): Promise<Review[]> => {
  return new Promise(async (resolve, reject) => {
    try {
      if (!productId) {
        reject([]);
      } else {
        const reviews = await db.review.findMany({
          where: {
            productId: productId,
          },
          include: {
            user: true,
          },
        });

        resolve(reviews);
      }
    } catch (error: any) {
      console.error("Error retrieving products by title:", error.message);
      reject(error);
    }
  });
};
