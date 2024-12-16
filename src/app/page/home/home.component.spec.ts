import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { TripStore } from '../../store/trip.store';
import { of } from 'rxjs';
import { TripCardComponent } from '../../components/trip-card/trip-card.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { SortingComponent } from '../../components/sorting/sorting.component';
import { MockTrip } from '../../models/trip.model';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let tripStoreMock: any;
  const secondMockTrip = new MockTrip();
  secondMockTrip.id = '2';

  beforeEach(async () => {
    tripStoreMock = {
      filterTrips: jasmine.createSpy('filterTrips'),
      getCurrentSortOption: jasmine.createSpy('getCurrentSortOption'),
      movePage: jasmine.createSpy('movePage'),
      curItems: () => of([new MockTrip(), secondMockTrip]),
      curPage: () => 3,
      total: () => 12,
    };

    await TestBed.configureTestingModule({
      imports: [
        TripCardComponent,
        PaginationComponent,
        SortingComponent,
        HomeComponent,
      ],
      providers: [{ provide: TripStore, useValue: tripStoreMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should compute totalPages', () => {
    const totalPages = component.totalPages();
    expect(totalPages).toBe(1);
  });

  it('should compute currentPage', () => {
    const currentPage = component.currentPage();
    expect(currentPage).toBe(3);
  });

  it('should render the SortingComponent', () => {
    const sortingComponent = fixture.nativeElement.querySelector('app-sorting');
    expect(sortingComponent).toBeTruthy();
  });

  it('should call movePage on TripStore when movePage', async () => {
    await component.movePage(2);
    expect(tripStoreMock.movePage).toHaveBeenCalledOnceWith(2);
  });
});
