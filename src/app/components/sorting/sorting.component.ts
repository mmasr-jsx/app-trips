import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Input,
} from '@angular/core';
import {
  QueryOptions,
  SelectOption,
  SortBy,
  SortOrder,
} from '../../models/trip.model';
import { TripStore } from '../../store/trip.store';
import { SearchBarComponent } from '../search-bar/search-bar.component';
import { SelectComponent } from '../select/select.component';
import { SelectOptionsAdapter } from '../../adapter/trip.adapter';

@Component({
  selector: 'app-sorting',
  standalone: true,
  imports: [SearchBarComponent, SelectComponent],
  templateUrl: './sorting.component.html',
  styleUrl: './sorting.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SortingComponent {
  readonly store = inject(TripStore);
  @Input() tripName: string = '';

  filterOptions: QueryOptions = {};

  sortBy: SelectOption[] = SelectOptionsAdapter(SortBy);
  sortOrder: SelectOption[] = SelectOptionsAdapter(SortOrder);

  selectedSortByOption = computed(() => {
    return this.store.getCurrentSortOption('by');
  });
  selectedSortOrderOption = computed(() =>
    this.store.getCurrentSortOption('order')
  );

  onNameChange = (event: Event): void => {
    const inputElement = event.target as HTMLInputElement;
    this.filterOptions.title = inputElement.value;
    this.filterTrips();
  };

  onSortByChange = (event: Event): void => {
    const selectElement = event.target as HTMLSelectElement;
    this.filterOptions.by = selectElement.value;
    this.filterTrips();
  };

  onSortOrderChange = (event: Event): void => {
    const selectElement = event.target as HTMLSelectElement;
    this.filterOptions.order = selectElement.value;
    this.filterTrips();
  };

  filterTrips(): void {
    this.store.filterTrips(this.filterOptions);
  }

  resetFilterOptions(): void {
    this.filterOptions = {};

    this.filterTrips();
  }
}
