import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { SelectComponent } from './select.component';
import { SelectOption } from '../../models/trip.model';
import { removeWhiteSpace } from '../../utils/utils';

@Component({
  template: `
    <app-select
      [title]="title"
      [options]="options"
      [selectedValue]="selectedValue"
      [onChange]="onChange"
    ></app-select>
  `,
})
class TestHostComponent {
  title = 'Test Select';
  options: SelectOption[] = [
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
  ];
  selectedValue = '1';
  onChange = jasmine.createSpy('onChange');
}

describe('SelectComponent with Host Component', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestHostComponent],
      imports: [SelectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the correct title', () => {
    const titleElement = fixture.nativeElement.querySelector('p');
    expect(titleElement.textContent).toContain(`${component.title}:`);
  });

  it('should display the correct labels for options', () => {
    const options = fixture.nativeElement.querySelectorAll('option');

    //There is an empty option in the component for placeholder
    expect(options[0].textContent).toBe('');
    expect(removeWhiteSpace(options[1].textContent)).toBe(
      removeWhiteSpace(component.options[0].label)
    );
    expect(removeWhiteSpace(options[2].textContent)).toBe(
      removeWhiteSpace(component.options[1].label)
    );
  });

  it('should have the correct selected value', () => {
    const selectElement = fixture.nativeElement.querySelector('select');
    expect(selectElement.value).toBe(component.selectedValue);
  });

  it('should call onChange when value is changed', () => {
    const selectElement = fixture.nativeElement.querySelector('select');
    selectElement.value = '2';
    selectElement.dispatchEvent(new Event('change'));

    fixture.detectChanges();
    expect(component.onChange).toHaveBeenCalled();
  });
});
