import axios from "axios";
import React from "react";
import * as APIROUTES from "./apiRoutes";
import useFetch from "./useFetch";

export const GetAssignedRooms = async () => {
  let floors = [];
  let data = null;
  const res = await axios.get(APIROUTES.GET_ASSIGNED_ROOMS).then((res) => {
    floors = data = res.data;
  });
  return { floors, data };
};
