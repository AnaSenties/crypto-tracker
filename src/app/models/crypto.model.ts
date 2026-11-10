/**
 * Represents the expected response from the CoinGecko API.
 */
export interface CryptoResponse {
  bitcoin: { usd: number };
  ethereum: { usd: number };
  solana: { usd: number };
}
