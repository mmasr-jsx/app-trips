import { TestBed } from '@angular/core/testing';
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TripService } from './trip.service';
import {
  TripResponse,
  TripPayload,
  Trip,
  MockTrip,
} from '../models/trip.model';
import { provideHttpClient } from '@angular/common/http';

describe('TripService', () => {
  let service: TripService;
  let httpMock: HttpTestingController;

  const mockTripResponse: TripResponse = {
    items: [new MockTrip()],
    total: 1,
    page: 1,
    limit: 10,
  };

  const mockTripPayload: TripPayload = {
    query: 'https://test.com',
    items: [new MockTrip()],
    total: 1,
    options: {},
  };

  const mockTrip: Trip = new MockTrip();

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TripService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(TripService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should GET all trips', () => {
    const query = 'https://test.com';
    service.getAllTrips(query).subscribe((payload) => {
      expect(payload).toEqual(mockTripPayload);
    });

    const req = httpMock.expectOne(query);
    expect(req.request.method).toBe('GET');

    req.flush(mockTripResponse);
  });

  it('should GET a trip by ID', () => {
    const tripId = '1';
    service.getTripById(tripId).subscribe((trip) => {
      expect(trip).toEqual(mockTrip);
    });

    const req = httpMock.expectOne(`${service['baseUrl']}/${tripId}`);
    expect(req.request.method).toBe('GET');

    req.flush(mockTrip);
  });

  it('should GET the trip of the day', () => {
    service.getTripOtd().subscribe((trip) => {
      expect(trip).toEqual(mockTrip);
    });

    const req = httpMock.expectOne(
      `${service['baseUrl']}/random/trip-of-the-day`
    );
    expect(req.request.method).toBe('GET');

    req.flush(mockTrip);
  });
});
