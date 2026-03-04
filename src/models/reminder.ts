import type { Activity, ReviewStatus } from '../data/types';

export type ReminderItem = {
  id: string;
  title: string;
  provider: string;
  status: ReviewStatus;
  reason: string;
  actionLabel: string;
  actionHint: string;
};

export function buildReminders(activities: Activity[]): ReminderItem[] {
  return activities
    .filter((activity) => !activity.metadata || activity.status === 'Needs Correction')
    .map((activity) => {
      if (!activity.metadata) {
        return {
          id: activity.id,
          title: activity.title,
          provider: activity.provider,
          status: activity.status,
          reason: `Upload provider certificate metadata for ${activity.category} CME log to satisfy reminders.`,
          actionLabel: 'Upload metadata',
          actionHint: 'Required for QA to confirm the NCCPA documentation window.'
        };
      }

      return {
        id: activity.id,
        title: activity.title,
        provider: activity.provider,
        status: activity.status,
        reason: 'Reviewer asked for clarification; update status or attach the missing roster.',
        actionLabel: 'Add notes',
        actionHint: 'Clarify next steps so the timeline shows progress.'
      };
    });
}
