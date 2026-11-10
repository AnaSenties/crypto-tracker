import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap, startWith, map } from 'rxjs/operators';
import { CryptoResponse } from '../models/crypto.model';

/**
 * Service responsible for fetching cryptocurrency data.
 *
 * @Injectable({ providedIn: 'root' }) makes this a Singleton service,
 * available globally across the entire application without needing to register it in a module.
 */
@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  // Using Binance API directly.
  // Unlike CoinGecko, Binance allows Cross-Origin Resource Sharing (CORS) from the browser,
  // which means we don't need a proxy in production (e.g., on Vercel).
  private apiUrl = 'https://api.binance.com/api/v3/ticker/price?symbols=["BTCUSDT","ETHUSDT","SOLUSDT"]';

  // HttpClient is injected as private to encapsulate the dependency (Low Coupling)
  constructor(private http: HttpClient) { }

  /**
   * Creates an Observable stream that polls the API for real-time prices.
   *
   * @returns {Observable<CryptoResponse>} A stream of cryptocurrency data.
   */
  getCryptoPricesLive(): Observable<CryptoResponse> {
    // interval(60000) emits a value every 60 seconds.
    // We use 60s instead of 5s to respect rate limits (HTTP 429 prevention).
    return interval(60000).pipe(

      // startWith(0) triggers the first HTTP request immediately,
      // avoiding the 60-second wait for the user's initial load.
      startWith(0),

      // switchMap is the key operator here:
      // Every time the interval emits, it cancels any previous pending HTTP request
      // and starts a new one, preventing race conditions and memory leaks.
      switchMap(() => this.http.get<any[]>(this.apiUrl)),

      // map transforms the raw Binance response array into our expected 'CryptoResponse' interface.
      // This ensures our component receives data in the exact format it expects.
      map(data => {
        const btc = data.find(item => item.symbol === 'BTCUSDT')?.price || '0';
        const eth = data.find(item => item.symbol === 'ETHUSDT')?.price || '0';
        const sol = data.find(item => item.symbol === 'SOLUSDT')?.price || '0';

        return {
          bitcoin: { usd: parseFloat(btc) },
          ethereum: { usd: parseFloat(eth) },
          solana: { usd: parseFloat(sol) }
        };
      })
    );
  }
}
