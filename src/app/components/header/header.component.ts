import { Component, inject } from '@angular/core';
import { TripOtdComponent } from '../trip-otd/trip-otd.component';
import { TripOtdStore } from '../../store/tripOtd.store';
import { LogoComponent } from '../logo/logo.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [TripOtdComponent, LogoComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  readonly store = inject(TripOtdStore);
}
