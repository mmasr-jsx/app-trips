import { Component, input } from '@angular/core';
import { Trip } from '../../models/trip.model';
import { NgOptimizedImage } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TripRatingComponent } from '../trip-rating/trip-rating.component';

@Component({
  selector: 'app-trip-otd',
  standalone: true,
  imports: [NgOptimizedImage, RouterModule, TripRatingComponent],
  templateUrl: './trip-otd.component.html',
  styleUrl: './trip-otd.component.css',
})
export class TripOtdComponent {
  trip = input.required<Trip>();
}
