import { ChangeEvent, forwardRef } from "react";

interface Props {
  cover: File | null | undefined;
  onFileSelect: (event: ChangeEvent<HTMLInputElement>) => void;
}

const CoverImage = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <label className="relative w-full border-2 rounded-[5px] p-4 flex justify-center items-center h-[400px]">
      <input
        ref={ref}
        type="file"
        multiple
        onChange={props.onFileSelect}
        className="file-input file-input-bordered"
      />
      {props.cover && (
        <img
          src={URL.createObjectURL(props.cover)}
          className="absolute top-0 object-cover w-full h-full rounded-[5px]"
        />
      )}
    </label>
  );
});

export default CoverImage;
