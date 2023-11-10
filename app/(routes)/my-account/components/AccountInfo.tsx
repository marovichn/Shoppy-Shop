import { Calendar, Mail, User, UserCheck } from 'lucide-react';
import { FC } from 'react'

interface AccountInfoProps {
  userData: {
    id: string;
    email: string;
    hashedPassword: string;
    name: string;
    lastname: string;
    age: string;
    gender: string;
  } | null;
}

const AccountInfo: FC<AccountInfoProps> = ({userData}) => {
  return (
    <div className='max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <h1 className='text-3xl font-bold mb-6'>User Account Information</h1>
      <div className='grid grid-cols-2 gap-4 max-sm:flex max-sm:flex-col'>
        <div className='flex items-center  max-sm:items-start'>
          <User className='w-6 h-6 mr-2' />
          <span className='font-semibold'>
            {userData?.name} {userData?.lastname}
          </span>
        </div>
        <div className='flex items-center  max-sm:items-start'>
          <Mail className='w-6 h-6 mr-2' />
          <span className='font-semibold'>{userData?.email}</span>
        </div>
        <div className='flex items-center  max-sm:items-start'>
          <Calendar className='w-6 h-6 mr-2' />
          <span className='font-semibold'>{userData?.age} years</span>
        </div>
        <div className='flex items-center  max-sm:items-start'>
          <UserCheck className='w-6 h-6 mr-2' />
          <span className='font-semibold'>{userData?.gender}</span>
        </div>
      </div>
    </div>
  );
}

export default AccountInfo