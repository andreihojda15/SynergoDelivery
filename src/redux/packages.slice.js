import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PackagesService from "../services/packages.service";
import { addPackageToCar, removeFromCar } from "./common.thunks";

// First, create the thunk
export const getPackages = createAsyncThunk(
  "getPackages",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await PackagesService.getPackages();
      // console.log(`--- successful response: ${response}`);
      return fulfillWithValue(response);
    } catch (err) {
      console.log(`--- error response: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);

export const addPackage = createAsyncThunk(
  "addPackage",
  async (pack, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await PackagesService.addPackage(pack);
      console.log(`Added successfuly`);
      return fulfillWithValue(res);
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);

// Then, handle actions in your reducers:
const packagesSlice = createSlice({
  name: "packages",
  initialState: {
    isLoading: false,
    isLoadingList: false,
    packages: [],
    availablePackages: [],
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
    builder.addCase(getPackages.pending, (state, action) => {
      console.log("--- get packages pending...");
      state.isLoading = true;
      state.packages = [];
      state.errorMessage = "";
      state.successMessage = "";
    });

    builder.addCase(getPackages.fulfilled, (state, action) => {
      console.log("--- get packages fulfilled...");
      state.isLoading = false;
      state.isError = false;
      state.packages = action.payload || [];
      state.successMessage =
        action.payload.length === 0
          ? "No packages found."
          : "Successfully retrieved packages.";
    });

    builder.addCase(getPackages.rejected, (state, action) => {
      console.log("--- get packages rejected...");
      state.isLoading = false;
      state.isError = true;
      state.packages = [];
      state.errorMessage = "Unable to retrieve packages";
    });

    builder.addCase(addPackage.pending, (state, action) => {
      console.log("--- add package pending...");
      state.isError = false;
      state.isLoading = true;
    });

    builder.addCase(addPackage.fulfilled, (state, action) => {
      console.log("--- add package fulfilled...");
      state.isError = false;
      state.isLoading = false;
      state.packages.push(action.payload); // state.packages = [...state.packages, action.payload]
    });

    builder.addCase(addPackage.rejected, (state, action) => {
      console.log("--- add package rejected...");
      state.isError = true;
      state.isLoading = false;
    });

    builder.addCase(addPackageToCar.pending, (state, action) => {
      console.log("--- add package to car pending...");
      state.isError = false;
      state.isLoadingList = true;
    });

    builder.addCase(addPackageToCar.fulfilled, (state, action) => {
      console.log("--- add package to car fulfilled...");
      state.isError = false;
      let indexOfUpdatedPackage = state.packages.findIndex(
        (pack) => pack.guid === action.payload.pack.guid
      );
      if (indexOfUpdatedPackage !== -1) {
        state.packages.splice(indexOfUpdatedPackage, 1, action.payload.pack);
      }
      state.isLoadingList = false;
    });

    builder.addCase(addPackageToCar.rejected, (state, action) => {
      console.log("--- add package to car rejected...");
      state.isError = true;
      state.isLoadingList = false;
    });

    builder.addCase(removeFromCar.pending, (state, action) => {
      console.log("--- remove package from car pending...");
      state.isError = false;
      state.isLoadingList = true;
    });

    builder.addCase(removeFromCar.rejected, (state, action) => {
      console.log("--- remove package from car rejected...");
      state.isError = true;
      state.isLoadingList = false;
    });

    builder.addCase(removeFromCar.fulfilled, (state, action) => {
      console.log("--- remove package from car fulfilled...");
      state.isError = false;
      let indexOfUpdatedPackage = state.packages.findIndex(
        (pack) => pack.guid === action.payload.pack.guid
      );
      if (indexOfUpdatedPackage !== -1) {
        state.packages.splice(indexOfUpdatedPackage, 1, action.payload.pack);
      }
      state.isLoadingList = false;
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearMessages } = packagesSlice.actions;

export default packagesSlice.reducer;
