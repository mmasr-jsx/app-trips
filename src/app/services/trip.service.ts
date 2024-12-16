import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import {
  QueryOptions,
  Trip,
  TripPayload,
  TripResponse,
} from '../models/trip.model';
import { TripAdapter } from '../adapter/trip.adapter';

@Injectable({
  providedIn: 'root',
})
export class TripService {
  private readonly baseUrl =
    'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips';
  http = inject(HttpClient);

  constructor() {}

  getAllTrips(query: string, options?: QueryOptions): Observable<TripPayload> {
    const url = query;
    return this.http.get<TripResponse>(url).pipe(
      map((response) => TripAdapter(response, url, response.total, options)),
      catchError((err) => {
        console.error('Error fetching trips', err);
        return of({} as TripPayload);
      })
    );
  }

  getTripById(id: string): Observable<Trip> {
    const url = this.baseUrl + '/' + id;
    return this.http.get<Trip>(url).pipe(
      catchError((err) => {
        console.error('Error fetching  your trip', err);
        return of({} as Trip);
      })
    );
  }

  getTripOtd(): Observable<Trip> {
    const url = this.baseUrl + '/random/trip-of-the-day';

    return this.http.get<Trip>(url).pipe(
      catchError((err) => {
        console.error('Error fetching  your trip of the day', err);
        return of({} as Trip);
      })
    );
  }
}
