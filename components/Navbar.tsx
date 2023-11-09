import Link from "next/link";
import Container from "./ui/container";
import NavbarActions from "./NavbarActions";
import MainNav from "./MainNav";
import getCategories from "@/actions/get-categories";
import MobileMenu from "./MobileMenu";

export const revalidate = 0;

const Navbar = async () => {
  const categories = await getCategories();
  const isLongList = categories.length > 2;

  return (
    <div className='border-b fixed top-0 z-50 bg-white w-screen min-w-screen'>
      <Container>
        <div className='relative px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between'>
          <div className='max-sm:flex hidden items-center justify-center'>
            <Link href='/' className='ml-4 flex lg:ml-0 gap-x-2'>
              <p className='font-bold text-xl'>Shoppy</p>
            </Link>
          </div>
          <div className='max-sm:block hidden'>
            <MobileMenu routes={categories} />
          </div>
          <div className='sm:flex hidden items-center justify-center'>
            <Link href='/' className='ml-4 flex lg:ml-0 gap-x-2'>
              <p className='font-bold text-xl'>Shoppy</p>
            </Link>
            {!isLongList && <MainNav data={categories} />}
          </div>
          <div className='sm:flex hidden items-center justify-center'>
            <div className="-mr-5"><NavbarActions /></div>
            {isLongList && <MobileMenu routes={categories}/>}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
