import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createPhase, deletePhase, editPhase, fetchPhase } from "./PhaseAPI";
const initialState = {
  status: "idle",
  phase: [],
};

export const createPhaseAsync = createAsyncThunk(
  "phase/createPhase",
  async (data) => {
    try {
      const response = await createPhase(data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchPhaseAsync = createAsyncThunk(
  "phase/fetchPhase",
  async () => {
    try {
      const response = await fetchPhase();
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const deletePhaseAsync = createAsyncThunk(
  "phase/deletePhase",
  async (id) => {
    try {
      const response = await deletePhase(id);
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const editPhaseAsync = createAsyncThunk(
  "phase/editPhase",
  async ({ id, data }) => {
    try {
      const response = await editPhase(id, data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const phaseSlice = createSlice({
  name: "phase",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createPhaseAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createPhaseAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.phase.push(action.payload.data);
      })
      .addCase(fetchPhaseAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPhaseAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.phase = action.payload;
      })
      .addCase(deletePhaseAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deletePhaseAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.phase.findIndex(
          (item) => item._id === action.payload._id
        );
        console.log(index, action.payload);
        state.phase.splice(index, 1);
      })
      .addCase(editPhaseAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editPhaseAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.phase.findIndex(
          (item) => item._id === action.payload?.data._id
        );
        state.phase.splice(index, 1, action.payload.data);
      });
  },
});

export const getAllPhase = (state) => state.phase.phase;

export default phaseSlice.reducer;
