import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TripStore } from '../../store/trip.store';
import { Trip } from '../../models/trip.model';
import { NgOptimizedImage } from '@angular/common';
import { Subscription } from 'rxjs';
import { TripRatingComponent } from '../../components/trip-rating/trip-rating.component';

@Component({
  selector: 'app-trip-details',
  standalone: true,
  imports: [NgOptimizedImage, TripRatingComponent],
  templateUrl: './trip-details.component.html',
  styleUrl: './trip-details.component.css',
})
export class TripDetailsComponent {
  constructor(private route: ActivatedRoute) {}
  readonly store = inject(TripStore);
  id!: string;
  trip: Trip | undefined;
  private routeSub!: Subscription;

  async ngOnInit(): Promise<void> {
    this.routeSub = this.route.paramMap.subscribe(async (params) => {
      this.id = params.get('id') || '';
      this.trip = await this.store.getTrip(this.id);
    });
  }

  ngOnDestroy(): void {
    if (this.routeSub) {
      this.routeSub.unsubscribe();
    }
  }
}
