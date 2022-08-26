import { configureStore } from '@reduxjs/toolkit'
import packagesReducer from './packages.slice'
import driversReducer from './drivers.slice'

import carsReducer from './cars.slice'


export default configureStore({
  reducer: {
    packages: packagesReducer,
    cars: carsReducer,
    drivers: driversReducer,
  },
})
