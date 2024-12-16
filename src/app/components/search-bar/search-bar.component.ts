import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchBarComponent {
  @Input() onChange!: (e: Event) => void;
  @Input() placeHolder: string = 'Search...';

  handleOnNameChange(e: any) {
    this.onChange(e);
  }
}
