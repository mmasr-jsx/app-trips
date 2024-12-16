export enum SortBy {
  'TITLE' = 'title',
  'PRICE' = 'price',
  'RATING' = 'rating',
  'CREATIONDATE' = 'creationDate',
}

export enum SortOrder {
  'ASC' = 'ASC',
  'DESC' = 'DESC',
}

export interface SelectOption {
  value: string;
  label: string;
}

export interface QueryOptions {
  by?: string;
  order?: string;
  title?: string;
  page?: number;
  limit?: number;
}

export interface Trip {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  nrOfRatings: number;
  verticalType: 'flight';
  tags: string[];
  co2: number;
  thumbnailUrl: string;
  imageUrl: string;
  creationDate: string /* '2024-01-01T00:00:00Z'; */;
}

export class MockTrip {
  id: string;
  title: string;
  description: string;
  price: number;
  rating: number;
  nrOfRatings: number;
  verticalType: 'flight';
  tags: string[];
  co2: number;
  thumbnailUrl: string;
  imageUrl: string;
  creationDate: string;

  constructor() {
    this.id = '1';
    this.title = 'Mock Trip';
    this.description = 'Mock Description';
    this.price = 1000;
    this.rating = 4.5;
    this.nrOfRatings = 120;
    this.verticalType = 'flight';
    this.tags = ['station', 'airport', 'city', 'culture'];
    this.co2 = 5.9;
    this.thumbnailUrl = 'https://test.com';
    this.imageUrl = 'https://test.com';
    this.creationDate = '2024-01-01T00:00:00Z';
  }
}

export interface TripResponse {
  items: Trip[];
  total: number;
  page: number;
  limit: number;
}

export interface TripPayload {
  items: Trip[];
  query: string;
  options: QueryOptions;
  total: number;
}
