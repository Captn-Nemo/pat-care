import * as actionTypes from "./types";
import config from "./../config";

const initialState = {
  categories: [],
  nursingStations: [],
  departments: [],
  designations: [],
};

const adminReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_DEPARTMENTS:
      return {
        ...state,
        departments: action.payload,
      };
    case actionTypes.REMOVE_DEPARTMENTS:
      return {
        ...state,
        departments: initialState.departments,
      };

    case actionTypes.ADD_CATEEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case actionTypes.REMOVE_CATEEGORIES:
      return {
        ...state,
        categories: initialState.categories,
      };

    case actionTypes.ADD_NURSINGSTATIONS:
      return {
        ...state,
        nursingStations: action.payload,
      };
    case actionTypes.REMOVE_NURSINGSTATIONS:
      return {
        ...state,
        nursingStations: initialState.nursingStations,
      };

    case actionTypes.ADD_DESIGNATIONS:
      return {
        ...state,
        designations: action.payload,
      };
    case actionTypes.REMOVE_DESIGNATIONS:
      return {
        ...state,
        designations: initialState.designations,
      };

    default:
      return state;
  }
};

export default adminReducer;
