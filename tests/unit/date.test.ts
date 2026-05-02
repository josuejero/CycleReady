import { describe, expect, it } from 'vitest';
import { daysUntil, dueStatus, formatDate, formatDateTime } from '../../src/utils/date';

describe('date formatting helpers', () => {
  it('formats dates in the expected US display style', () => {
    expect(formatDate('2026-05-02T12:00:00.000Z')).toBe('May 2, 2026');
  });

  it('formats date and time values with an Eastern Time display', () => {
    const formatted = formatDateTime('2026-05-02T12:30:00.000Z');

    expect(formatted).toContain('May 2, 2026');
    expect(formatted).toContain('8:30 AM');
  });
});

describe('daysUntil', () => {
  it('calculates whole-day difference from a supplied reference date', () => {
    expect(daysUntil('2026-05-05T00:00:00.000Z', new Date('2026-05-02T00:00:00.000Z'))).toBe(3);
  });
});

describe('dueStatus', () => {
  it('marks dates as overdue due soon or on track against default thresholds', () => {
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
    const fiveDaysFromNow = new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString();
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    expect(dueStatus(oneDayAgo)).toBe('overdue');
    expect(dueStatus(fiveDaysFromNow)).toBe('due-soon');
    expect(dueStatus(thirtyDaysFromNow)).toBe('on-track');
  });
});
