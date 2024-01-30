/* eslint-disable @typescript-eslint/no-explicit-any */
import viewIcon from "@/assets/icons/view_light_icon.svg";
import editIcon from "@/assets/icons/edit_light_icon.svg";
import trashIcon from "@/assets/icons/delete_light_icon.svg";
import Modal from "@/components/Modal";
import DeleteModal from "@/containers/DeleteModal";
import { CellContext } from "@tanstack/react-table";
import queryUtils from "@/utils/query.utils";
import { QueryKey } from "@tanstack/react-query";
import KebbabIcon from "@/assets/icons/kebbab_light_icon.svg";
import { Link } from "react-router-dom";
import Button from "@/components/Button";

interface Props<T> {
  data: CellContext<T, any>;
  deleteFn: (id: string) => Promise<any>;
  invalidateKey: QueryKey;
  isView?: boolean;
  isEdit?: boolean;
  isDelete?: boolean;
}

interface Items {
  title: string;
  icon: string;
  path: string;
  isActive?: boolean;
}

const ActionCell = <T,>({
  isView = true,
  isEdit = true,
  isDelete = true,
  ...props
}: Props<T>) => {
  const { original } = props?.data?.row as { original: any };
  const { _id: UID } = original as { _id: string };

  const ActionItems: Items[] = [
    { title: "View", icon: viewIcon, path: `${UID}`, isActive: isView },
    { title: "Edit", icon: editIcon, path: `edit/${UID}`, isActive: isEdit },
    { title: "Delete", icon: trashIcon, path: "/", isActive: isDelete },
  ];

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
        <div className="dropdown dropdown-end">
          <Button
            tabIndex={0}
            as="ghost"
            dir="left"
            icon={KebbabIcon}
            className="btn-circle"
          />
          <ul
            tabIndex={0}
            className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-[4px] w-[130px] border">
            {ActionItems.map((items: Items) => {
              if (items.title === "Delete") {
                return items.isActive && <ModalButton UID={UID} />;
              }

              return <DropdonItems key={items.title} {...items} />;
            })}
          </ul>
        </div>
      </div>

      <DeleteModal id={`${UID}-delete-modal`} onSubmit={handleSubmit} />
    </>
  );
};

const DropdonItems = ({ icon, title, path, isActive }: Items) => {
  return (
    <>
      {isActive && (
        <li>
          <Link to={path}>
            <img src={icon} loading="lazy" alt="icon" />
            <span>{title}</span>
          </Link>
        </li>
      )}
    </>
  );
};

const ModalButton = ({ UID }: { UID: string }) => {
  return (
    <li>
      <Modal.Button
        target={`${UID}-delete-modal`}
        dir="left"
        icon={trashIcon}
        title="Delete"
      />
    </li>
  );
};

export default ActionCell;
