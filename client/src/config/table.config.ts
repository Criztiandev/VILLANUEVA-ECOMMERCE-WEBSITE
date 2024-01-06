/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from "@/interface/user";
import tableUtils from "@/utils/table.utils";
import { QueryKey } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";

interface Props<T> {
  base: string;
  name: string;
  invalidateKey: QueryKey;
  columns: ColumnDef<T, any>[];
}

const general = {
  cellWidth: "200px",
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
};

const userTable: Props<User> = {
  base: "users",
  name: "users-table",
  invalidateKey: ["users"] as QueryKey,
  columns: tableUtils.columnGenerator<User>({
    invalidateKey: ["users"],
    options: [
      { name: "userName", header: "User Name", isFirst: true },
      { name: "email", header: "Email" },
      { id: "role", name: "role", header: "Role", isBadge: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

export default { userTable, general };
