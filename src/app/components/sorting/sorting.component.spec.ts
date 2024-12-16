import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SortingComponent } from './sorting.component';
import { TripStore } from '../../store/trip.store';
import { of } from 'rxjs';
import { SelectComponent } from '../select/select.component';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SelectOptionsAdapter } from '../../adapter/trip.adapter';
import { SortBy, SortOrder, SelectOption } from '../../models/trip.model';

describe('SortingComponent', () => {
  let component: SortingComponent;
  let fixture: ComponentFixture<SortingComponent>;
  let tripStoreMock: any;

  beforeEach(() => {
    tripStoreMock = {
      filterTrips: jasmine.createSpy('filterTrips'),
      getCurrentSortOption: jasmine.createSpy('getCurrentSortOption'),
    };

    TestBed.configureTestingModule({
      imports: [SortingComponent, SearchBarComponent, SelectComponent],
      providers: [{ provide: TripStore, useValue: tripStoreMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SortingComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with sort options', () => {
    const mockSortBy: SelectOption[] = SelectOptionsAdapter(SortBy);
    const mockSortOrder: SelectOption[] = SelectOptionsAdapter(SortOrder);

    expect(component.sortBy).toEqual(mockSortBy);
    expect(component.sortOrder).toEqual(mockSortOrder);
  });

  it('should call filterTrips onNameChange', () => {
    const event = { target: { value: 'test trip' } } as unknown as Event;
    spyOn(component, 'filterTrips');

    component.onNameChange(event);

    expect(component.filterTrips).toHaveBeenCalled();
    expect(component.filterOptions.title).toBe('test trip');
  });

  it('should call filterTrips onSortByChange', () => {
    const event = { target: { value: 'test' } } as unknown as Event;
    spyOn(component, 'filterTrips');

    component.onSortByChange(event);

    expect(component.filterTrips).toHaveBeenCalled();
    expect(component.filterOptions.by).toBe('test');
  });

  it('should call filterTrips onSortOrderChange', () => {
    const event = { target: { value: 'test' } } as unknown as Event;
    spyOn(component, 'filterTrips');

    component.onSortOrderChange(event);

    expect(component.filterTrips).toHaveBeenCalled();
    expect(component.filterOptions.order).toBe('test');
  });

  it('should call filterTrips and filterOptions should been {} after resetFilterOptions', () => {
    spyOn(component, 'filterTrips');

    component.resetFilterOptions();

    expect(component.filterTrips).toHaveBeenCalled();
    expect(component.filterOptions).toEqual({});
  });

  it('should get selectedSortByOption from store', () => {
    tripStoreMock.getCurrentSortOption.and.returnValue('test');
    fixture.detectChanges();

    expect(component.selectedSortByOption()).toBe('test');
  });

  it('should get selectedSortOrderOption from store', () => {
    tripStoreMock.getCurrentSortOption.and.returnValue('test');
    fixture.detectChanges();

    expect(component.selectedSortOrderOption()).toBe('test');
  });
});
