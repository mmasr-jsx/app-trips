import {
  QueryOptions,
  SelectOption,
  TripPayload,
  TripResponse,
} from '../models/trip.model';

export const TripAdapter = (
  tripResponse: TripResponse,
  query: string,
  total: number,
  options?: QueryOptions
): TripPayload => {
  return {
    query: query,
    items: [...tripResponse.items],
    total: total,
    options: options || {},
  };
};

export const SelectOptionsAdapter = (
  obj: Record<string, string>
): SelectOption[] => {
  return Object.entries(obj).map(([key, value]) => ({
    value: value,
    label: key,
  }));
};
