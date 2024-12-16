import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripRatingComponent } from './trip-rating.component';
import { MockTrip, Trip } from '../../models/trip.model';
import { Component } from '@angular/core';

@Component({
  template: `<app-trip-rating [trip]="trip" />`,
})
class TestHostComponent {
  trip = new MockTrip();
}

describe('RatingComponent with Host Component', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let tripRatingComponent: TripRatingComponent;

  const mockTrip: Trip = new MockTrip();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [TripRatingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    tripRatingComponent = fixture.debugElement.children[0].componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should return "Good" when finalRating is between 2 and 4', () => {
    const tripWithHighRating = { ...mockTrip, rating: 2, nrOfRatings: 600 };
    component.trip = tripWithHighRating;
    fixture.detectChanges();
    const rating = tripRatingComponent.getRating();
    expect(rating).toBe('Good');
  });

  it('should return "Awesome" when finalRating is greater than 4', () => {
    const tripWithHighRating = { ...mockTrip, rating: 5, nrOfRatings: 1600 };
    component.trip = tripWithHighRating;
    fixture.detectChanges();

    const rating = tripRatingComponent.getRating();
    expect(rating).toBe('Awesome');
  });

  it('should return "Average" when finalRating is less or equal to 2', () => {
    const tripWithLowRating = { ...mockTrip, rating: 1, nrOfRatings: 50 };
    component.trip = tripWithLowRating;
    fixture.detectChanges();
    const rating = tripRatingComponent.getRating();
    expect(rating).toBe('Average');
  });
});
