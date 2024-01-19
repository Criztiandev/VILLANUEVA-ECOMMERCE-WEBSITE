import { RootReducer } from "@/service/store";
import { setGlobalFilter } from "@/service/store/slice/table.slice";
import { ReactNode } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
  name: string;
  title: string;
  children?: ReactNode;
}

const Panel = ({ name, title, ...props }: Props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootReducer) => state.table[name]);

  return (
    <div className="flex justify-between items-center">
      <h1 className="text-[24px] my-4">{title}</h1>

      <div className="flex gap-2">
        <input
          className="input input-bordered input-md w-[250px]"
          placeholder="Search Category here"
          value={selector?.globalFilter}
          onChange={(e) =>
            dispatch(setGlobalFilter({ id: name, data: e.target.value }))
          }
        />
        {props.children}
      </div>
    </div>
  );
};

export default Panel;
