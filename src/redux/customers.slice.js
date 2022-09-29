import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CustomersService from "../services/customers.service";

// First, create the thunk
export const getCustomers = createAsyncThunk(
  'getCustomers',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await CustomersService.getCustomers()
      // console.log(`--- successful response: ${JSON.stringify(response)}`)
      return fulfillWithValue(response)
    } catch (err) {
      console.log(`--- error response: ${JSON.stringify(err)}`)
      return rejectWithValue(err)
    }
  }
)

export const addCustomer = createAsyncThunk(
  "addCustomer",
  async (customer, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await CustomersService.addCustomer(customer);
      console.log(`Added successfuly`);
      return fulfillWithValue(res);
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);

export const editCustomer = createAsyncThunk(
  "editCustomer",
  async (customer, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await CustomersService.editCustomer(customer);
      console.log(`Edited successfuly`);
      return fulfillWithValue(res);
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);

export const deleteCustomer = createAsyncThunk(
  "deleteCustomer",
  async (customer, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await CustomersService.deleteCustomer(customer);
      console.log(`Deleted successfuly`);
      return fulfillWithValue(res);
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);


const customersSlice = createSlice({
  name: 'customers',
  initialState: {
    isLoading: false,
    isEditingCustomer: false,
    isDeletingCustomer: false,
    customers: [],
    errorMessage: '',
    successMessage: '',
  },
  reducers: {
    clearMessages: (state, action) => {
      state.errorMessage = '';
      state.successMessage = '';
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getCustomers.pending, (state, action) => {
      console.log('--- get customers pending...')
      state.isLoading = true
      state.customers = []
      state.errorMessage = '';
      state.successMessage = '';
    })

    builder.addCase(getCustomers.fulfilled, (state, action) => {
      console.log('--- get customers fulfilled...')
      state.isLoading = false
      state.customers = action.payload || []
      state.successMessage = action.payload.length === 0 ? 'No customers found.' : 'Successfully retrieved customers.';
    })

    builder.addCase(getCustomers.rejected, (state, action) => {
      console.log('--- get customers rejected...')
      state.isLoading = false
      state.customers = []
      state.errorMessage = 'Unable to retrieve customers';
    })

    builder.addCase(addCustomer.pending, (state, action) => {
      console.log("--- add customer pending...");
      state.isLoading = true;
    });

    builder.addCase(addCustomer.fulfilled, (state, action) => {
      console.log("--- add customer fulfilled...");
      state.isLoading = false;
      state.customers.push(action.payload);
      state.successMessage = `Successfully added customers`;
    });

    builder.addCase(addCustomer.rejected, (state, action) => {
      console.log("--- add customer rejected...");
      state.isLoading = false;
    });

    builder.addCase(editCustomer.pending, (state, action) => {
      console.log("--- edit customer pending...");
      state.isEditingCustomer = true;
      state.errorMessage = '';
      state.successMessage = '';
    });

    builder.addCase(editCustomer.fulfilled, (state, action) => {
      console.log("--- edit customer fulfilled...");
      state.isEditingCustomer = false;
      let indexOfUpdatedCustomer = state.customers.findIndex((customer) => customer.id === action.payload.id);
      if (indexOfUpdatedCustomer !== -1) {
        state.customers.splice(indexOfUpdatedCustomer, 1, action.payload);
        state.successMessage = `Successfully updated customer`;
      }
    });

    builder.addCase(editCustomer.rejected, (state, action) => {
      console.log("--- edit customer rejected...");
      state.isEditingCustomer = false;
      state.errorMessage = 'Unable to edit customer.';
    });

    builder.addCase(deleteCustomer.pending, (state, action) => {
      console.log("--- delete customer pending...");
      state.isDeletingCustomer = true;
      state.errorMessage = '';
      state.successMessage = '';
    });

    builder.addCase(deleteCustomer.fulfilled, (state, action) => {
      console.log("--- delete customer fulfilled...");
      state.isDeletingCustomer = false;
      let indexOfDeletedCustomer = state.customers.findIndex((customer) => customer.id === action.payload.id);
      if (indexOfDeletedCustomer !== -1) {
        state.customers.splice(indexOfDeletedCustomer, 1);
        state.successMessage = `Successfully deleted customer`;
      }
    });

    builder.addCase(deleteCustomer.rejected, (state, action) => {
      console.log("--- delete customer rejected...");
      state.isDeletingCustomer = false;
      state.errorMessage = 'Unable to delete customer.';
    });
  },
})

export const { clearMessages } = customersSlice.actions;

export default customersSlice.reducer;
