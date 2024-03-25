import { lazy } from "react";

export const clientRoutes = [
  {
    path: "/about",
    title: "About",
    component: lazy(() => import("~/pages/client/about/about")),
  },
];
export const adminRoutes = [
  {
    path: "products",
    title: "Product",
    component: lazy(() => import("~/pages/admin/product/productManager")),
  },
];