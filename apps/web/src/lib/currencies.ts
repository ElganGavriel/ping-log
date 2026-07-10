export const CURRENCIES = [
  { code: 'USD', label: 'US Dollar' },
  { code: 'EUR', label: 'Euro' },
  { code: 'GBP', label: 'British Pound' },
  { code: 'JPY', label: 'Japanese Yen' },
  { code: 'AUD', label: 'Australian Dollar' },
  { code: 'CAD', label: 'Canadian Dollar' },
  { code: 'CHF', label: 'Swiss Franc' },
  { code: 'CNY', label: 'Chinese Yuan' },
  { code: 'TWD', label: 'Taiwan Dollar' },
  { code: 'INR', label: 'Indian Rupee' },
  { code: 'BRL', label: 'Brazilian Real' },
  { code: 'MXN', label: 'Mexican Peso' },
  { code: 'ZAR', label: 'South African Rand' },
  { code: 'SGD', label: 'Singapore Dollar' },
  { code: 'NZD', label: 'New Zealand Dollar' },
  { code: 'SEK', label: 'Swedish Krona' },
  { code: 'NOK', label: 'Norwegian Krone' },
  { code: 'KRW', label: 'South Korean Won' },
  { code: 'HKD', label: 'Hong Kong Dollar' },
  { code: 'AED', label: 'UAE Dirham' },
  { code: 'PLN', label: 'Polish Zloty' },
] as const;

export function formatMoney(amount: number, currency: string, maximumFractionDigits = 2): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency,
    maximumFractionDigits,
  }).format(amount);
}
