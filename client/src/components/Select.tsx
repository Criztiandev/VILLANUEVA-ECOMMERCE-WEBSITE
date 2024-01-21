import React from "react";
import { useFormContext, FieldValues } from "react-hook-form";
import Heading from "./Heading";

/* eslint-disable @typescript-eslint/no-explicit-any */

interface Options {
  title: string;
  value: string | number;
}

interface Props {
  title?: string;
  name: string;
  placeholder: string;
  option: Array<Options>;
  className?: string;
  default?: string | number;
  disabled?: boolean;
}

const Select = (props: Props) => {
  const { register, formState, setValue } = useFormContext<FieldValues>();
  const { errors } = formState;
  const errorMessage: any = errors[props.name as string]?.message;

  // Set default value if provided
  React.useEffect(() => {
    if (props.default) {
      setValue(props.name, props.default);
    }
  }, [props.default, props.name, setValue]);

  const defaultClass = `${
    props.className && props.className
  } w-full select select-bordered`;

  const tooltipDisplay = props?.disabled
    ? "No Categories available"
    : errorMessage
    ? `${props.title} is ${errorMessage}`
    : null;

  return (
    <label className="relative flex flex-col gap-2 w-full">
      {props.title && (
        <Heading level={3} className="text-[18px]">
          {props.title}
        </Heading>
      )}

      <div
        className={`${
          (props.disabled || errorMessage) && "tooltip  tooltip-bottom"
        }  flex w-full ${errorMessage && !props.disabled && "tooltip-error"}`}
        data-tip={tooltipDisplay}>
        <select
          {...props}
          {...register(props?.name)}
          className={`${
            errorMessage
              ? "select border-2 border-red-500 w-full"
              : defaultClass
          }`}>
          {/* Placeholder */}
          <option value={""} className="text-[18px]">
            {props.placeholder}
          </option>

          {/* Options */}
          {props.option &&
            props.option?.map((field) => (
              <option
                key={field.title}
                value={field.value}
                className="text-[18px]">
                {field.title}
              </option>
            ))}
        </select>
      </div>
    </label>
  );
};

export default Select;
