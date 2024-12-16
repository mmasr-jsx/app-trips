import { Component, input } from '@angular/core';
import { Trip } from '../../models/trip.model';

@Component({
  selector: 'app-trip-rating',
  standalone: true,
  imports: [],
  templateUrl: './trip-rating.component.html',
  styleUrl: './trip-rating.component.css',
})
export class TripRatingComponent {
  trip = input.required<Trip>();

  getRating(): string {
    const trip = this.trip();
    if (trip.id) {
      let finalRating: number =
        trip.rating -
        this.getCo2Subtract(trip.co2) +
        this.getRatingsNumberAdd(trip.nrOfRatings);
      let score: string =
        finalRating <= 2 ? 'Average' : finalRating < 4 ? 'Good' : 'Awesome';

      return score;
    }

    return '';
  }

  getCo2Subtract(co2: number): number {
    let score: number = co2 < 300 ? 0 : co2 < 500 ? 0.5 : 1;

    return score;
  }

  getRatingsNumberAdd(nrOfRatings: number): number {
    let score: number = nrOfRatings < 100 ? 0 : nrOfRatings < 500 ? 0.5 : 1;

    return score;
  }
}
