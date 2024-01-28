/* eslint-disable react-refresh/only-export-components */
import MainEntryPoint from "../views/message";
import MessageTable from "../views/message/screen/MessageTable";

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
