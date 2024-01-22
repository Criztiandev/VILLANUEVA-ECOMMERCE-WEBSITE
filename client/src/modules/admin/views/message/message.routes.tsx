/* eslint-disable react-refresh/only-export-components */
import MainEntryPoint from ".";
import DetailsScreen from "./pages/MessageDetails";
import MessageTable from "./pages/MessageTable";

const base = "message";

const categoryRoutes = [
  {
    path: `/${base}`,
    element: <MainEntryPoint />,
    children: [
      {
        path: `/${base}`,
        element: <MessageTable />,
      },
      { path: `/${base}/:id`, element: <DetailsScreen /> },
    ],
  },
];

export default categoryRoutes;
