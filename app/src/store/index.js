import { configureStore } from "@reduxjs/toolkit";
import phaseSlice from "./PhaseSlice";

export const store = configureStore({
  reducer: {
    phase: phaseSlice,
  },
}); 
