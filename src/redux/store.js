import { configureStore } from '@reduxjs/toolkit'
import packagesReducer from './packages.slice'

import carsReducer from './cars.slice'


export default configureStore({
  reducer: {
    packages: packagesReducer,
    cars: carsReducer,

  },
})
