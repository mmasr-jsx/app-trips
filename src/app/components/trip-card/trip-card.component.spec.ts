import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripCardComponent } from './trip-card.component';
import { TripStore } from '../../store/trip.store';
import { MockTrip, Trip } from '../../models/trip.model';
import { Component } from '@angular/core';
import { removeWhiteSpace } from '../../utils/utils';

@Component({
  template: ` <app-trip-card [trip]="trip" /> `,
})
class TestHostComponent {
  trip = new MockTrip();
}

describe('TripCardComponent with Host Component', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let tripStoreMock: any;

  const mockTrip: Trip = new MockTrip();

  beforeEach(() => {
    tripStoreMock = jasmine.createSpyObj('TripStore', ['']);

    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [TripCardComponent],
      providers: [
        {
          provide: TripStore,
          useValue: tripStoreMock,
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

  it('should render title', () => {
    const titleElement: HTMLElement =
      fixture.nativeElement.querySelector('p.text-white');
    expect(removeWhiteSpace(titleElement.textContent || '')).toBe(
      removeWhiteSpace(mockTrip.title)
    );
  });

  it('should render image', () => {
    const imageElement: HTMLImageElement =
      fixture.nativeElement.querySelector('img');
    expect(imageElement.src).toContain(mockTrip.imageUrl);
  });

  it('should render tags', () => {
    const tagsElement: HTMLElement =
      fixture.nativeElement.querySelector('p.text-gray-300');
    expect(removeWhiteSpace(tagsElement.textContent || '')).toContain(
      '#station#airport#city#culture'
    );
  });

  it('should display TripRatingComponent', () => {
    const ratingComponent =
      fixture.nativeElement.querySelector('app-trip-rating');
    expect(ratingComponent).toBeTruthy();
  });
});
