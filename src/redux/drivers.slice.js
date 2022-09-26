import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DriversService from '../services/drivers.service'
import { addCarToDriver } from './common.thunks'

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

export const addDriver = createAsyncThunk(
	"addDriver",
	async (driver, { rejectWithValue, fulfillWithValue }) => {
		try {
			const res = await DriversService.addDriver(driver);
			console.log(`Added successfuly`);
			return fulfillWithValue(res);
		} catch (err) {
			console.log(`Error: ${JSON.stringify(err)}`);
			return rejectWithValue(err);
		}
	}
);

export const editDriver = createAsyncThunk(
	"editDriver",
	async (driver, { rejectWithValue, fulfillWithValue }) => {
		try {
			const res = await DriversService.editDriver(driver);
			console.log(`Edited successfuly`);
			return fulfillWithValue(res);
		} catch (err) {
			console.log(`Error: ${JSON.stringify(err)}`);
			return rejectWithValue(err);
		}
	}
);

export const deleteDriver = createAsyncThunk(
	"deleteDriver",
	async (driver, { rejectWithValue, fulfillWithValue }) => {
		try {
			const res = await DriversService.deleteDriver(driver);
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
		isEditingDriver: false,
		isLoadingDriverToCar: false,
		isDeletingDriver: false,
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
			state.drivers = action.payload || []
			state.successMessage = action.payload.length === 0 ? 'No drivers found.' : 'Successfully retrieved drivers.';
		})

		builder.addCase(getDrivers.rejected, (state, action) => {
			console.log('--- get drivers rejected...')
			state.isLoading = false
			state.drivers = []
			state.errorMessage = 'Unable to retrieve drivers';
		})

		builder.addCase(addDriver.pending, (state, action) => {
			console.log("--- add driver pending...");
			state.isLoading = true;
		});

		builder.addCase(addDriver.fulfilled, (state, action) => {
			console.log("--- add driver fulfilled...");
			state.isLoading = false;
			state.drivers.push(action.payload);
			state.successMessage = `Successfully added driver`;
		});

		builder.addCase(addDriver.rejected, (state, action) => {
			console.log("--- add driver rejected...");
			state.isLoading = false;
		});

		builder.addCase(editDriver.pending, (state, action) => {
			console.log("--- edit driver pending...");
			state.isEditingDriver = true;
			state.errorMessage = '';
			state.successMessage = '';
		});

		builder.addCase(editDriver.fulfilled, (state, action) => {
			console.log("--- edit driver fulfilled...");
			state.isEditingDriver = false;
			let indexOfUpdatedDriver = state.drivers.findIndex((driver) => driver.guid === action.payload.guid);
			if (indexOfUpdatedDriver !== -1) {
				state.drivers.splice(indexOfUpdatedDriver, 1, action.payload);
				state.successMessage = `Successfully updated driver`;
			}
		});

		builder.addCase(editDriver.rejected, (state, action) => {
			console.log("--- edit driver rejected...");
			state.isEditingDriver = false;
			state.errorMessage = 'Unable to edit driver.';
		});

		builder.addCase(deleteDriver.pending, (state, action) => {
			console.log("--- delete driver pending...");
			state.isDeletingDriver = true;
			state.errorMessage = '';
			state.successMessage = '';
		});

		builder.addCase(deleteDriver.fulfilled, (state, action) => {
			console.log("--- delete driver fulfilled...");
			state.isDeletingDriver = false;
			let indexOfDeletedDriver = state.drivers.findIndex((driver) => driver.guid === action.payload.guid);
			if (indexOfDeletedDriver !== -1) {
				state.drivers.splice(indexOfDeletedDriver, 1);
				state.successMessage = `Successfully deleted driver`;
			}
		});

		builder.addCase(deleteDriver.rejected, (state, action) => {
			console.log("--- delete driver rejected...");
			state.isDeletingDriver = false;
			state.errorMessage = 'Unable to delete driver.';
		});

		builder.addCase(addCarToDriver.pending, (state, action) => {
			console.log("--- add driver to car pending...");
			state.isLoadingDriverToCar = true;
			state.errorMessage = "";
			state.successMessage = "";
		});

		builder.addCase(addCarToDriver.fulfilled, (state, action) => {
			console.log("--- add car to driver fulfilled...");
			state.isLoadingDriverToCar = false;
			let indexOfUpdatedDriver = state.drivers.findIndex(
				(driver) => driver.guid === action.payload.driver.guid
			);
			if (indexOfUpdatedDriver !== -1) {
				state.drivers.splice(indexOfUpdatedDriver, 1, action.payload.driver);
				state.successMessage = `Successfully added car to driver ${action.payload.driver.name}.`;
			}
		});

		builder.addCase(addCarToDriver.rejected, (state, action) => {
			console.log("--- add car to driver rejected...");
			state.isLoadingDriverToCar = false;
			state.errorMessage = "Unable to add car to driver.";
		});
	},
})

export const { clearMessages } = driversSlice.actions

export default driversSlice.reducer