import { describe, expect, it } from 'vitest';
import { formatCurrency, formatDate, formatPercent } from '../../tool/util';

describe('formatCurrency', () => {
  it('KRW', () => {
    expect(formatCurrency(50_000, 'KRW')).toBe('₩50,000');
  });

  it('USD', () => {
    expect(formatCurrency(40.56, 'USD')).toBe('US$40.56');
  });
});

describe('formatDate', () => {
  it('en', () => {
    expect(formatDate(new Date('2025-12-24'))).toBe('December 24, 2025');
  });

  it('ko', () => {
    expect(formatDate(new Date('2025-12-24'), 'ko')).toBe('2025년 12월 24일');
  });
});

it('formatPercent', () => {
  expect(formatPercent(0.5)).toBe('50%');
  expect(formatPercent(1 / 4)).toBe('25%');
});
