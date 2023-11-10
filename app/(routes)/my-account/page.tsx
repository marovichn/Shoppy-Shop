import { FC } from "react";
import AccountInfo from "./components/AccountInfo";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import db from "@/lib/db";
import UserLists from "./components/UserLists";
import getProducts from "@/actions/get-products";
import UserActions from "./components/UserLists";

interface pageProps {}

const page: FC<pageProps> = async ({}) => {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return <>No Data</>;
  }
  const userData = await db.user.findUnique({
    where: {
      email: session.user.email,
    },
  });
  const products = await getProducts({
    isFeatured: true,
  });

  return (
    <div className='w-full pt-20'>
      <AccountInfo userData={userData} />
      <UserActions/>
    </div>
  );
};

export default page;
