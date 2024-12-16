import { inject, InjectionToken } from '@angular/core';
import { QueryOptions, Trip, TripPayload } from '../models/trip.model';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { TripService } from '../services/trip.service';
import { lastValueFrom } from 'rxjs';
import { buildQuery, getPagedQuery, getPayload } from '../utils/utils';

const baseUrl =
  'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips';

type StoreState = {
  payloads: TripPayload[];
  curItems: Trip[];
  curQuery: string;
  curPage: number;
  curOptions: QueryOptions;
  total: number;
};

const initialState = {
  payloads: [],
  curItems: [],
  curQuery: '',
  curPage: 1,
  curOptions: {},
  total: 12,
};

const STORE_STATE = new InjectionToken<StoreState>('TripStore', {
  factory: () => initialState,
});

export const TripStore = signalStore(
  { providedIn: 'root' },
  withState(() => inject(STORE_STATE)),
  withMethods((store, tripService = inject(TripService)) => ({
    async getTrip(id: string): Promise<Trip> {
      localStorage.getItem('tripOtd');
      let trip = store
        .payloads()
        .find((load) => load.query === store.curQuery())
        ?.items.find((trip) => trip.id === id);
      if (trip) {
        return trip;
      }
      trip = await lastValueFrom(tripService.getTripById(id));
      return trip;
    },
    async movePage(page: number): Promise<Trip[]> {
      const query = getPagedQuery(store.curQuery(), page);
      const isStored = getPayload(query, store.payloads()) ? true : false;

      const tripsPayload =
        getPayload(query, store.payloads()) ||
        (await lastValueFrom(tripService.getAllTrips(query)));

      if (isStored) {
        patchState(store, {
          curItems: tripsPayload.items,
          curQuery: tripsPayload.query,
          curPage: page,
          total: tripsPayload.total,
          curOptions: tripsPayload.options,
        });
        return tripsPayload.items;
      }
      patchState(store, {
        payloads: [...store.payloads(), tripsPayload],
        curItems: tripsPayload.items,
        curQuery: tripsPayload.query,
        curPage: page,
        total: tripsPayload.total,
        curOptions: tripsPayload.options,
      });
      return tripsPayload.items;
    },
    async filterTrips(options: QueryOptions) {
      const query = buildQuery(baseUrl, options);
      const isStored = getPayload(query, store.payloads()) ? true : false;

      const tripsPayload =
        getPayload(query, store.payloads()) ||
        (await lastValueFrom(tripService.getAllTrips(query, options)));

      if (isStored) {
        patchState(store, {
          curItems: tripsPayload.items,
          curQuery: tripsPayload.query,
          curPage: options.page || 1,
          total: tripsPayload.total,
          curOptions: tripsPayload.options,
        });
        return tripsPayload.items;
      }
      patchState(store, {
        payloads: [...store.payloads(), tripsPayload],
        curItems: tripsPayload.items,
        curQuery: tripsPayload.query,
        curPage: options.page || 1,
        total: tripsPayload.total,
        curOptions: tripsPayload.options,
      });
      return tripsPayload.items;
    },
    getCurrentSortOption(optionKey: string): string {
      if (!store?.curOptions()) {
        return '';
      }

      const option =
        optionKey === 'by'
          ? store.curOptions().by
          : optionKey === 'order'
          ? store.curOptions().order
          : '';

      return option || '';
    },
  })),
  withHooks({
    async onInit(store, tripService = inject(TripService)) {
      const tripsPayload = await lastValueFrom(
        tripService.getAllTrips(buildQuery(baseUrl))
      );

      patchState(store, {
        payloads: [tripsPayload],
        curItems: tripsPayload.items,
        curQuery: tripsPayload.query,
        total: tripsPayload.total,
      });
    },
  })
);
