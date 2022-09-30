import { createAsyncThunk } from "@reduxjs/toolkit";
import CarsService from "../services/cars.service";

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
