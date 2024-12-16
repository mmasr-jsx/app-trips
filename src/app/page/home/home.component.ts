import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { TripStore } from '../../store/trip.store';
import { TripCardComponent } from '../../components/trip-card/trip-card.component';
import { RouterModule } from '@angular/router';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { getTotalPages } from '../../utils/utils';
import { SortingComponent } from '../../components/sorting/sorting.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TripCardComponent,
    RouterModule,
    PaginationComponent,
    SortingComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  readonly store = inject(TripStore);

  trips = computed(() => this.store.curItems());
  currentPage = computed(() => this.store.curPage());
  totalPages = computed(() => getTotalPages(this.store.total(), 12));

  async movePage(page: number): Promise<void> {
    await this.store.movePage(page);
  }
}
