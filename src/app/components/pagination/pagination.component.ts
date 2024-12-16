import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  input,
} from '@angular/core';
import { TripStore } from '../../store/trip.store';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  readonly store = inject(TripStore);
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 1;
  @Input() movePage!: (page: number) => void;

  handleMovePage(page: number) {
    if (this.movePage) {
      this.movePage(page);
    }
  }
}
