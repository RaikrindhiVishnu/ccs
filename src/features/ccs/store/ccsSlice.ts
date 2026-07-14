import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface CcsState {
  isLoading: boolean;
  error: string | null;
  // Local active filters for farmlands list
  activeFilters: {
    state: string;
    region: string;
    area: string;
    priority: string;
    fromDate: string;
    toDate: string;
  };
}

const initialState: CcsState = {
  isLoading: false,
  error: null,
  activeFilters: {
    state: "",
    region: "",
    area: "",
    priority: "",
    fromDate: "",
    toDate: "",
  },
};

const ccsSlice = createSlice({
  name: "ccs",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setActiveFilters: (state, action: PayloadAction<Partial<CcsState["activeFilters"]>>) => {
      state.activeFilters = { ...state.activeFilters, ...action.payload };
    },
    clearActiveFilters: (state) => {
      state.activeFilters = initialState.activeFilters;
    },
  },
});

export const {
  setLoading,
  setError,
  setActiveFilters,
  clearActiveFilters,
} = ccsSlice.actions;

export default ccsSlice.reducer;
