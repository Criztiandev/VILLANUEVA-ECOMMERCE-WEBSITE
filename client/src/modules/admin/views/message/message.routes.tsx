/* eslint-disable react-refresh/only-export-components */
import MainEntryPoint from ".";
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
    ],
  },
];

export default categoryRoutes;
