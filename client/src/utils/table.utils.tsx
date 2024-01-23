/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createColumnHelper } from "@tanstack/react-table";
import { ColumnDef } from "@tanstack/react-table";
import { ColumnOption } from "@/interface/component";
import Badge from "@/components/Badge";
import { QueryKey } from "@tanstack/react-query";
import { useState } from "react";
import queryUtils from "./query.utils";
import CheckBox from "@/components/Checkbox";
import FirstCell from "@/components/Table/parts/TableFirstCell";
import ActionCell from "@/components/Table/cells/ActionCell";

interface Props<T> {
  deleteFn: any;
  updateFn?: any;
  invalidateKey: QueryKey;
  options: ColumnOption<T>[];
}

export default {
  columnGenerator: <T,>({
    options,
    ...props
  }: Props<T>): ColumnDef<T, any>[] => {
    const columnHelper = createColumnHelper<T>();

    return options.map((items) => {
      // Action Cell
      if (items?.isLast) {
        return {
          id: items.name as string,
          header: items.header,
          cell: (info) => (
            <ActionCell<T>
              data={info}
              deleteFn={props.deleteFn}
              invalidateKey={props.invalidateKey}
              {...items}
            />
          ),
        };
      }

      // First Cell
      if (items.isFirst) {
        return columnHelper.accessor((row) => row[items.name], {
          id: items.name as string,
          header: () => items.header,
          cell: (info) => (
            <div className="grid grid-cols-[32px_auto] gap-2 items-center place-items-start ">
              <CheckBox
                {...{
                  checked: info.row.getIsSelected(),
                  disabled: !info.row.getCanSelect(),
                  indeterminate: info.row.getIsSomeSelected(),
                  onChange: info.row.getToggleSelectedHandler(),
                }}
              />

              <FirstCell data={info} />
            </div>
          ),
        });
      }

      // Badge Cell
      if (items.isBadge) {
        return columnHelper.accessor((row: any) => row[items.name], {
          id: items.name as string,
          header: () => items.header,
          cell: (info) => {
            if (items.badgeStatus === "error") {
              return (
                <Badge className="border-2 bg-[#ff3f3f80] border-blue-400  p-4 capitalize text-black">
                  {info.getValue()} {items.content}
                </Badge>
              );
            }

            return (
              <Badge className="border-2 bg-[#4ba8f480] border-blue-400  p-4 capitalize text-black">
                {info.getValue()} {items.content}
              </Badge>
            );
          },
        });
      }

      // Date Cell
      if (items.isDate) {
        return columnHelper.accessor((row: any) => row[items.name], {
          id: items.name as string,
          header: () => items.header,
          cell: (info) => (
            // mongoose convert to date
            <div>{new Date(info.getValue()).toLocaleDateString()}</div>
          ),
        });
      }

      // Toggle Cell
      if (items.isToggle) {
        return columnHelper.accessor((row: any) => row[items.name], {
          id: items.name as string,
          header: () => items.header,
          cell: (info) => {
            const [toggle, setToggle] = useState<boolean>(info.getValue());
            const { _id } = info?.row?.original as { _id: string };

            const mutation = queryUtils.mutation({
              mutationFn: async (payload: any) => props.updateFn(_id, payload),
              invalidateKey: props.invalidateKey,
              onSuccess: () => {
                setToggle((prev) => !prev);
              },
            });

            const handleToggle = () => {
              mutation.mutate({ isPublished: !toggle });
            };

            return (
              <input
                type="checkbox"
                className="toggle"
                checked={toggle}
                onClick={handleToggle}
                disabled={mutation.isPending}
              />
            );
          },
        });
      }

      return columnHelper.accessor((row) => row[items.name], {
        id: items.name as string,
        header: () => items.header,
        cell: (info) => <span className="opacity-85">{info.getValue()}</span>,
      });
    });
  },
};
