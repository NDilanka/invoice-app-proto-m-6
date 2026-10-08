export type Line = { amount: number };

function fractionDigits(currency: string): number {
  return new Intl.NumberFormat('en', { style: 'currency', currency }).resolvedOptions()
    .maximumFractionDigits ?? 2;
}

export function formatTotal(lines: Line[], currency: string): string {
  const digits = fractionDigits(currency);
  const factor = 10 ** digits;
  const sum = lines.reduce((total, line) => total + line.amount, 0);
  // toPrecision strips binary float noise (e.g. 1.0049999999) before rounding half away from zero
  const scaled = Number((Math.abs(sum) * factor).toPrecision(15));
  const minor = Math.round(scaled);
  const text = (minor / factor).toFixed(digits);
  return sum < 0 && minor !== 0 ? `-${text}` : text;
}
