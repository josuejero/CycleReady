import { describe, expect, it } from 'vitest';
import type { Activity, KeyDate } from '../../src/data/types';
import { calculateStatusCounts, determineReadinessStatus, getUpcomingKeyDate } from '../../src/utils/activityMetrics';

const baseActivity: Activity = {
  id: 'activity-1',
  title: 'Simulation CME log',
  provider: 'Remote CME Consortium',
  category: 'Educational',
  credits: 3,
  completionDate: '2026-02-28',
  status: 'Pending Review',
  createdAt: '2026-03-01T12:00:00.000Z',
  timeline: [
    {
      id: 'activity-1-timeline-0',
      actor: 'Clinician',
      action: 'Submitted',
      detail: 'Submitted for QA review',
      timestamp: '2026-03-01T12:00:00.000Z'
    }
  ]
};

describe('calculateStatusCounts', () => {
  it('counts every supported reviewer status without dropping zero-value statuses', () => {
    const activities: Activity[] = [
      baseActivity,
      { ...baseActivity, id: 'activity-2', status: 'Accepted' },
      { ...baseActivity, id: 'activity-3', status: 'Needs Correction' }
    ];

    expect(calculateStatusCounts(activities)).toEqual({
      Accepted: 1,
      'Pending Review': 1,
      'Needs Correction': 1,
      Rejected: 0
    });
  });
});

describe('getUpcomingKeyDate', () => {
  it('returns the next future date from an unsorted list', () => {
    const dates: KeyDate[] = [
      {
        id: 'later',
        label: 'Later milestone',
        date: '2026-06-15T00:00:00.000Z',
        description: 'Later milestone',
        type: 'milestone'
      },
      {
        id: 'past',
        label: 'Past milestone',
        date: '2026-01-15T00:00:00.000Z',
        description: 'Past milestone',
        type: 'milestone'
      },
      {
        id: 'next',
        label: 'Next milestone',
        date: '2026-05-20T00:00:00.000Z',
        description: 'Next milestone',
        type: 'cycle'
      }
    ];

    expect(getUpcomingKeyDate(dates).id).toBe('next');
  });

  it('returns a fallback date when no milestones exist', () => {
    expect(getUpcomingKeyDate([]).label).toBe('No scheduled milestones');
  });
});

describe('determineReadinessStatus', () => {
  it('returns On Track only when completion is high enough and critical defects are zero', () => {
    expect(determineReadinessStatus(80, 0)).toBe('On Track');
    expect(determineReadinessStatus(79, 0)).toBe('Monitoring');
    expect(determineReadinessStatus(90, 1)).toBe('Monitoring');
  });
});
