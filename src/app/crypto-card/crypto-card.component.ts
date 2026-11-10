import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * CryptoCardComponent is a "Dumb" or Presentational component.
 *
 * Its sole responsibility is to display the cryptocurrency data passed to it
 * by a parent component. It does not contain business logic or make API calls.
 */
@Component({
  selector: 'app-crypto-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './crypto-card.component.html',
  styleUrls: ['./crypto-card.component.css']
})
export class CryptoCardComponent {

  // @Input() acts as the contract to receive data from the parent component.
  @Input() name: string = '';
  @Input() price: number = 0;

  // Note: We don't need a constructor because this component doesn't inject any services.
  // The parent component (Smart Component) handles the API logic.
}
