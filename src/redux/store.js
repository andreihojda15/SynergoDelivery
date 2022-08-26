import { configureStore } from '@reduxjs/toolkit'
import packagesReducer from './packages.slice'
import driversReducer from './drivers.slice'

export default configureStore({
  reducer: {
    packages: packagesReducer,
    drivers: driversReducer,
  },
})
