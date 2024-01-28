import Button from "@/components/Button";
import componentsUtils from "@/utils/components.utils";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";

interface Props<T> {
  payload: T[];
  filter: string;
  categoryFilter: string;
  onFilter: (event: ChangeEvent<HTMLInputElement>) => void;
  onCategoryFilter: (event: ChangeEvent<HTMLSelectElement>) => void;
  toggleTable: () => void;
}

const GridViewAction = <T,>(props: Props<T>) => {
  const renderOptions = componentsUtils.optionTransformer<T>({
    payload: props.payload || [],
    options: {
      key: "name",
      value: "name",
    },
  });

  return (
    <div className="flex justify-between items-center mb-4">
      <div className="w-[450px] flex gap-4">
        <input
          className="input input-bordered"
          placeholder="Search here"
          value={props.filter}
          onChange={props.onFilter}
        />

        <select
          className="select select-bordered w-full"
          value={props.categoryFilter}
          onChange={props.onCategoryFilter}
          disabled={props.payload?.length > 0 ? false : true}>
          <option value={""}>
            {props.payload.length > 0 ? "All Product" : "Not available"}
          </option>
          {renderOptions.map((field) => (
            <option key={field.title} value={field.value}>
              {field.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex gap-4">
        <Link to={"/products/create"}>
          <Button title="Create" />
        </Link>
        <Button
          className="btn-circle"
          icon="T"
          title="T"
          onClick={props.toggleTable}
        />
      </div>
    </div>
  );
};

export default GridViewAction;
