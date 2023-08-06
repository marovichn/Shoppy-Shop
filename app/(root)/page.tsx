import getBillboard from '@/actions/get-billboard';
import Billboard from '@/components/Billboard'
import Container from '@/components/ui/container'

export const revalidate = 0;

export default async function Home() {
const billboard = await getBillboard("8e5d7b6e-e257-4795-87fd-a14ac1ef1bae");

  return (
    <Container><div className='space-y-10 pb-10'>
      <Billboard textColor='#fff' data={billboard}/></div></Container>
  )
}
