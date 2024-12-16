import {
  ChangeDetectionStrategy,
  Component,
  Input,
  SimpleChanges,
} from '@angular/core';
import { SelectOption } from '../../models/trip.model';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {
  @Input() title: string = '';
  @Input() options!: SelectOption[];
  @Input() selectedValue: string = '';
  @Input() onChange!: (e: Event) => void;

  handleOnChange(e: Event) {
    this.onChange(e);
  }
}
