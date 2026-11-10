# Real-Time Crypto Tracker (Angular 19)

A modern, real-time cryptocurrency tracker built with Angular 19 and RxJS. 
This project demonstrates advanced state management, reactive programming, and API integration.

**[View Live Demo](https://crypto-tracker-bice-rho.vercel.app/)**

## Key Technical Decisions (Why this project matters)

*   **Standalone Components:** Utilized Angular 19 Standalone Components to reduce boilerplate and improve tree-shaking.
*   **Smart vs. Dumb Components:** Separated the logic (`AppComponent`) from the presentation (`CryptoCardComponent`) to ensure high reusability and testability.
*   **Reactive Programming (RxJS):** Implemented a real-time polling mechanism using `interval` and `switchMap` to fetch prices every 60 seconds. `switchMap` automatically cancels previous HTTP requests, preventing race conditions and memory leaks.
*   **Memory Management:** Subscriptions are explicitly managed and cleaned up in `ngOnDestroy` to prevent memory leaks.
*   **CORS Resolution:** Migrated from CoinGecko to Binance API in production to natively bypass Cross-Origin Resource Sharing restrictions without needing a backend proxy.
*   **TypeScript Interfaces:** Strongly typed API responses using dedicated interfaces (`CryptoResponse`).

## Tech Stack

*   **Framework:** Angular 19
*   **Language:** TypeScript
*   **State/Reactivity:** RxJS (Observables)
*   **Styling:** Vanilla CSS (Flexbox, CSS Variables)
*   **Deployment:** Vercel

## How to run locally

1. Clone the repository: `git clone https://github.com/AnaSenties/crypto-tracker.git`
2. Install dependencies: `npm install`
3. Run the development server: `ng serve`
4. Navigate to `http://localhost:4200`

*(Note: For local development, this project uses a `proxy.conf.json` to bypass CORS when connecting to external APIs).*
