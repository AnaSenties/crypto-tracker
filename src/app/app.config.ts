import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';

/**
 * Application Configuration
 *
 * This file configures the global providers for the Angular application.
 * We use it to enable features like HTTP requests and Zone change detection.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    // Optimizes change detection by coalescing multiple events into a single cycle.
    // This improves performance in apps with heavy user interaction.
    provideZoneChangeDetection({ eventCoalescing: true }),

    // Enables the HttpClient service globally.
    // Without this provider, the CryptoService would throw an error when trying to inject it.
    provideHttpClient()
  ]
};
