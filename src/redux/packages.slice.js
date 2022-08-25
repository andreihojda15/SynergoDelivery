import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import PackagesService from "../services/packages.service";

// First, create the thunk
export const getPackages = createAsyncThunk("getPackages", async () => {
  try {
    const response = await PackagesService.getPackages();
    // TODO: add proper handling for a fail
    console.log(`--- successful response: ${JSON.stringify(response)}`);
    return response;
  } catch (err) {
    console.log(`--- error response: ${JSON.stringify(err)}`);
    return err;
  }
});

export const addPackage = createAsyncThunk("addPackage", async (pack) => {
  try {
    const res = await PackagesService.addPackage(pack);
    console.log(`Added successfuly`);
    return res;
  } catch (err) {
    console.log(`Error: ${JSON.stringify(err)}`);
    return err;
  }
});

// Then, handle actions in your reducers:
const packagesSlice = createSlice({
  name: "packages",
  initialState: {
    isLoading: false,
    packages: [],
  },
  reducers: {
    // standard reducer logic, with auto-generated action types per reducer
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getPackages.pending, (state, action) => {
      console.log("--- get packages pending...");
      state.isLoading = true;
      state.packages = [];
    });

    builder.addCase(getPackages.fulfilled, (state, action) => {
      console.log("--- get packages fulfilled...");
      state.isLoading = false;
      state.packages = action.payload || [];
    });

    builder.addCase(getPackages.rejected, (state, action) => {
      console.log("--- get packages rejected...");
      state.isLoading = false;
      state.packages = [];
      // TODO: handle error messages
    });

    builder.addCase(addPackage.fulfilled, (state, action) => {
      console.log("--- add package fulfilled...");
      state.packages = action.payload || [];
      console.log(`state: ${state.packages.length}`);
    });
  },
});

export default packagesSlice.reducer;
