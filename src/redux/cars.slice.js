import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CarsService from "../services/cars.service";

// First, create the thunk
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
);


export const addCar = createAsyncThunk(
  "addCar",
  async (car, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await CarsService.addCar(car);
      console.log(`Added successfuly`);
      return fulfillWithValue(res);
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    isLoading: false,
    cars: [],
    errorMessage: '',
    successMessage: '',
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    clearMessages: (state, action) => {
      state.errorMessage = '';
      state.successMessage = '';
  },
},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getCars.pending, (state, action) => {
      console.log("--- get cars pending...");
      state.isLoading = true;
      state.cars = [];
      state.errorMessage = '';
      state.successMessage = '';
    });

    builder.addCase(getCars.fulfilled, (state, action) => {
      console.log("--- get cars fulfilled...");
      state.isLoading = false;
      state.isError = false;
      state.cars = action.payload || [];
      state.successMessage = action.payload.length === 0 ? 'No car found.' : 'Successfully retrieved cars.';
    });

    builder.addCase(getCars.rejected, (state, action) => {
      console.log("--- get cars rejected...");
      state.isLoading = false;
      state.isError = true;
      state.cars = [];
      state.errorMessage = 'Unable to retrieve packages';
    });

    builder.addCase(addCar.pending, (state, action) => {
      console.log("--- add car pending...");
      state.isError = false;
      state.isLoading = true;
    });

    builder.addCase(addCar.fulfilled, (state, action) => {
      console.log("--- add car fulfilled...");
      state.isError = false;
      state.isLoading = false;
      state.cars.push(action.payload); // state.cars = [...state.cars, action.payload]
    });

    builder.addCase(addCar.rejected, (state, action) => {
      console.log("--- add car rejected...");
      state.isError = true;
      state.isLoading = false;
    });

    // builder.addCase(editCar.pending, (state, action) => {
    //   console.log("--- edit car pending...");
    //   state.isError = false;
    //   state.isLoading = true;
    // });

    // builder.addCase(editCar.fulfilled, (state, action) => {
    //   console.log("--- edit car fulfilled...");
    //   state.isError = false;
    //   state.isLoading = false;
    //   state.cars.push(action.payload); // state.cars = [...state.cars, action.payload]
    // });

    // builder.addCase(editCar.rejected, (state, action) => {
    //   console.log("--- edit car rejected...");
    //   state.isError = true;
    //   state.isLoading = false;
    // });
  },
});

// Action creators are generated for each case reducer function
export const { clearMessages } = carsSlice.actions

export default carsSlice.reducer;

