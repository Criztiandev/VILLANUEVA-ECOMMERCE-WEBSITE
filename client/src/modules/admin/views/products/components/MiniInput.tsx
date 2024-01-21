import AddIcon from "@/assets/icons/plus_light_icon.svg";
import { ChangeEvent } from "react";

interface Props {
  onSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}

const MiniInput = ({ onSelect }: Props) => {
  return (
    <label className="relative w-full h-full rounded-[5px] border-gray-400 border-2 border-dashed flex justify-center items-center  flex-col">
      <img src={AddIcon} alt="Add Icon" className="w-[50%] opacity-50" />
      <span className="text-sm font-semibold">Add</span>
      <input type="file" multiple hidden onChange={onSelect} />
    </label>
  );
};

export default MiniInput;
