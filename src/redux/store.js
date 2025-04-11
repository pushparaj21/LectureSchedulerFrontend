import { configureStore } from "@reduxjs/toolkit";
import { lectureSchedulerApi } from "./features/lectureSchedulerApi";

export const store = configureStore({
  reducer: {
    [lectureSchedulerApi.reducerPath]: lectureSchedulerApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(lectureSchedulerApi.middleware),
});
