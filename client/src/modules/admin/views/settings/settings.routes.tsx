import MainEntryPoint from ".";

const productRoutes = [
  {
    path: "/settings",
    element: <MainEntryPoint />,
    children: [
      {
        path: "/settings",
        element: <div></div>,
      },
    ],
  },
];

export default productRoutes;
