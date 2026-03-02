import seedJson from './seed.json';
import type {
  Activity,
  DefectSummary,
  KeyDate,
  RawActivity,
  ReviewStatus
} from './types';

const STORAGE_KEY = 'cycleready:v3:activities';
const isBrowser = typeof window !== 'undefined';
const RAW = seedJson as {
  activities: RawActivity[];
  keyDates: KeyDate[];
  defects: DefectSummary;
};

const addTimelineIds = (activity: RawActivity): Activity => ({
  ...activity,
  timeline: activity.timeline.map((entry, index) => ({
    ...entry,
    id: `${activity.id}-timeline-${index}`
  }))
});

export const requiredCredits = 60;
export const reviewStatuses: ReviewStatus[] = [
  'Accepted',
  'Pending Review',
  'Needs Correction',
  'Rejected'
];

export const seedActivities: Activity[] = RAW.activities.map((activity) => addTimelineIds(activity));
export const keyDates: KeyDate[] = RAW.keyDates;
export const defectSummary: DefectSummary = RAW.defects;

export function readStoredActivities(): Activity[] | null {
  if (!isBrowser) return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Activity[];
  } catch (error) {
    console.error('Failed to parse stored activities', error);
    return null;
  }
}

export function persistActivities(activities: Activity[]): void {
  if (!isBrowser) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}

export function ensureSeededActivities(): Activity[] {
  const stored = readStoredActivities();
  if (stored) {
    return stored;
  }
  const cloned = seedActivities.map((activity) => ({ ...activity }));
  persistActivities(cloned);
  return cloned;
}
