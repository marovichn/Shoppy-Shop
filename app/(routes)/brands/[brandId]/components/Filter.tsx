"use client";

import { Color, Size } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { FC } from "react";
import qs from "query-string";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FilterProps {
  name: string;
  valueKey: string;
  data: (Size | Color)[];
}

const Filter: FC<FilterProps> = ({ name, valueKey, data }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const selectedValue = searchParams.get(valueKey);

  const onClick = (id: string) => {
    const current = qs.parse(searchParams.toString());

    const query = {
      ...current,
      [valueKey]: id,
    };

    if (current[valueKey] === id) {
      query[valueKey] = null;
    }

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query,
      },
      {
        skipNull: true,
      }
    );

    router.push(url);
  };
  return (
    <div className='mb-8'>
      <h3 className='text-lg font-semibold'>{name}</h3>
      <hr className='my-4' />
      <div className='flex flex-wrap gap-2'>
        {data.map((filter) => (
          <div key={filter.id} className='flex items-center'>
            <Button
              className={cn(
                "hover:text-white rounded-md text-sm hover:bg-gray-800 text-gray-800 p-2 bg-white border border-gray-300",
                selectedValue === filter.id && "bg-gray-800 text-white"
              )}
              onClick={() => onClick(filter.id)}
            >
              {filter.name} /{" "}
              <div
                className='ml-2 font-extrabold'
                style={{
                  backgroundColor: name == "Colors" ? filter.value : "",
                  borderRadius: name == "Colors" ? "50%" : "",
                  width: name == "Colors" ? "15px" : "",
                  height: name == "Colors" ? "16px" : "",
                  border: name == "Colors" ? "1px solid black" : "",
                }}
              >
                {name !== "Colors" ? filter.value : ""}
              </div>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Filter;
