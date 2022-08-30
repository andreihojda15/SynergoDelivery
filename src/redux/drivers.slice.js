
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DriversService from '../services/drivers.service'

export const getDrivers = createAsyncThunk(
    'getDrivers',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await DriversService.getDrivers()
            // console.log(`--- successful response: ${JSON.stringify(response)}`)
            return fulfillWithValue(response)
        } catch (err) {
            console.log(`--- error response: ${JSON.stringify(err)}`)
            return rejectWithValue(err)
        }
    }
)

export const addDrivers = createAsyncThunk(
    "addDrivers",
    async (pack, { rejectWithValue, fulfillWithValue }) => {
        try {
            const res = await DriversService.addDrivers(pack);
            console.log(`Added successfuly`);
            return fulfillWithValue(res);
        } catch (err) {
            console.log(`Error: ${JSON.stringify(err)}`);
            return rejectWithValue(err);
        }
    }
);

export const editDrivers = createAsyncThunk(
    "editDrivers",
    async (pack, { rejectWithValue, fulfillWithValue }) => {
        try {
            const res = await DriversService.editDrivers(pack);
            console.log(`Edited successfuly`);
            return fulfillWithValue(res);
        } catch (err) {
            console.log(`Error: ${JSON.stringify(err)}`);
            return rejectWithValue(err);
        }
    }
);

export const deleteDrivers = createAsyncThunk(
    "deleteDrivers",
    async (pack, { rejectWithValue, fulfillWithValue }) => {
        try {
            const res = await DriversService.deleteDrivers(pack);
            console.log(`Deleted successfuly`);
            return fulfillWithValue(res);
        } catch (err) {
            console.log(`Error: ${JSON.stringify(err)}`);
            return rejectWithValue(err);
        }
    }
);

// Then, handle actions in your reducers:
const driversSlice = createSlice({
    name: 'drivers',
    initialState: {
        isLoading: false,
        drivers: [],
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
        builder.addCase(getDrivers.pending, (state, action) => {
            console.log('--- get drivers pending...')
            state.isLoading = true
            state.drivers = []
            state.errorMessage = '';
            state.successMessage = '';
        })

        builder.addCase(getDrivers.fulfilled, (state, action) => {
            console.log('--- get drivers fulfilled...')
            state.isLoading = false
            state.isError = false;
            state.drivers = action.payload || []
            state.successMessage = action.payload.length === 0 ? 'No drivers found.' : 'Successfully retrieved drivers.';
        })

        builder.addCase(getDrivers.rejected, (state, action) => {
            console.log('--- get drivers rejected...')
            state.isLoading = false
            state.isError = true;
            state.drivers = []

            state.errorMessage = 'Unable to retrieve drivers';
            // TODO: handle error messages
        })

        builder.addCase(addDrivers.pending, (state, action) => {
            console.log("--- add driver pending...");
            state.isError = false;
            state.isLoading = true;
        });

        builder.addCase(addDrivers.fulfilled, (state, action) => {
            console.log("--- add driver fulfilled...");
            state.isError = false;
            state.isLoading = false;
            state.drivers.push(action.payload);
        });

        builder.addCase(addDrivers.rejected, (state, action) => {
            console.log("--- add driver rejected...");
            state.isError = true;
            state.isLoading = false;
        });

        builder.addCase(editDrivers.pending, (state, action) => {
            console.log("--- edit driver pending...");
            state.isError = false;
            state.isLoading = true;
        });

        builder.addCase(editDrivers.fulfilled, (state, action) => {
            console.log("--- edit driver fulfilled...");
            state.isError = false;
            state.isLoading = false;
            state.drivers.push(action.payload);
        });

        builder.addCase(editDrivers.rejected, (state, action) => {
            console.log("--- edit driver rejected...");
            state.isError = true;
            state.isLoading = false;
        });

        builder.addCase(deleteDrivers.pending, (state, action) => {
            console.log("--- delete driver pending...");
            state.isError = false;
            state.isLoading = true;
        });

        builder.addCase(deleteDrivers.fulfilled, (state, action) => {
            console.log("--- delete driver fulfilled...");
            state.isError = false;
            state.isLoading = false;
            state.drivers.push(action.payload);
        });

        builder.addCase(deleteDrivers.rejected, (state, action) => {
            console.log("--- delete driver rejected...");
            state.isError = true;
            state.isLoading = false;
        });
    },
})

export const { clearMessages } = driversSlice.actions

export default driversSlice.reducer