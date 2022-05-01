import React from "react";
import $ from "jquery";

window.jQuery = $;
window.$ = $;
global.jQuery = $;

const DashboardDefault = React.lazy(() => import("./Scenes/Dashboard/Default"));
const Booking = React.lazy(() => import("./Scenes/Dashboard/Booking"));
const MyOrders = React.lazy(() => import("./Scenes/Dashboard/MyOrders"));
const OrderFood = React.lazy(() => import("./Scenes/Dashboard/OrderFood"));
const NursingStations = React.lazy(() =>
  import("./Scenes/Admin/NursingDept/NursingStations")
);
const AddResources = React.lazy(() =>
  import("./Scenes/Admin/AddResources/index")
);
const DietAndFoodItems = React.lazy(() =>
  import("./Scenes/Admin/Diet&Food/index")
);
const Rooms = React.lazy(() => import("./Scenes/Admin/NursingDept/Rooms"));

const routes = [
  {
    path: "/app/home",
    exact: true,
    name: "Default",
    component: DashboardDefault,
    permission: "PATIENT",
  },
  {
    path: "/app/booking",
    exact: true,
    name: "Booking",
    component: Booking,
    permission: "PATIENT",
  },
  {
    path: "/app/orderfood",
    exact: true,
    name: "orderFood",
    component: OrderFood,
    permission: "PATIENT",
  },
  {
    path: "/app/myorders",
    exact: true,
    name: "Depts",
    component: MyOrders,
    permission: "PATIENT",
  },
  {
    path: "/admin/add",
    exact: true,
    name: "addResources",
    component: AddResources,
    permission: "ADMIN",
  },
  {
    path: "/admin/diets",
    exact: true,
    name: "addResources",
    component: DietAndFoodItems,
    permission: "ADMIN",
  },

  {
    path: "/admin/depts",
    exact: true,
    name: "Depts",
    component: NursingStations,
    permission: "ADMIN",
  },
  {
    path: "/admin/rooms",
    exact: true,
    name: "roomd",
    component: Rooms,
    permission: "ADMIN",
  },
  // {
  //   path: "/app/checkout",
  //   exact: true,
  //   name: "Checkout",
  //   component: NursingStations,
  //   permission: "ADMIN",
  // },
];

export default routes;
