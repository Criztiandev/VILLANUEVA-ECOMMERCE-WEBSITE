/* eslint-disable react-refresh/only-export-components */
import withTableFetching from "@/hoc/withTableFetching.hoc";
import MainEntryPoint from "../views/service";
import ServiceCreate from "../views/service/screen/ServiceCreate";
import ServiceDetails from "../views/service/screen/ServiceDetails";
import ServiceEdit from "../views/service/screen/ServiceEdit";
import Service from "../views/service/screen/ServiceTable";
import tableConfig from "../config/table.config";
import serviceApi from "../api/service.api";
import ServiceSchedule from "../views/service/screen/ServiceSchedule";
import serviceBookApi from "@/modules/public/api/serviceBook.api";
import ServiceScheduleDetails from "../components/ServiceScheduleDetails";

const FetchProductTable = withTableFetching(Service, tableConfig.serviceTable);
const FetchServiceTable = withTableFetching(
  ServiceSchedule,
  tableConfig.serviceSchedule
);
const productRoutes = [
  {
    path: "/service",
    element: <MainEntryPoint />,
    children: [
      {
        path: "/service",
        element: <FetchProductTable fetchFn={serviceApi.fetchAll} />,
      },
      {
        path: "/service/schedule",
        element: (
          <FetchServiceTable fetchFn={() => serviceBookApi.fetchAll({})} />
        ),
      },

      { path: "/service/schedule/:id", element: <ServiceScheduleDetails /> },

      { path: "/service/create", element: <ServiceCreate /> },
      { path: "/service/:id", element: <ServiceDetails /> },
      { path: "/service/edit/:id", element: <ServiceEdit /> },
    ],
  },
];

export default productRoutes;
