import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CryptoCardComponent } from './crypto-card/crypto-card.component';
import { CryptoService } from './services/crypto.service';
import { CryptoResponse } from './models/crypto.model';
import { Subscription } from 'rxjs';


/**
 * AppComponent acts as the "Smart" or Container component.
 *
 * It is responsible for fetching data from the API via the service,
 * managing the component state, and passing data down to "Dumb" child components.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CryptoCardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'crypto-tracker';

  // State variables: Typed with our interface (or null if data hasn't arrived yet)
  cryptoData: CryptoResponse | null = null;
  errorMessage: string = '';

  // Variable to store the Subscription, allowing us to clean up memory later
  private cryptoSubscription: Subscription | undefined;

  // Dependency Injection: We inject the service to access its methods
  constructor(private cryptoService: CryptoService) {}

  ngOnInit(): void {
    console.log('🚀 Starting real-time tracker...');

    // We subscribe to the Observable stream. This triggers the HTTP request.
    this.cryptoSubscription = this.cryptoService.getCryptoPricesLive().subscribe({

      // NEXT notification: Fires every time new data arrives
      next: (data) => {
        this.cryptoData = data;
        console.log('📦 Prices updated at:', new Date().toLocaleTimeString());
      },

      // ERROR notification: Fires if the HTTP request fails (e.g., 429 Too Many Requests)
      error: (err) => {
        this.errorMessage = 'Error connecting to the API';
        console.error('🔴 API Error:', err);
      }
    });
  }

  ngOnDestroy(): void {
    // CRITICAL: We must unsubscribe to prevent Memory Leaks.
    // If we don't, the Observable stays in memory even after the component is destroyed.
    if (this.cryptoSubscription) {
      this.cryptoSubscription.unsubscribe();
      console.log('🗑️ Subscription canceled (No Memory Leaks)');
    }
  }
}
