import { TableStructProps } from "@/interface/component";
import {
  CategoryModel,
  ConvoModel,
  OrderPayload,
  ProductModel,
  RecentModel,
  ServiceModel,
  ServiceScheduleModel,
  UserModel,
} from "@/interface/model";
import tableUtils from "@/utils/table.utils";
import productApi from "../api/product.api";
import categoriesApi from "../api/productCategories.api";
import customerApi from "../api/customer.api";
import orderApi from "../api/order.api";
import userApi from "../api/user.api";
import serviceApi from "../api/service.api";
import serviceCategoriesApi from "../api/serviceCategories.api";
import serviceBookApi from "@/modules/public/api/serviceBook.api";

const productTable: TableStructProps<ProductModel> = {
  base: "products",
  name: "products-table",
  columns: tableUtils.columnGenerator<ProductModel>({
    updateFn: productApi.updateById,
    deleteFn: productApi.deleteById,
    invalidateKey: ["products"],
    options: [
      { name: "name", header: "Name", isFirst: true },
      { name: "category", header: "Category" },
      { name: "price", header: "Price" },
      {
        name: "stock",
        header: "Stocks",
        content: "in Stocks",
        isBadge: true,
      },
      { name: "status", header: "Status" },
      { name: "isPublished", header: "Published", isToggle: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const productCategoryTable: TableStructProps<CategoryModel> = {
  base: "product-category",
  name: "product-category-table",
  columns: tableUtils.columnGenerator<CategoryModel>({
    deleteFn: categoriesApi.deleteById,
    invalidateKey: ["product-category"],
    options: [
      { name: "name", header: "Name", isFirst: true },
      { name: "count", header: "Count", isBadge: true },
      {
        name: "_id",
        header: "Action",
        isLast: true,
        isView: false,
        isEdit: false,
      },
    ],
  }),
};
const serviceCategoryTable: TableStructProps<CategoryModel> = {
  base: "service-category",
  name: "service-category-table",
  columns: tableUtils.columnGenerator<CategoryModel>({
    deleteFn: serviceCategoriesApi.deleteById,
    invalidateKey: ["service-category"],
    options: [
      { name: "name", header: "Name", isFirst: true },
      { name: "count", header: "Count", isBadge: true },
      {
        name: "_id",
        header: "Action",
        isLast: true,
        isView: false,
        isEdit: false,
      },
    ],
  }),
};

const customerTable: TableStructProps<UserModel> = {
  base: "customer",
  name: "customer-table",
  columns: tableUtils.columnGenerator<UserModel>({
    deleteFn: customerApi.deleteById,
    invalidateKey: ["customer"],
    options: [
      { name: "firstName", header: "Name", isFirst: true },
      { name: "email", header: "Emai" },
      { name: "contact", header: "contact" },
      { name: "address", header: "Address" },
      { name: "gender", header: "Gender" },

      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const orderTable: TableStructProps<OrderPayload> = {
  base: "order",
  name: "order-table",
  columns: tableUtils.columnGenerator<OrderPayload>({
    deleteFn: orderApi.deleteById,
    invalidateKey: ["order"],
    options: [
      { name: "refID", header: "Reference ID", isFirst: true },
      { name: "quantity", header: "Quantity" },
      { name: "price", header: "Price" },
      { name: "purchasedDate", header: "Purchased Date" },
      { name: "total", header: "Ammount" },
      { name: "status", header: "Status", isBadge: true },
      { name: "fullName", header: "Customer" },
      { name: "_id", header: "Action", isLast: true, isEdit: false },
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
      { name: "_id", header: "Action", isLast: true, isEdit: false },
    ],
  }),
};

const recentTable: TableStructProps<RecentModel> = {
  base: "recent",
  name: "rencet-table",
  columns: tableUtils.columnGenerator<RecentModel>({
    deleteFn: () => {},
    invalidateKey: ["recent"],
    options: [
      { name: "no", header: "No#", isFirst: true },
      { name: "customer", header: "Customer" },
      { name: "product", header: "Product" },
      { name: "status", header: "Status", isBadge: true },
      { name: "deliverAt", header: "Deliver At" },
      { name: "total", header: "Total" },
    ],
  }),
};

const messageTable: TableStructProps<ConvoModel> = {
  base: "message",
  name: "message-table",
  columns: tableUtils.columnGenerator<ConvoModel>({
    deleteFn: () => {},
    invalidateKey: ["message"],
    options: [{ name: "participants", header: "Participants" }],
  }),
};

const userTable: TableStructProps<UserModel> = {
  base: "user",
  name: "user-table",
  columns: tableUtils.columnGenerator<UserModel>({
    deleteFn: userApi.deleteById,
    invalidateKey: ["user"],
    options: [
      { name: "firstName", header: "Name", isFirst: true },
      { name: "email", header: "Emai" },
      { name: "contact", header: "contact" },
      { name: "role", header: "Role", isBadge: true },
      { name: "gender", header: "Gender" },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const serviceTable: TableStructProps<ServiceModel> = {
  base: "service",
  name: "service-table",
  columns: tableUtils.columnGenerator<ServiceModel>({
    updateFn: serviceApi.updateById,
    deleteFn: serviceApi.deleteById,
    invalidateKey: ["service"],
    options: [
      { name: "name", header: "Name", isFirst: true },
      { name: "category", header: "Category" },
      { name: "slots", header: "Slots" },
      { name: "rate", header: "Rate" },
      { name: "startingPrice", header: "Starting Price" },
      { name: "status", header: "Status", isBadge: true },
      { name: "isPublished", header: "Published", isToggle: true },
      { name: "_id", header: "Action", isLast: true },
    ],
  }),
};

const serviceSchedule: TableStructProps<ServiceScheduleModel> = {
  base: "service-schedule",
  name: "service-schedule-table",
  columns: tableUtils.columnGenerator<ServiceScheduleModel>({
    updateFn: () => {},
    deleteFn: serviceBookApi.deleteById,
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
        isDelete: true,
        isEdit: false,
      },
    ],
  }),
};

export default {
  productTable,
  productCategoryTable,
  serviceCategoryTable,
  customerTable,
  orderTable,
  recentTable,
  messageTable,
  userTable,
  serviceTable,
  serviceSchedule,
  ArchiveProductTable,
};
