import seedJson from './seed.json';
import type {
  Activity,
  DefectSummary,
  KeyDate,
  RawActivity,
  ReviewStatus
} from './types';

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
