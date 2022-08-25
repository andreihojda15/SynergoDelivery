import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import PackagesService from '../services/packages.service'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()

// First, create the thunk
export const getPackages = createAsyncThunk(
  'getPackages',
  async (_, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await PackagesService.getPackages()
      console.log(`--- successful response: ${JSON.stringify(response)}`)
      return fulfillWithValue(response)
    } catch(err) {
      console.log(`--- error response: ${JSON.stringify(err)}`)
      return rejectWithValue(err)
    }
  }
)

// Then, handle actions in your reducers:
const packagesSlice = createSlice({
  name: 'packages',
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
      console.log('--- get packages pending...')
      state.isLoading = true
      state.packages = []
    })
    
    builder.addCase(getPackages.fulfilled, (state, action) => {
      console.log('--- get packages fulfilled...')
      
      state.isLoading = false
      state.packages = action.payload || []
    })

    builder.addCase(getPackages.rejected, (state, action) => {
      console.log('--- get packages rejected...')
      state.isLoading = false
      state.packages = []
<<<<<<< HEAD

    })  
   
    //   toast.success('Success notification!',
    //      {position: toast.POSITION.TOP_RIGHT,
    //       autoClose: 5000
    //     })
    //   toast.failure('Failure notification!',
    //      {position: toast.POSITION.TOP_CENTER,
    //       autoClose: false
    //     })
   
=======
      // TODO: handle error messages from action.payload
    })
>>>>>>> main
  },
})

export default packagesSlice.reducer
