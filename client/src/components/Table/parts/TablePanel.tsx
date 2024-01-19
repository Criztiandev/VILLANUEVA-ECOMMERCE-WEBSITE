import { RootReducer } from "@/service/store";
import { useDispatch, useSelector } from "react-redux";
import { setGlobalFilter } from "@/service/store/slice/table.slice";
import SearchBar from "@/components/SearchBar";

import { BaseProps } from "@/interface/component";

interface Props extends BaseProps {
  name: string;
  title: string;
}

const Panel = (props: Props) => {
  const dispatch = useDispatch();
  const selector = useSelector((state: RootReducer) => state.table[props.name]);

  return (
    <div className="flex justify-between items-center my-4">
      <h2 className="text-[28px] font-semibold">{props.title}</h2>

      <div className="flex gap-4">
        <SearchBar
          value={selector?.globalFilter}
          onChange={(e) =>
            dispatch(setGlobalFilter({ id: props.name, data: e.target.value }))
          }
          placeholder="Search here"
        />
        {props.children}
      </div>
    </div>
  );
};

export default Panel;
