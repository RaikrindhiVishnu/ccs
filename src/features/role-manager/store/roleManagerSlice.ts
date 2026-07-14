import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GeoMasterData } from "../types/masterDataTypes";

interface RoleManagerState extends GeoMasterData {
  regions: any[];
  createdArea: any | null;
  profileData: any | null;
  isLoading: boolean;
  error: string | null;
  selectedStateId: string;
  selectedRegionId: string;
  selectedAreaId: string;
  agentApprovalsFilterType: "today" | "month" | "custom";
  agentApprovalsDateRange: { from: string | null; to: string | null } | null;
}

const loadPersistedState = (key: string, defaultValue: any) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const initialState: RoleManagerState = {
  countries: [],
  states: [],
  districts: [],
  mandals: [],
  regions: [],
  isLoading: false,
  error: null,
  createdArea: null,
  profileData: null,
  selectedStateId: "",
  selectedRegionId: "",
  selectedAreaId: "",
  agentApprovalsFilterType: loadPersistedState("agentApprovalsFilterType", "today"),
  agentApprovalsDateRange: loadPersistedState("agentApprovalsDateRange", null),
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
    setRegions: (state, action: PayloadAction<any[]>) => {
      state.regions = action.payload;
    },
    setCreatedArea: (state, action: PayloadAction<any>) => {
      state.createdArea = action.payload;
    },
    setProfileData: (state, action: PayloadAction<any>) => {
      state.profileData = action.payload;
    },
    setSelectedStateId: (state, action: PayloadAction<string>) => {
      state.selectedStateId = action.payload;
    },
    setSelectedRegionId: (state, action: PayloadAction<string>) => {
      state.selectedRegionId = action.payload;
    },
    setSelectedAreaId: (state, action: PayloadAction<string>) => {
      state.selectedAreaId = action.payload;
    },
    setAgentApprovalsFilterType: (state, action: PayloadAction<"today" | "month" | "custom">) => {
      state.agentApprovalsFilterType = action.payload;
      localStorage.setItem("agentApprovalsFilterType", JSON.stringify(action.payload));
    },
    setAgentApprovalsDateRange: (state, action: PayloadAction<{ from: string | null; to: string | null } | null>) => {
      state.agentApprovalsDateRange = action.payload;
      localStorage.setItem("agentApprovalsDateRange", JSON.stringify(action.payload));
    },
  },
});

export const {
  setGeoMasterData,
  setLoading,
  setError,
  setRegions,
  setCreatedArea,
  setProfileData,
  setSelectedStateId,
  setSelectedRegionId,
  setSelectedAreaId,
  setAgentApprovalsFilterType,
  setAgentApprovalsDateRange,
} = roleManagerSlice.actions;
export default roleManagerSlice.reducer;
