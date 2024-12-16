import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TripDetailsComponent } from './trip-details.component';
import { TripStore } from '../../store/trip.store';
import { MockTrip } from '../../models/trip.model';
import { TripRatingComponent } from '../../components/trip-rating/trip-rating.component';

describe('TripDetailsComponent', () => {
  let component: TripDetailsComponent;
  let fixture: ComponentFixture<TripDetailsComponent>;
  let tripStoreMock: any;
  let activatedRouteMock: any;

  const mockTrip: MockTrip = new MockTrip();

  beforeEach(async () => {
    tripStoreMock = {
      getTrip: jasmine
        .createSpy('getTrip')
        .and.returnValue(Promise.resolve(mockTrip)),
    };

    activatedRouteMock = {
      paramMap: of({
        get: (key: string) => (key === 'id' ? '1' : null),
      }),
    };

    await TestBed.configureTestingModule({
      declarations: [],
      imports: [TripDetailsComponent, TripRatingComponent],
      providers: [
        { provide: TripStore, useValue: tripStoreMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TripDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display trip', async () => {
    await fixture.whenStable();
    fixture.detectChanges();

    const title = fixture.nativeElement.querySelector('h2');

    expect(tripStoreMock.getTrip).toHaveBeenCalledWith('1');
    expect(title.textContent).toContain(mockTrip.title);
  });

  it('should show error message if trip are not available', async () => {
    tripStoreMock.getTrip.and.returnValue(Promise.resolve(undefined));
    component.ngOnInit();
    await fixture.whenStable();
    fixture.detectChanges();

    const errorMessage = fixture.nativeElement.querySelector(
      '.text-gray-700.text-6xl.font-bold'
    );

    expect(errorMessage.textContent).toContain(
      'The trip details you are trying to reach are not available'
    );
  });

  it('should unsubscribe from routeSub on destroy', () => {
    spyOn(component['routeSub'], 'unsubscribe');
    component.ngOnDestroy();
    expect(component['routeSub'].unsubscribe).toHaveBeenCalled();
  });
});
