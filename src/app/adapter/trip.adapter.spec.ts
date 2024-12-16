import { TripAdapter, SelectOptionsAdapter } from './trip.adapter';
import {
  TripResponse,
  TripPayload,
  SelectOption,
  QueryOptions,
  MockTrip,
} from '../models/trip.model';

describe('TripAdapter', () => {
  it('should adapt the TripResponse to TripPayload correctly', () => {
    const mockTripResponse: TripResponse = {
      items: [new MockTrip()],
      total: 1,
      page: 1,
      limit: 12,
    };

    const query = 'https://example.com';
    const total = 1;
    const options: QueryOptions = { by: 'price', order: 'ASC' };

    const result: TripPayload = TripAdapter(
      mockTripResponse,
      query,
      total,
      options
    );

    expect(result).toBeTruthy();
    expect(result.query).toBe(query);
    expect(result.items.length).toBe(1);
    expect(result.total).toBe(total);
    expect(result.options).toEqual(options);
    expect(result.items[0].title).toBe('Mock Trip');
  });
});

describe('SelectOptionsAdapter', () => {
  it('should adapt mock to SelectOption correctly', () => {
    const mockOptions: Record<string, string> = {
      TITLE: 'title',
      PRICE: 'price',
      RATING: 'rating',
    };

    const result: SelectOption[] = SelectOptionsAdapter(mockOptions);

    expect(result.length).toBe(3);
    expect(result[0].label).toBe('TITLE');
    expect(result[0].value).toBe('title');
    expect(result[1].label).toBe('PRICE');
    expect(result[1].value).toBe('price');
    expect(result[2].label).toBe('RATING');
    expect(result[2].value).toBe('rating');
  });
});
