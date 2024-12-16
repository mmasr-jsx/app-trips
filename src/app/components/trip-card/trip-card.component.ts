import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { Trip } from '../../models/trip.model';
import { TripStore } from '../../store/trip.store';
import { TripRatingComponent } from '../trip-rating/trip-rating.component';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [TripRatingComponent],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TripCardComponent {
  trip = input.required<Trip>();

  readonly store = inject(TripStore);
}
