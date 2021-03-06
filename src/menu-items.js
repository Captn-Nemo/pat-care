export default {
  AdminLinks: [
    {
      id: "navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "concernsList",
          title: "Concerns List",
          type: "item",
          icon: "feather icon-alert-circle",
          url: "/admin/depts",
          // target: true,
        },
        {
          id: "roomConcerns",
          title: "Rooms",
          type: "item",
          icon: "feather icon-home",
          url: "/admin/rooms",
          // target: true,
        },
        {
          id: "departments",
          title: "Resources",
          type: "item",
          icon: "feather icon-user-plus",
          url: "/admin/add",
          // target: true,
        },
        // {
        //   id: "diet",
        //   title: "Diet",
        //   type: "item",
        //   icon: "feather icon-list",
        //   url: "/admin/diets",
        //   // target: true
        // },
      ],
    },
  ],
  UserLinks: [
    {
      id: "navigation",
      type: "group",
      icon: "icon-navigation",
      children: [
        {
          id: "home",
          title: "Home",
          type: "item",
          icon: "feather icon-home",
          url: "/app/home",
          // target: true,
        },
        // {
        //   id: "Booking",
        //   title: "Booking",
        //   type: "item",
        //   icon: "feather icon-book",
        //   url: "/app/booking",
        //   // target: true,
        // },
        {
          id: "OrderFood",
          title: "Order Food",
          type: "item",
          icon: "feather icon-list",
          url: "/app/orderfood",
          // target: true,
        },
        {
          id: "myorders",
          title: "My Orders",
          type: "item",
          icon: "feather icon-list",
          url: "/app/myorders",
          // target: true,
        },
      ],
    },
  ],
};
