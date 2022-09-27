import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomersService from "../services/customers.service";

// First, create the thunk
export const getCustomers = createAsyncThunk(
  "getCustomers",
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await CustomersService.getCustomers();
      //console.log(`--- successful response: ${JSON.stringify(response)}`);
      return fulfillWithValue(response);
    } catch (err) {
      console.log(`--- error response: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);


const customersSlice = createSlice({
  name: "customers",
  initialState: {
    isLoading: false,
    isLoadingList: false,
    isEditingCustomer: false,
    customers: [],
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
    builder.addCase(getCustomers.pending, (state, action) => {
      console.log("--- get customers pending...");
      state.isLoading = true;
      state.customers = [];
      state.errorMessage = "";
      state.successMessage = "";
    });

    builder.addCase(getCustomers.fulfilled, (state, action) => {
      console.log("--- get customers fulfilled...");
      state.isLoading = false;
      state.isError = false;
      state.customers = action.payload || [];
      state.successMessage =
        action.payload.length === 0
          ? "No customers found."
          : "Successfully retrieved customers.";
    });

    builder.addCase(getCustomers.rejected, (state, action) => {
      console.log("--- get customers rejected...");
      state.isLoading = false;
      state.isError = true;
      state.customers = [];
      state.errorMessage = "Unable to retrieve customers";
    });
  },
});

// Action creators are generated for each case reducer function
export const { clearMessages } = customersSlice.actions;

export default customersSlice.reducer;
