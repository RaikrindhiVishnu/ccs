export interface Country {
  id: number;
  code: string;
  desc: string;
}

export interface State {
  id: number;
  country_id: number;
  code: string;
  desc: string;
}

export interface District {
  id: number;
  state_id: number;
  code: string;
  desc: string;
}

export interface Mandal {
  id: number;
  districts_id: number;
  code: string;
  desc: string;
}

export interface GeoMasterDataRaw {
  countrys: any[][];
  states: any[][];
  districts: any[][];
  mandals: any[][];
}

export interface GeoMasterData {
  countries: Country[];
  states: State[];
  districts: District[];
  mandals: Mandal[];
}
