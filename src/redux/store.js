import { configureStore } from '@reduxjs/toolkit'
import packagesReducer from './packages.slice'

export default configureStore({
  reducer: {
    packages: packagesReducer,
  },
})
