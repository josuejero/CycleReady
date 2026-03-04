import type { Activity, KeyDate, ReviewStatus } from '../data/types';
import { daysUntil } from './date';

const FALLBACK_KEY_DATE: KeyDate = {
  id: 'fallback',
  label: 'No scheduled milestones',
  date: new Date().toISOString(),
  description: 'Add key dates once they are available.',
  type: 'milestone'
};

export function calculateStatusCounts(activities: Activity[]): Record<ReviewStatus, number> {
  const base: Record<ReviewStatus, number> = {
    Accepted: 0,
    'Pending Review': 0,
    'Needs Correction': 0,
    Rejected: 0
  };
  return activities.reduce((counts, activity) => {
    counts[activity.status] += 1;
    return counts;
  }, base);
}

export function getUpcomingKeyDate(dates: KeyDate[]): KeyDate {
  if (dates.length === 0) {
    return FALLBACK_KEY_DATE;
  }
  const sorted = [...dates].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const future = sorted.find((date) => daysUntil(date.date) >= 0);
  return future ?? sorted[sorted.length - 1];
}

export function determineReadinessStatus(completionPercent: number, criticalDefects: number) {
  return completionPercent >= 80 && criticalDefects === 0 ? 'On Track' : 'Monitoring';
}
