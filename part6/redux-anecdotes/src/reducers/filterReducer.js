import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    filterChange(state, action) {
      return action.payload;
    },
  },
});

export const { filterChange } = filterSlice.actions;

export const createFilter = (filterText) => {
  return async (dispatch) => {
    dispatch(filterChange(filterText));
  };
};

export default filterSlice.reducer;
