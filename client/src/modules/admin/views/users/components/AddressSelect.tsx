/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChangeEvent } from "react";

interface Props {
  title: string;
  onSelect: (event: ChangeEvent<HTMLSelectElement>) => void;
  options: any;
  disabled?: boolean;
  default?: string;
}
const AddressSelect = (props: Props) => {
  return (
    <label className="flex flex-col gap-2 w-[280px] ">
      <h3 className="text-[18px] font-bold">{props.title}</h3>
      <select
        className="select select-bordered"
        onChange={props.onSelect}
        disabled={props.disabled}>
        <option value={""} className="text-base">
          {props.default
            ? props.default
            : props.disabled
            ? "Waiting..."
            : `Select ${props.title}`}
        </option>
        {props.options?.map(
          ({ code, name }: { code: string; name: string }) => (
            <option
              key={`${name}-${code}`}
              value={`${name}-${code}`}
              className="text-base">
              {name}
            </option>
          )
        )}
      </select>
    </label>
  );
};

export default AddressSelect;
