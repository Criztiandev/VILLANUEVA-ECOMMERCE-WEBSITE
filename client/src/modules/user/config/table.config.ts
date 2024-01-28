import {
  OrderPayload,
  RecentOrderModel,
  RecentService,
} from "@/interface/model";
import tableUtils from "@/utils/table.utils";
import { TableStructProps } from "@/interface/component";

const recentOrderTable: TableStructProps<RecentOrderModel> = {
  base: "recent-order",
  name: "recent-order-table",
  columns: tableUtils.columnGenerator<RecentOrderModel>({
    updateFn: () => {},
    deleteFn: () => {},
    invalidateKey: ["recent-order"],
    options: [
      { name: "refID", header: "Reference ID", isFirst: true },
      { name: "status", header: "Status", isBadge: true },
      { name: "date", header: "Status", isBadge: true },
      { name: "price", header: "Status", isBadge: true },
      {
        name: "_id",
        header: "Action",
        isLast: true,
        isDelete: false,
        isEdit: false,
      },
    ],
  }),
};
const recentService: TableStructProps<RecentService> = {
  base: "recent-service",
  name: "recent-service-table",
  columns: tableUtils.columnGenerator<RecentService>({
    updateFn: () => {},
    deleteFn: () => {},
    invalidateKey: ["recent-service"],
    options: [{ name: "name", header: "Name", isFirst: true }],
  }),
};

const orderTable: TableStructProps<OrderPayload> = {
  base: "order",
  name: "order-table",
  columns: tableUtils.columnGenerator<OrderPayload>({
    deleteFn: () => {},
    invalidateKey: ["order"],
    options: [
      { name: "refID", header: "Reference ID", isFirst: true },
      { name: "quantity", header: "Quantity" },
      { name: "price", header: "Price" },
      { name: "purchasedDate", header: "Purchased Date" },
      { name: "total", header: "Ammount" },
      { name: "status", header: "Status", isBadge: true },
      { name: "fullName", header: "Customer" },
      {
        name: "_id",
        header: "Action",
        isLast: true,
        isDelete: false,
        isEdit: false,
      },
    ],
  }),
};

export default { recentOrderTable, recentService, orderTable };
