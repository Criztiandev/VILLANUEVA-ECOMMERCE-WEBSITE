/* eslint-disable @typescript-eslint/no-explicit-any */
import { InputHTMLAttributes } from "react";
import { useFormContext, FieldValues } from "react-hook-form";
import Text from "./Text";
import Heading from "./Heading";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  title?: string;
  default?: string | number | boolean;
}

const Toggle = (props: Props) => {
  const { register, formState, setValue } = useFormContext<FieldValues>();
  const { errors } = formState;

  const errorMessage: any = errors[props.name as string]?.message;

  if (props.default) {
    setValue(props.name, props.default);
  }

  return (
    <label
      className="grid gap-2 w-full"
      style={{ gridTemplateRows: `24px auto ${errorMessage && "24px"}` }}>
      {props.title && (
        <Heading level={3} className="font-semibold">
          {props.title}
        </Heading>
      )}
      <input
        type="checkbox"
        {...props}
        {...register(props?.name)}
        className={`toggle ${props.className ? props.className : ""} ${
          errorMessage ? "input-error" : ""
        }`}
        autoComplete={`current-${props.name}`}
      />
      {errorMessage && (
        <Text className="text-error text-base">{errorMessage}</Text>
      )}
    </label>
  );
};

export default Toggle;
