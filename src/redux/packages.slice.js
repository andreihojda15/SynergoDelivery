import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PackagesService from "../services/packages.service";

// First, create the thunk
export const getPackages = createAsyncThunk(
  "getPackages",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await PackagesService.getPackages();
      // console.log(`--- successful response: ${JSON.stringify(response)}`);
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

export const getAvailablePackages = createAsyncThunk(
  "getAvailablePackages",
  async (car, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await PackagesService.getAvailablePackages(car);
      console.log(
        `--- successful response for available packages: ${JSON.stringify(
          response
        )}`
      );
      return fulfillWithValue(response);
    } catch (err) {
      console.log(`--- error response: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);

export const setPackage = createAsyncThunk(
  "setPackage",
  async (pack, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await PackagesService.setPackage(pack);
      console.log(`--- successful response: ${JSON.stringify(response)}`);
      return fulfillWithValue(response);
    } catch (err) {
      console.log(`--- error response: ${JSON.stringify(err)}`);
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

    builder.addCase(getAvailablePackages.pending, (state, action) => {
      console.log("--- get available packages pending...");
      state.isLoadingList = true;
      state.availablePackages = [];
      state.errorMessage = "";
      state.successMessage = "";
    });

    builder.addCase(getAvailablePackages.fulfilled, (state, action) => {
      console.log("--- get available packages fulfilled...");
      state.isLoadingList = false;
      state.isError = false;
      state.availablePackages = action.payload || [];
      state.successMessage =
        action.payload.length === 0
          ? "No packages found."
          : "Successfully retrieved packages.";
    });

    builder.addCase(getAvailablePackages.rejected, (state, action) => {
      console.log("--- get available packages rejected...");
      state.isLoadingList = false;
      state.isError = true;
      state.availablePackages = [];
      state.errorMessage = "Unable to retrieve available packages";
    });

    builder.addCase(setPackage.rejected, (state, action) => {
      console.log("--- set package rejected...");
      state.isLoadingList = false;
      state.isError = true;
      state.errorMessage = "Unable to retrieve package";
    });

    builder.addCase(setPackage.pending, (state, action) => {
      console.log("--- set package pending...");
      state.isLoadingList = true;
      state.errorMessage = "";
      state.successMessage = "";
    });

    builder.addCase(setPackage.fulfilled, (state, action) => {
      console.log("--- set package fulfilled...");
      state.isLoadingList = false;
      state.packages.find((pack) => pack.guid === action.payload.guid).carID =
        "set";
      state.errorMessage = "";
      state.successMessage = "Succesfully retrieved package";
      debugger;
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearMessages } = packagesSlice.actions;

export default packagesSlice.reducer;
