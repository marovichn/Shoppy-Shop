import { Product } from "@/types";
import { Brand } from "@prisma/client";
import qs from "query-string";

const URL = `${process.env.NEXT_PUBLIC_API_URL}/brands`;

interface Query {
  categoryId?: string;
  colorId?: string;
  sizeId?: string;
  isFeatured?: boolean;
}
const getBrands = async (): Promise<Brand[]> => {
  const url = URL;

  const res = await fetch(url);

  return res.json();
};

export default getBrands;
