import { ArrowDown } from "lucide-react";
import { FC } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface SelectProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  options: string[];
  name: string;
}

const Select: FC<SelectProps> = ({ register, options, name,id,label, ...rest }) => {
  return (
    <>
      <label
        htmlFor={id}
        className='
          block 
          text-sm 
          font-medium 
          leading-6 
          text-gray-900
        '
      >
        {label}
      </label>
      <select
        className='w-full p-2 border-2 rounded-md '
        {...register(name)}
        {...rest}
      >
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
