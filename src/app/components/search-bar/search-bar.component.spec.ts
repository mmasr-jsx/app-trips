import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripStore } from '../../store/trip.store';
import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { SearchBarComponent } from './search-bar.component';

@Component({
  template: `<app-search-bar [placeHolder]="placeHolder" [onChange]="onChange">
  </app-search-bar>`,
})
class TestHostComponent {
  placeHolder = 'Search test...';
  onChange = () => {};
}

describe('SearchComponent with Host Component', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;
  let mockOnChange: jasmine.Spy;

  beforeEach(() => {
    mockOnChange = jasmine.createSpy('onChange');

    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [SearchBarComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    component.onChange = mockOnChange;
    fixture.detectChanges();
  });

  it('should display the correct placeholder', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    expect(inputElement.placeholder).toBe(component.placeHolder);
  });

  it('should call onChange when Enter key is pressed', () => {
    const inputElement = fixture.nativeElement.querySelector('input');
    const event = new KeyboardEvent('keyup', { key: 'Enter' });

    inputElement.value = 'Test search';
    inputElement.dispatchEvent(event);

    fixture.detectChanges();

    expect(mockOnChange).toHaveBeenCalled();
  });
});
