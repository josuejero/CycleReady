import type { Activity } from '../data/types';
import { seedActivities } from '../data/seed';
import { persistActivities, readStoredActivities } from './activityStorage';

export function ensureSeededActivities(): Activity[] {
  const stored = readStoredActivities();
  if (stored) {
    return stored;
  }

  const cloned = seedActivities.map((activity) => ({
    ...activity,
    timeline: activity.timeline.map((entry) => ({ ...entry }))
  }));
  persistActivities(cloned);
  return cloned;
}
