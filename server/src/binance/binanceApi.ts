export const binanceApi = (endpoint: string, init?: RequestInit) => {
  fetch(`https://api.binance.com/api/v3${endpoint}`, init);
};
