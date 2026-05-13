import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GeoMasterData } from "../types/masterDataTypes";

interface RoleManagerState extends GeoMasterData {
  isLoading: boolean;
  error: string | null;
}

const initialState: RoleManagerState = {
  countries: [],
  states: [],
  districts: [],
  mandals: [],
  isLoading: false,
  error: null,
};

const roleManagerSlice = createSlice({
  name: "roleManager",
  initialState,
  reducers: {
    setGeoMasterData: (state, action: PayloadAction<GeoMasterData>) => {
      state.countries = action.payload.countries;
      state.states = action.payload.states;
      state.districts = action.payload.districts;
      state.mandals = action.payload.mandals;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setGeoMasterData, setLoading, setError } = roleManagerSlice.actions;
export default roleManagerSlice.reducer;
