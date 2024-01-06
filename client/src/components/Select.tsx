import { useFormContext, FieldValues } from "react-hook-form";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Options {
  title: string;
  value: string | number;
}

interface Props {
  title: string;
  name: string;
  placeholder: string;
  option: Array<Options>;
  className?: string;
  default?: string | number;
}

const Select = (props: Props) => {
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
      <span className="text-base font-medium">{props.title}</span>

      <select
        {...props}
        {...register(props?.name)}
        className={`${
          props.className ? props.className : ""
        } select select-bordered w-full`}>
        <option value={""}>{props.placeholder}</option>
        {props.option?.map((field) => (
          <option key={field.title} value={field.value}>
            {field.title}
          </option>
        ))}
      </select>

      {errorMessage && (
        <span className="text-base text-error">{errorMessage}</span>
      )}
    </label>
  );
};

export default Select;
