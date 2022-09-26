import { createAsyncThunk } from "@reduxjs/toolkit";
import CarsService from "../services/cars.service";
import DriversService from "../services/drivers.service";

export const addPackageToCar = createAsyncThunk(
  "addPackageToCar",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await CarsService.addToCar(data);
      console.log(`Added successfuly`);
      return fulfillWithValue(res);
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);

export const removeFromCar = createAsyncThunk(
  "removeFromCar",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const response = await CarsService.removeFromCar(data);
      console.log(`--- successful response: ${JSON.stringify(response)}`);
      return fulfillWithValue(response);
    } catch (err) {
      console.log(`--- error response: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);

export const addCarToDriver = createAsyncThunk(
  "addCarToDriver",
  async (data, { rejectWithValue, fulfillWithValue }) => {
    try {
      const res = await DriversService.addCarToDriver(data);
      console.log(`Added successfuly`);
      return fulfillWithValue(res);
    } catch (err) {
      console.log(`Error: ${JSON.stringify(err)}`);
      return rejectWithValue(err);
    }
  }
);
