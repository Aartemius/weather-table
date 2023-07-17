export interface City {
  name: string;
  lat: number;
  lng: number;
  minTemperature: number;
  maxTemperature: number;
  windDirection: number;
  country: string;
}

export interface Country {
  name: string;
  iso2: string;
  iso3: string;
  cities: City[];
}