import {
  OrderPayload,
  RecentOrderModel,
  RecentService,
  ServiceScheduleModel,
} from "@/interface/model";
import tableUtils from "@/utils/table.utils";
import { TableStructProps } from "@/interface/component";
import orderApi from "../api/order.api";

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

const serviceSchedule: TableStructProps<ServiceScheduleModel> = {
  base: "service-schedule",
  name: "service-schedule-table",
  columns: tableUtils.columnGenerator<ServiceScheduleModel>({
    updateFn: () => {},
    deleteFn: () => {},
    invalidateKey: ["service-schedule-table"],
    options: [
      { name: "serviceId", header: "Service ID", isFirst: true },
      { name: "customer", header: "Customer" },
      { name: "schedule", header: "Schedule" },
      { name: "budget", header: "Budget" },
      { name: "completionDate", header: "Completion Date" },
      { name: "status", header: "Status", isBadge: true },
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

const ArchiveProductTable: TableStructProps<OrderPayload> = {
  base: "archive-product",
  name: "archive-product-table",
  columns: tableUtils.columnGenerator<OrderPayload>({
    deleteFn: orderApi.deleteById,
    invalidateKey: ["archive-product"],
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
        isEdit: false,
        isDelete: false,
      },
    ],
  }),
};

export default {
  recentOrderTable,
  recentService,
  orderTable,
  serviceSchedule,
  ArchiveProductTable,
};
