import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CarsService from "../services/cars.service";

export const getCars = createAsyncThunk(
  'getCars',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await CarsService.getCars()
      console.log(`--- successful response: ${JSON.stringify(response)}`)
      return fulfillWithValue(response)
    } catch(err) {
      console.log(`--- error response: ${JSON.stringify(err)}`)
      return rejectWithValue(err)
    }
  }
)

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    isLoading: false,
    cars: [],
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getCars.pending, (state, action) => {
      console.log("--- get cars pending...");
      state.isLoading = true;
      state.cars = [];
    });

    builder.addCase(getCars.fulfilled, (state, action) => {
      console.log("--- get cars fulfilled...");
      state.isLoading = false;
      state.cars = action.payload || [];
    });

    builder.addCase(getCars.rejected, (state, action) => {
      console.log("--- get cars rejected...");
      state.isLoading = false;
      state.cars = [];
      // TODO: handle error messages
    });
  },
});

export default carsSlice.reducer;
