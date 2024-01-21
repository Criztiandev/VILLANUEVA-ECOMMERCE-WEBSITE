/* eslint-disable @typescript-eslint/no-explicit-any */
import viewIcon from "@/assets/icons/view_light_icon.svg";
import editIcon from "@/assets/icons/edit_light_icon.svg";
import trashIcon from "@/assets/icons/delete_light_icon.svg";
import Modal from "@/components/Modal";
import DeleteModal from "@/containers/DeleteModal";
import { CellContext } from "@tanstack/react-table";
import queryUtils from "@/utils/query.utils";
import { QueryKey } from "@tanstack/react-query";
import { Link } from "react-router-dom";

interface Props<T> {
  data: CellContext<T, any>;
  deleteFn: (id: string) => Promise<any>;
  invalidateKey: QueryKey;
  isView?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
}

const ActionCell = <T,>({
  isView = true,
  isEdit = true,
  isDelete = true,
  ...props
}: Props<T>) => {
  const { original } = props?.data?.row as { original: any };
  const { _id: UID } = original as { _id: string };

  const mutation = queryUtils.mutation({
    mutationFn: async () => await props.deleteFn(UID),
    invalidateKey: [`${props.invalidateKey}`],
    toast: "Deletedd Successfully",
  });

  const handleSubmit = () => {
    mutation.mutate({});
  };

  return (
    <>
      <div className="flex gap-4 justify-center items-center">
        {isView && (
          <Link to={`${UID}`}>
            <button className="p-2 rounded-[5px] bg-gray-200 text-white">
              <img src={viewIcon} />
            </button>
          </Link>
        )}
        {isEdit && (
          <Link to={`edit/${UID}`}>
            <button className="p-2 rounded-[5px] bg-gray-200 text-white">
              <img src={editIcon} />
            </button>
          </Link>
        )}
        {isDelete && (
          <Modal.Button
            target={`${UID}-delete-modal`}
            icon={trashIcon}
            className="p-2 rounded-[5px] bg-gray-200 text-white"
          />
        )}
      </div>

      <DeleteModal id={`${UID}-delete-modal`} onSubmit={handleSubmit} />
    </>
  );
};

export default ActionCell;
