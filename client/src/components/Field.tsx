/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from "react";
import { useFormContext, FieldValues } from "react-hook-form";
import Heading from "./Heading";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title?: string;
  default?: any;
}

const Field = (props: Props) => {
  const { register, formState, setValue } = useFormContext<FieldValues>();
  const { errors } = formState;

  const errorMessage: any = errors[props.name as string]?.message;

  if (props.default) {
    setValue(props.name, props.default);
  }

  return (
    <label
      className="flex flex-col gap-2 w-full"
      style={{ gridTemplateRows: `24px auto ${errorMessage && "24px"}` }}>
      {props.title && (
        <Heading level={3} className="font-semibold">
          {props.title}
        </Heading>
      )}
      <div
        className={`${
          errorMessage && !props.disabled && "tooltip tooltip-bottom"
        }`}
        data-tip={`${errorMessage && !props.disabled && errorMessage}`}>
        <input
          {...props}
          {...register(props?.name)}
          className={`input input-bordered ${
            props.className ? props.className : ""
          } w-full ${errorMessage ? "input-error" : ""}`}
          autoComplete={`current-${props.name}`}
        />
      </div>
    </label>
  );
};

export default Field;
