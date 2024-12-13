export interface CityProps {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: {
    lat: number;
    lng: number;
  };
  id: number;
}

export interface Country {
  country: string;
  emoji: string;
}

export interface GeocodingObject {
  city: string;
  locality: string;
  countryName: string;
  countryCode: string;
  latitude: number;
  longitude: number;
}

export interface User {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
