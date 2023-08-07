import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import Billboard from "@/components/Billboard";
import ProductList from "@/components/ProductList";
import Container from "@/components/ui/container";

export const revalidate = 0;

export default async function Home() {
  const billboard = await getBillboard("8e5d7b6e-e257-4795-87fd-a14ac1ef1bae");
  const products = await getProducts({
    isFeatured:true,
  });

  return (
    <Container>
      <div className='space-y-10 pb-10'>
        <Billboard textColor='#fff' data={billboard} />
        <div className='flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8'>
          <ProductList title='Featured Products' items={products} />
        </div>
      </div>
    </Container>
  );
}
