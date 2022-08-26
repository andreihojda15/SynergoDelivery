import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PackagesService from "../services/packages.service";

// First, create the thunk
export const getPackages = createAsyncThunk(
  "getPackages",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await PackagesService.getPackagesFail();
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

// Then, handle actions in your reducers:
const packagesSlice = createSlice({
  name: "packages",
  initialState: {
    isLoading: false,
    packages: [],
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
    builder.addCase(getPackages.pending, (state, action) => {
      console.log("--- get packages pending...");
      state.isLoading = true;
      state.packages = [];
      state.errorMessage = '';
      state.successMessage = '';
    });

    builder.addCase(getPackages.fulfilled, (state, action) => {
      console.log("--- get packages fulfilled...");
      state.isLoading = false;
      state.isError = false;
      state.packages = action.payload || [];
      state.successMessage = action.payload.length === 0 ? 'No packages found.' : 'Successfully retrieved packages.';
    });

    builder.addCase(getPackages.rejected, (state, action) => {
      console.log("--- get packages rejected...");
      state.isLoading = false;
      state.isError = true;
      state.packages = [];
      state.errorMessage = 'Unable to retrieve packages';
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
  },
});

// Action creators are generated for each case reducer function
export const { clearMessages } = packagesSlice.actions

export default packagesSlice.reducer;
