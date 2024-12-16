import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaginationComponent } from './pagination.component';
import { TripStore } from '../../store/trip.store';
import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

@Component({
  template: `<app-pagination
    [currentPage]="currentPage"
    [totalPages]="totalPages"
    [movePage]="movePage"
  >
  </app-pagination>`,
})
class TestHostComponent {
  currentPage = 1;
  totalPages = 1;
  movePage = () => {};
}

describe('PaginationComponent with Host Component', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let mockMovePage: jasmine.Spy;

  beforeEach(() => {
    mockMovePage = jasmine.createSpy('movePage');

    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [PaginationComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TripStore, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    component.movePage = mockMovePage;
    fixture.detectChanges();
  });

  it('should display the correct page numbers', () => {
    component.currentPage = 2;
    component.totalPages = 5;

    fixture.detectChanges();

    const pageText = fixture.nativeElement.querySelector(
      'button.cursor-default'
    );
    expect(pageText.textContent).toContain('page 2 of 5');
  });

  it('should disable Previous button at the first page', () => {
    component.currentPage = 1;
    fixture.detectChanges();
    const previousButton =
      fixture.nativeElement.querySelector('button:first-child');
    expect(previousButton.disabled).toBeTrue();
  });

  it('should enable Previous button on other pages', () => {
    component.currentPage = 2;
    fixture.detectChanges();
    const previousButton =
      fixture.nativeElement.querySelector('button:first-child');
    expect(previousButton.disabled).toBeFalse();
  });

  it('should disable Next button at the last page', () => {
    component.currentPage = 3;
    component.totalPages = 3;
    fixture.detectChanges();
    const nextButton = fixture.nativeElement.querySelector('button:last-child');

    expect(nextButton.disabled).toBeTrue();
  });

  it('should enable Next button on other pages', () => {
    component.currentPage = 2;
    component.totalPages = 3;
    fixture.detectChanges();
    const nextButton = fixture.nativeElement.querySelector('button:last-child');
    expect(nextButton.disabled).toBeFalse();
  });

  it('should call movePage with correct page', () => {
    component.currentPage = 2;
    fixture.detectChanges();

    const previousButton =
      fixture.nativeElement.querySelector('button:first-child');
    previousButton.click();

    expect(mockMovePage).toHaveBeenCalledWith(1);
    component.currentPage = 4;
    fixture.detectChanges();

    const nextButton = fixture.nativeElement.querySelector('button:last-child');
    nextButton.click();

    expect(mockMovePage).toHaveBeenCalledWith(5);
  });
});
