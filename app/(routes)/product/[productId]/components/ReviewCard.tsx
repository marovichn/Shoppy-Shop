"use client";

import Image from "next/image";
import { MouseEventHandler } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Trash, User } from "lucide-react";
import StarsSelect from "./StarsSelect";
import axios from "axios";
import toast from "react-hot-toast";

interface ReviewCard {
  data: any;
  currentUser?: any;
}

const ReviewCard: React.FC<ReviewCard> = ({ data, currentUser }) => {
  const session = useSession();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      if (!data || !currentUser || !session.data?.user) {
        toast.error("You are not allowed to do that");
        return;
      }

      await axios.post("/api/delete-review", data);
      toast.success("Successfully deleted your review.");
      router.refresh();
    } catch (err) {
      toast.error("Error deleting review");
    }
  };

  return (
    <div className='bg-white rounded-xl border p-3 space-y-4 border-black'>
      <div className='flex items-center justify-start gap-x-3 flex-row max-md:flex-col max-md:items-start md:justify-between gap-y-3 p-3'>
        <div className='flex items-center justify-start gap-x-3'>
          <div className='p-2 rounded-full bg-neutral-100 '>
            <User></User>
          </div>
          <p className='font-semibold text-lg'>
            {data.user.name} {data.user.lastname}
          </p>
        </div>
        <div>
          <StarsSelect
            onChange={() => {}}
            disabled
            initValue={data.value}
          ></StarsSelect>
        </div>
      </div>
      <div className='flex flex-col gap-y-3'>
        <h1 className='pl-3 -mt-3'>Review:</h1>
        <div className='p-3 bg-neutral-100 rounded-xl  overflow-hidden whitespace-normal '>
          <p className='text-sm'>{data.description}</p>
        </div>
      </div>
      {session && session.data?.user?.email &&
        currentUser &&
        session.data?.user?.email === currentUser.email && (
          <div
            className='flex items-center justify-start cursor-pointer'
            onClick={handleDelete}
          >
            <div className=' h-10 flex gap-x-3 items-center justify-center px-5 p-2 rounded-full bg-red-500 text-white hover:bg-red-700'>
              <Trash></Trash>
              <p>Delete my review</p>
            </div>
          </div>
        )}
    </div>
  );
};

export default ReviewCard;
