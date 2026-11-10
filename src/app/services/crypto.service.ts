import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { switchMap, startWith } from 'rxjs/operators';
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

  // Using a relative URL to leverage the Angular Proxy (bypasses CORS issues during development)
  private apiUrl = '/api/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd';

  // HttpClient is injected as private to encapsulate the dependency (Low Coupling)
  constructor(private http: HttpClient) { }

  /**
   * Creates an Observable stream that polls the API for real-time prices.
   *
   * @returns {Observable<CryptoResponse>} A stream of cryptocurrency data.
   */
  getCryptoPricesLive(): Observable<CryptoResponse> {
    // interval(60000) emits a value every 60 seconds.
    // We use 60s instead of 5s to respect CoinGecko's rate limits (HTTP 429 prevention).
    return interval(60000).pipe(

      // startWith(0) triggers the first HTTP request immediately,
      // avoiding the 60-second wait for the user's initial load.
      startWith(0),

      // switchMap is the key operator here:
      // Every time the interval emits, it cancels any previous pending HTTP request
      // and starts a new one, preventing race conditions and memory leaks.
      switchMap(() => this.http.get<CryptoResponse>(this.apiUrl, { responseType: 'json' }))
    );
  }
}
