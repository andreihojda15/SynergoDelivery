import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CarsService from "../services/cars.service";
import { addPackageToCar } from "./common.thunks";

// First, create the thunk
export const getCars = createAsyncThunk(
  "getCars",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await CarsService.getCars();
      console.log(`--- successful response: ${JSON.stringify(response)}`);
      return fulfillWithValue(response);
    } catch (err) {
      console.log(`--- error response: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);

export const getAvailableCars = createAsyncThunk(
  "getAvailableCars",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await CarsService.getAvailableCars();
      console.log(`--- successful response: ${JSON.stringify(response)}`);
      return fulfillWithValue(response);
    } catch (err) {
      console.log(`--- error response: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
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

export const editCar = createAsyncThunk(
  "editCar",
  async (car, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await CarsService.editCar(car);
      console.log(`--- successful response: ${JSON.stringify(response)}`);
      return fulfillWithValue(response);
    } catch (err) {
      console.log(`--- error response: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);

export const deleteCar = createAsyncThunk(
  "deleteCar",
  async (car, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await CarsService.deleteCar(car);
      console.log(`--- successful response: ${JSON.stringify(response)}`);
      return fulfillWithValue(response);
    } catch (err) {
      console.log(`--- error response: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    isLoading: false,
    isLoadingList: false,
    isLoadingDriverToCar: false,
    isLoadingAvailableCars: false,
    isEditingCar: false,
    isDeletingCar: false,
    cars: [],
    availableCars: [],
    errorMessage: "",
    successMessage: "",
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
    clearMessages: (state, action) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },

  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getCars.pending, (state, action) => {
      console.log("--- get cars pending...");
      state.isLoading = true;
      state.cars = [];
      state.errorMessage = "";
      state.successMessage = "";
    });

    builder.addCase(getCars.fulfilled, (state, action) => {
      console.log("--- get cars fulfilled...");
      state.isLoading = false;
      state.isError = false;
      state.cars = action.payload || [];
      state.successMessage =
        action.payload.length === 0
          ? "No car found."
          : "Successfully retrieved cars.";
    });

    builder.addCase(getCars.rejected, (state, action) => {
      console.log("--- get cars rejected...");
      state.isLoading = false;
      state.isError = true;
      state.cars = [];
      state.errorMessage = "Unable to retrieve packages";
    });

    builder.addCase(getAvailableCars.pending, (state, action) => {
      console.log("--- get available cars pending...");
      state.isLoadingAvailableCars = true;
      state.availableCars = [];
      state.errorMessage = "";
      state.successMessage = "";
    });

    builder.addCase(getAvailableCars.fulfilled, (state, action) => {
      console.log("--- get available cars fulfilled...");
      state.isLoadingAvailableCars = false;
      state.isError = false;
      state.availableCars = action.payload || [];
      state.successMessage =
        action.payload.length === 0
          ? "No car found."
          : "Successfully retrieved available cars.";
    });

    builder.addCase(getAvailableCars.rejected, (state, action) => {
      console.log("--- get available cars rejected...");
      state.isLoadingAvailableCars = false;
      state.isError = true;
      state.availableCars = [];
      state.errorMessage = "Unable to retrieve packages";
    });

    builder.addCase(addCar.pending, (state, action) => {
      console.log("--- add car pending...");
      state.isLoading = true;
    });

    builder.addCase(addCar.fulfilled, (state, action) => {
      console.log("--- add car fulfilled...");
      state.isLoading = false;
      state.successMessage = 'Successfully added cars';
      state.cars.push(action.payload); // state.cars = [...state.cars, action.payload]
    });

    builder.addCase(addCar.rejected, (state, action) => {
      console.log("--- add car rejected...");
      state.isLoading = false;
      state.isError = true;
      state.errorMessage = 'Unable to add car';
    });

    builder.addCase(addPackageToCar.pending, (state, action) => {
      console.log("--- add package to car pending...");
      state.isError = false;
      state.isLoadingList = true;
    });

    builder.addCase(addPackageToCar.fulfilled, (state, action) => {
      console.log("--- add package to car fulfilled...");
      state.isError = false;
      state.isLoadingList = false;
      let indexOfUpdatedCar = state.cars.findIndex(
        (car) => car.id === action.payload.car.id
      );
      if (indexOfUpdatedCar !== -1) {
        state.cars.splice(indexOfUpdatedCar, 1, action.payload.car);
      }
    });

    builder.addCase(addPackageToCar.rejected, (state, action) => {
      console.log("--- add package to car rejected...");
      state.isError = true;
      state.isLoadingList = false;
    });

    builder.addCase(editCar.pending, (state, action) => {
      console.log("--- edit car pending...");
      state.isEditingCar = true;
      state.errorMessage = "";
      state.successMessage = "";
    });

    builder.addCase(editCar.fulfilled, (state, action) => {
      console.log("--- edit car fulfilled...");
      state.isEditingCar = false;
      let indexOfUpdatedCar = state.cars.findIndex(
        (car) => car.id === action.payload.id
      );
      if (indexOfUpdatedCar !== -1) {
        state.cars.splice(indexOfUpdatedCar, 1, action.payload);
        state.successMessage = `Successfully updated car with registration number ${action.payload.registrationNumber}.`;
      }
    });

    builder.addCase(editCar.rejected, (state, action) => {
      console.log("--- edit car rejected...");
      state.isEditingCar = false;
      state.errorMessage = "Unable to edit car.";
    });

    builder.addCase(deleteCar.pending, (state, action) => {
      console.log("--- delete car pending...");
      state.isDeletedCar = true;
      state.errorMessage = '';
      state.successMessage = '';
    });

    builder.addCase(deleteCar.fulfilled, (state, action) => {
      console.log("--- delete car fulfilled...");
      state.isDeletedCar = false;
      let indexOfDeletedCar = state.cars.findIndex((car) => car.id === action.payload.id);
      if (indexOfDeletedCar !== -1) {
        state.cars.splice(indexOfDeletedCar, 1);
        state.successMessage = `Successfully deleted the car`;
      }
    });

    builder.addCase(deleteCar.rejected, (state, action) => {
      console.log("--- delete car rejected...");
      state.isDeletedCar = false;
      state.errorMessage = 'Unable to delete car.';
    });

  },

});

// Action creators are generated for each case reducer function
export const { clearMessages } = carsSlice.actions;

export default carsSlice.reducer;
