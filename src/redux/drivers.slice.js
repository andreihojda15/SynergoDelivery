import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import DriversService from '../services/drivers.service'

export const getDrivers = createAsyncThunk(
    'getDrivers',
    async (_, { rejectWithValue, fulfillWithValue }) => {
        try {
            const response = await DriversService.getDrivers()
            console.log(`--- successful response: ${JSON.stringify(response)}`)
            return fulfillWithValue(response)
        } catch (err) {
            console.log(`--- error response: ${JSON.stringify(err)}`)
            return rejectWithValue(err)
        }
    }
)

// Then, handle actions in your reducers:
const driversSlice = createSlice({
    name: 'drivers',
    initialState: {
        isLoading: false,
        drivers: [],
    },
    reducers: {
        // standard reducer logic, with auto-generated action types per reducer
    },
    extraReducers: (builder) => {
        // Add reducers for additional action types here, and handle loading state as needed
        builder.addCase(getDrivers.pending, (state, action) => {
            console.log('--- get drivers pending...')
            state.isLoading = true
            state.drivers = []
        })

        builder.addCase(getDrivers.fulfilled, (state, action) => {
            console.log('--- get drivers fulfilled...')
            state.isLoading = false
            state.drivers = action.payload || []
        })

        builder.addCase(getDrivers.rejected, (state, action) => {
            console.log('--- get drivers rejected...')
            state.isLoading = false
            state.drivers = []
            // TODO: handle error messages
        })
    },
})

export default driversSlice.reducer