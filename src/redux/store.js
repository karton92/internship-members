import { configureStore } from "@reduxjs/toolkit";
import internshipReducer from "./features/internshipSlice";

export const store = configureStore({
  reducer: {
    intern: internshipReducer,
  },
});
