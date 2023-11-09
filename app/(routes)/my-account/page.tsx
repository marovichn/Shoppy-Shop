"use client"

import { Button } from '@/components/ui/button'
import { signOut } from 'next-auth/react'
import { FC } from 'react'

interface pageProps {
  
}

const page: FC<pageProps> = ({}) => {
  return <div className='mt-20'><Button onClick={()=>signOut()}>SignOut</Button></div>
}

export default page