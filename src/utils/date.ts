const EASTERN_TIME_ZONE = 'America/New_York';

export const formatDate = (value: string): string => {
  const date = new Date(value);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: EASTERN_TIME_ZONE
  });
};

export const formatDateTime = (value: string): string => {
  const date = new Date(value);
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZone: EASTERN_TIME_ZONE
  });
};

export const daysUntil = (value: string, reference: Date = new Date()): number => {
  const target = new Date(value);
  const now = reference;
  const diff = target.getTime() - now.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
};

export const dueStatus = (value: string, thresholds: { dueSoon: number; overdue: number } = { dueSoon: 14, overdue: 0 }): 'on-track' | 'due-soon' | 'overdue' => {
  const remaining = daysUntil(value);
  if (remaining <= thresholds.overdue) {
    return 'overdue';
  }
  if (remaining <= thresholds.dueSoon) {
    return 'due-soon';
  }
  return 'on-track';
};
