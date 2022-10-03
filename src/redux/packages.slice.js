import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CarsService from "../services/cars.service";
import PackagesService from "../services/packages.service";
import { addPackageToCar } from "./common.thunks";

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

export const getAvailablePackages = createAsyncThunk(
  "getAvailablePackages",
  async (id, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await CarsService.getAvailablePackages(id);
      // console.log(`--- successful response: ${response}`);
      return fulfillWithValue(response);
    } catch (err) {
      console.log(`--- error response: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);

export const managePackages = createAsyncThunk(
  "managePackages",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await PackagesService.managePackages(data);
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

export const deletePackage = createAsyncThunk(
  "deletePackage",
  async (pack, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await PackagesService.deletePackage(pack);
      console.log(`Delete successfuly`);
      return fulfillWithValue(res);
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);

export const editPackage = createAsyncThunk(
  "editPackage",
  async (pack, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await PackagesService.editPackage(pack);
      console.log(`Edit successfuly`);
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
    isManaged: false,
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

    builder.addCase(getAvailablePackages.pending, (state, action) => {
      console.log("--- get available packages pending...");
      state.isLoading = true;
      state.availablePackages = [];
      state.errorMessage = "";
      state.successMessage = "";
    });

    builder.addCase(getAvailablePackages.fulfilled, (state, action) => {
      console.log("--- get available packages fulfilled...");
      state.isLoading = false;
      state.isError = false;
      state.availablePackages = action.payload || [];
      state.successMessage =
        action.payload.length === 0
          ? "No packages found."
          : "Successfully retrieved packages.";
    });

    builder.addCase(getAvailablePackages.rejected, (state, action) => {
      console.log("--- get available packages rejected...");
      state.isLoading = false;
      state.isError = true;
      state.availablePackages = [];
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
        (pack) => pack.id === action.payload.pack.id
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

    builder.addCase(managePackages.pending, (state, action) => {
      console.log("--- manage package pending...");
      state.isError = false;
      state.isManaged = true;
    });

    builder.addCase(managePackages.rejected, (state, action) => {
      console.log("--- manage package rejected...");
      state.isError = true;
      state.isManaged = false;
    });

    builder.addCase(managePackages.fulfilled, (state, action) => {
      console.log("--- manage package fulfilled...");
      state.isError = false;
      let indexOfUpdatedPackage = state.packages.findIndex(
        (pack) => pack.id === action.payload.id
      );
      if (indexOfUpdatedPackage !== -1) {
        state.packages.splice(indexOfUpdatedPackage, 1, action.payload);
      }
      state.isManaged = false;
    });
    builder.addCase(deletePackage.pending, (state, action) => {
      console.log("--- delete package pending...");
      state.isDelPackage = true;
      state.errorMessage = "";
      state.successMessage = "";
    });

    builder.addCase(deletePackage.fulfilled, (state, action) => {
      console.log("--- delete package fulfilled...");
      state.isDelPackage = false;
      let indexOfUpdatedPack = state.packages.findIndex(
        (pack) => pack.id === action.payload.id
      );
      if (indexOfUpdatedPack !== -1) {
        state.packages.splice(indexOfUpdatedPack, 1);
        state.successMessage = `Successfully deleted package.`;
      }
    });

    builder.addCase(deletePackage.rejected, (state, action) => {
      console.log("--- delete package rejected...");
      state.isDelPackage = false;
      state.errorMessage = "Unable to delete package.";
    });

    builder.addCase(editPackage.pending, (state, action) => {
      console.log("--- edit package pending...");
      state.isEditingPackage = true;
      state.errorMessage = "";
      state.successMessage = "";
    });

    builder.addCase(editPackage.fulfilled, (state, action) => {
      console.log("--- edit package fulfilled...");
      state.isEditingPackage = false;
      let indexOfUpdatedPack = state.packages.findIndex(
        (pack) => pack.id === action.payload.id
      );
      if (indexOfUpdatedPack !== -1) {
        state.packages.splice(indexOfUpdatedPack, 1, action.payload);
        state.successMessage = `Successfully updated package.`;
      }
    });

    builder.addCase(editPackage.rejected, (state, action) => {
      console.log("--- edit package rejected...");
      state.isEditingPackage = false;
      state.errorMessage = "Unable to edit package.";
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearMessages } = packagesSlice.actions;

export default packagesSlice.reducer;
