export const onlyDigits = (s: string): string => s.replace(/\D/g, '');

/** "+998 90 123 45 67" yoki "901234567" → "901234567" */
export function phoneDigits(s: string): string {
  let d = onlyDigits(s);
  if (d.length > 9 && d.startsWith('998')) d = d.slice(3);
  return d.slice(0, 9);
}

/** "901234567" → "90 123-45-67" */
export function formatPhone(d: string): string {
  const [a, b, c, e] = [d.slice(0, 2), d.slice(2, 5), d.slice(5, 7), d.slice(7, 9)];
  return a + (b && ' ' + b) + (c && '-' + c) + (e && '-' + e);
}

/** "1250000" → "1 250 000" */
export function formatMoney(d: string): string {
  return d.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}
