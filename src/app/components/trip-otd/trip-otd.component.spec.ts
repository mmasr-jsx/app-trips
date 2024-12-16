import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripOtdComponent } from './trip-otd.component';
import { TripRatingComponent } from '../trip-rating/trip-rating.component';
import { MockTrip, Trip } from '../../models/trip.model';
import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { removeWhiteSpace } from '../../utils/utils';

@Component({
  template: `<app-trip-otd [trip]="trip" /> `,
})
class TestHostComponent {
  trip = new MockTrip();
}

describe('TripOtdComponent with Host Component', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  const mockTrip = new MockTrip();

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [TripOtdComponent, TripRatingComponent, NgOptimizedImage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { params: { id: mockTrip.id } } },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the trip title', () => {
    const titleElement: HTMLElement =
      fixture.nativeElement.querySelector('p.text-white');
    expect(removeWhiteSpace(titleElement.textContent || '')).toBe(
      removeWhiteSpace(mockTrip.title)
    );
  });

  it('should display the trip image', () => {
    const imgElement: HTMLImageElement =
      fixture.nativeElement.querySelector('img');
    expect(imgElement.src).toContain(mockTrip.imageUrl);
  });

  it('should display the trip tags correctly', () => {
    const tagsElement: HTMLElement =
      fixture.nativeElement.querySelector('p.text-gray-300');
    expect(removeWhiteSpace(tagsElement.textContent || '')).toContain(
      '#station#airport#city#culture'
    );
  });
});
