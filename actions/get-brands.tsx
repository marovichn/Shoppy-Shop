import { Brand } from "@prisma/client";


const URL = `${process.env.NEXT_PUBLIC_API_URL}/brands`;

const getBrands = async (): Promise<Brand[]> => {
  const url = URL;

  const res = await fetch(url);

  return res.json();
};

export default getBrands;
