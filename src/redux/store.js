import { configureStore } from "@reduxjs/toolkit";
import gamesReducer from "./gamesSlice";
import errorReducer from "./errorSlice";

export const store = configureStore({
  reducer: {
    games: gamesReducer,
    error: errorReducer,
  },
});
