import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { TripStore } from '../../store/trip.store';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let mockMovePage: jasmine.Spy;

  beforeEach(() => {
    mockMovePage = jasmine.createSpy('movePage');

    TestBed.configureTestingModule({
      imports: [PaginationComponent],
      providers: [{ provide: TripStore, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;

    component.currentPage = 1;
    component.totalPages = 3;
    component.movePage = mockMovePage;

    fixture.detectChanges();
  });

  it('should create PaginationComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should disable the "Previous" button when on the first page', () => {
    component.currentPage = 1;
    fixture.detectChanges();
    const previousButton =
      fixture.nativeElement.querySelector('button:first-child');
    expect(previousButton.disabled).toBeTrue();
  });

  it('should enable the "Previous" button when not on the first page', () => {
    component.currentPage = 2;
    fixture.detectChanges();
    const previousButton =
      fixture.nativeElement.querySelector('button:first-child');
    expect(previousButton.disabled).toBeFalse();
  });

  it('should disable the "Next" button when we are on the last page', () => {
    component.currentPage = 3;
    component.totalPages = 3;
    fixture.detectChanges();
    const nextButton = fixture.nativeElement.querySelector('button:last-child');

    expect(nextButton.disabled).toBeTrue();
  });

  it('should enable the "Next" button when we are not on the last page', () => {
    component.currentPage = 2;
    component.totalPages = 3;
    fixture.detectChanges();
    const nextButton = fixture.nativeElement.querySelector('button:last-child');
    expect(nextButton.disabled).toBeFalse();
  });

  it('should call movePage with correct page number when we click "Previous"', () => {
    component.currentPage = 2;
    fixture.detectChanges();

    const previousButton =
      fixture.nativeElement.querySelector('button:first-child');
    previousButton.click();

    expect(mockMovePage).toHaveBeenCalledWith(1);
  });

  it('should call movePage with correct page number when we click "Next"', () => {
    component.currentPage = 2;
    fixture.detectChanges();

    const nextButton = fixture.nativeElement.querySelector('button:last-child');
    nextButton.click();

    expect(mockMovePage).toHaveBeenCalledWith(3);
  });

  it('should display the correct current page and total pages', fakeAsync(() => {
    component.currentPage = 2;
    component.totalPages = 5;
    let pageText = fixture.nativeElement.querySelector('button.cursor-default');

    fixture.detectChanges();
    tick();

    pageText = fixture.nativeElement.querySelector('button.cursor-default');

    expect(pageText.textContent).toContain('page 2 of 5');
  }));
});
