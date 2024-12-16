import { Routes } from '@angular/router';
import { TripDetailsComponent } from './page/trip-details/trip-details.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '*',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./page/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'details/:id',
    component: TripDetailsComponent,
  },
];
