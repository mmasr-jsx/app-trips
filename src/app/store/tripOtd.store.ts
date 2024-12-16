import { inject, InjectionToken } from '@angular/core';
import { Trip } from '../models/trip.model';
import { patchState, signalStore, withHooks, withState } from '@ngrx/signals';
import { TripService } from '../services/trip.service';
import { lastValueFrom } from 'rxjs';

type StoreState = {
  tripOtd: Trip;
};

const initialState = {
  tripOtd: <Trip>{},
};

const STORE_STATE = new InjectionToken<StoreState>('TripOtdStore', {
  factory: () => initialState,
});

export const TripOtdStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(STORE_STATE)),
  withHooks({
    async onInit(store, tripService = inject(TripService)) {
      if (hasFetchedToday()) {
        const tripOtd = JSON.parse(localStorage.getItem('tripOtd') || '');
        patchState(store, { tripOtd });
        return;
      }
      const tripOtd = await lastValueFrom(tripService.getTripOtd());
      patchState(store, { tripOtd });
      updateLastFetched(tripOtd);
    },
  })
);

function hasFetchedToday(): boolean {
  const lastFetched = localStorage.getItem('lastDate');
  if (!lastFetched) {
    return false;
  }

  const lastDate = new Date(lastFetched);
  const today = new Date();

  return lastDate.toDateString() === today.toDateString() &&
    localStorage.getItem('tripOtd')
    ? true
    : false;
}

function updateLastFetched(trip: Trip): void {
  localStorage.setItem('lastDate', new Date().toISOString());
  localStorage.setItem('tripOtd', JSON.stringify(trip));
}
