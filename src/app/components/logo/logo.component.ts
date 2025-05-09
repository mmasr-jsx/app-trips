import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './logo.component.html',
  styleUrl: './logo.component.css',
})
export class LogoComponent {
  logo = {
    src: '/logo.jpg',
    alt: 'logo',
  };
}
