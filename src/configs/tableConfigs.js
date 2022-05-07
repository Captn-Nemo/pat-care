import React from "react";
import moment from "moment";
export const HOSPITAL_TABLE = [
  { title: "ID", field: "Id" },
  { title: "Code", field: "Code" },
  { title: "Name", field: "Name" },
  {
    title: "Address",
    field: "Address",
  },
  // {
  //   title: "Logo",
  //   field: "Logo",
  // },
];
export const DEPARTMENT_TABLE = [
  { title: "ID", field: "Id" },
  { title: "Code", field: "Code" },
  { title: "Name", field: "Name" },
  {
    title: "Notes",
    field: "Notes",
  },
];
export const USERS = [
  { title: "ID", field: "Id" },
  { title: "First Name", field: "FirstName" },
  { title: "LAst Name", field: "LastName" },
  {
    title: "E mail",
    field: "Email",
  },
  // {
  //   title: "Password",
  //   field: "Password",
  // },
  {
    title: "User Group",
    field: "userGroup",
  },
];
export const DESIGNATION_TABLE = [
  { title: "ID", field: "Id" },
  { title: "Code", field: "Code" },
  { title: "Name", field: "Name" },
  {
    title: "Notes",
    field: "Notes",
  },
];
export const NS_TABLE = [
  { title: "ID", field: "Id" },
  { title: "Code", field: "Code" },
  { title: "Name", field: "Name" },
  {
    title: "Notes",
    field: "Notes",
  },
];
export const ROOM_CAT_TABLE = [
  { title: "ID", field: "Id" },
  { title: "Code", field: "Code" },
  { title: "Name", field: "Name" },
  {
    title: "Notes",
    field: "Notes",
  },
];
export const EMPLOYEE_TABLE = [
  { title: "ID", field: "Id" },
  { title: "Code", field: "Code" },
  { title: "Name", field: "Name" },
  {
    title: "Department",
    field: "dept",
  },
  {
    title: "NursingStation",
    field: "station",
  },
  {
    title: "Designation",
    field: "desig",
  },
  {
    title: "Address",
    field: "Address",
  },
  // {
  //   title: "photo",
  //   field: "photo",
  //   render: (rowData) => (
  //     <img
  //       src={"https://avatars0.githubusercontent.com/u/7895451?s=460&v=4"}
  //       style={{ width: 40, borderRadius: "50%" }}
  //     />
  //   ),
  // },
  {
    title: "remarks",
    field: "remarks",
  },
];
export const ROOMS_TABLE = [
  { title: "ID", field: "Id" },
  { title: "Code", field: "Code" },
  { title: "Name", field: "Name" },
  { title: "Category", field: "cat" },
  {
    title: "Floor",
    field: "Floor",
  },
  {
    title: "Section",
    field: "Section",
  },
  {
    title: "Notes",
    field: "Notes",
  },
];

export const FOOD_ITEMS_TABLE = [
  { title: "ID", field: "Id" },
  { title: "Code", field: "Code" },
  { title: "Name", field: "Name" },
  {
    title: "Description",
    field: "Description",
  },
  // {
  //   title: "photo",
  //   field: "imagePath",
  //   render: (rowData) => {
  //     if (rowData.imgPath) {
  //       return (
  //         <img
  //           src={rowData.imgPath}
  //           style={{ width: 40, borderRadius: "50%" }}
  //         />
  //       );
  //     } else {
  //       return (
  //         <img
  //           src={"https://via.placeholder.com/150"}
  //           style={{ width: 40, borderRadius: "50%" }}
  //         />
  //       );
  //     }
  //   },
  // },
];

export const DIET_HEADER_TABLE = [
  { title: "ID", field: "Id" },
  { title: "Code", field: "Code" },
  { title: "Name", field: "Name" },
  {
    title: "Dinig Time",
    field: "DiningTimings",
  },
];

export const CONCERNS_TABLE = [
  { title: "ID", field: "Id" },
  { title: "Bystander", field: "BystanderId" },
  { title: "Concerns", field: "Concerns" },
  { title: "Severity", field: "Severity" },
  {
    title: "AllottedFor",

    field: "AllottedFor",
    render: (rowData) => {
      if (rowData.AllottedFor === "" || rowData.AllottedFor === null) {
        return (
          <div>
            <span>Not Allotted</span>
          </div>
        );
      } else {
        return (
          <div>
            <span>{moment(rowData.AllottedFor).format("ddd,MMM D LT")}</span>
          </div>
        );
      }
    },
  },
  { title: "RespondedStatus", field: "RespondedStatusId" },
  {
    title: "Status",
    field: "StatusId",
  },
  {
    title: "Vote",
    field: "Vote",
  },
  {
    title: "RespondedDate",
    field: "RespondedDate",
  },
];
