import { OrderModel, RecentOrderModel, RecentService } from "@/interface/model";
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

const orderTable: TableStructProps<OrderModel> = {
  base: "order",
  name: "order-table",
  columns: tableUtils.columnGenerator<OrderModel>({
    deleteFn: () => {},
    invalidateKey: ["order"],
    options: [
      { name: "OID", header: "Order ID", isFirst: true },
      { name: "quantity", header: "Quantity", isBadge: true },
      { name: "address", header: "Address" },
      { name: "ammount", header: "Ammount" },
      { name: "UID", header: "Order by" },
      { name: "purchasedAt", header: "Purchased Date" },
      { name: "status", header: "Status" },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

export default { recentOrderTable, recentService, orderTable };
