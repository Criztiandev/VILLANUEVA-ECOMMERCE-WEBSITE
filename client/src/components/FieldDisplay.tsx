import Heading from "./Heading";

interface Props {
  as?: "input" | "textarea";
  title: string;
  payload: string | number;
  className?: string;
}

const FieldDisplay = ({ as = "input", ...props }: Props) => {
  return (
    <label className="grid gap-2 w-full">
      <Heading level={3} className="font-semibold">
        {props.title}
      </Heading>
      <div
        className={`flex ${
          as === "input"
            ? "input input-bordered items-center "
            : "textarea textarea-bordered h-[200px] items-start"
        }  text-base w-full ${props.className}`}>
        {props.payload}
      </div>
    </label>
  );
};

export default FieldDisplay;
