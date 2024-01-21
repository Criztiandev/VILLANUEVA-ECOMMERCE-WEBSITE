/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";

interface Props {
  title: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}
const AddressInput = (props: Props) => {
  return (
    <label className="flex flex-col gap-2 w-[280px] ">
      <h3 className="text-[18px] font-bold">{props.title}</h3>
      <input className="input input-bordered" {...props} />
    </label>
  );
};

export default AddressInput;
