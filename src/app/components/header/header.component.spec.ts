import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { LogoComponent } from '../logo/logo.component';
import { TripOtdComponent } from '../trip-otd/trip-otd.component';
import { TripOtdStore } from '../../store/tripOtd.store';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MockTrip } from '../../models/trip.model';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let tripOtdStoreMock: any;

  beforeEach(async () => {
    tripOtdStoreMock = {
      tripOtd: jasmine.createSpy('tripOtd').and.returnValue(of(new MockTrip())),
    };

    await TestBed.configureTestingModule({
      imports: [HeaderComponent, LogoComponent, TripOtdComponent],
      providers: [
        { provide: TripOtdStore, useValue: tripOtdStoreMock },
        { provide: ActivatedRoute, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render logo', () => {
    const logo = fixture.nativeElement.querySelector('app-logo');
    expect(logo).toBeTruthy();
  });

  it('should render the tripOtd', () => {
    const tripOtd = fixture.nativeElement.querySelector('app-trip-otd');
    expect(tripOtd).toBeTruthy();
  });

  it('should call store for the tripOtd', () => {
    expect(tripOtdStoreMock.tripOtd).toHaveBeenCalled();
  });
});
