import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Activity, FileMetadata, ReviewStatus } from '../data/types';
import { buildReminders } from '../models/reminder';
import { calculateStatusCounts, determineReadinessStatus, getUpcomingKeyDate } from '../utils/activityMetrics';
import { ensureSeededActivities } from '../services/activityPersistence';
import { persistActivities } from '../services/activityStorage';
import { defectSummary, keyDates, requiredCredits, seedActivities } from '../data/seed';

export function useActivityDashboard() {
  const [activities, setActivities] = useState<Activity[]>(seedActivities);
  const [selectedActivityId, setSelectedActivityId] = useState<string | null>(null);

  useEffect(() => {
    const seeded = ensureSeededActivities();
    setActivities(seeded);
  }, []);

  useEffect(() => {
    if (!selectedActivityId && activities.length) {
      setSelectedActivityId(activities[0].id);
    }
  }, [activities, selectedActivityId]);

  const updateActivities = useCallback(
    (updater: (items: Activity[]) => Activity[]) => {
      setActivities((current) => {
        const updated = updater(current);
        persistActivities(updated);
        return updated;
      });
    },
    []
  );

  const handleNewEntry = useCallback(
    (entry: Activity) => {
      updateActivities((prev) => [entry, ...prev]);
      setSelectedActivityId(entry.id);
    },
    [updateActivities]
  );

  const handleMetadata = useCallback(
    (activityId: string, metadata: FileMetadata) => {
      updateActivities((prev) =>
        prev.map((activity) =>
          activity.id === activityId
            ? {
                ...activity,
                metadata,
                timeline: [
                  ...activity.timeline,
                  {
                    id: `${activity.id}-timeline-${activity.timeline.length}`,
                    actor: 'Clinician',
                    action: 'Attached metadata',
                    detail: metadata.fileName,
                    timestamp: new Date().toISOString()
                  }
                ]
              }
            : activity
        )
      );
      setSelectedActivityId(activityId);
    },
    [updateActivities]
  );

  const handleStatusUpdate = useCallback(
    (activityId: string, status: ReviewStatus, note?: string) => {
      updateActivities((prev) =>
        prev.map((activity) =>
          activity.id === activityId
            ? {
                ...activity,
                status,
                reviewerNote: note,
                timeline: [
                  ...activity.timeline,
                  {
                    id: `${activity.id}-timeline-${activity.timeline.length}`,
                    actor: 'Reviewer',
                    action: status,
                    detail: note,
                    timestamp: new Date().toISOString()
                  }
                ]
              }
            : activity
        )
      );
      setSelectedActivityId(activityId);
    },
    [updateActivities]
  );

  const selectActivity = useCallback((activityId: string) => {
    setSelectedActivityId(activityId);
  }, []);

  const selectedActivity = useMemo(() => {
    if (!activities.length) return undefined;
    if (!selectedActivityId) {
      return activities[0];
    }
    return activities.find((activity) => activity.id === selectedActivityId) ?? activities[0];
  }, [activities, selectedActivityId]);

  const creditsLogged = useMemo(() => activities.reduce((sum, activity) => sum + activity.credits, 0), [activities]);
  const completionPercent = useMemo(
    () => Math.min(100, Math.round((creditsLogged / requiredCredits) * 100)),
    [creditsLogged, requiredCredits]
  );
  const upcomingKeyDate = useMemo(() => getUpcomingKeyDate(keyDates), [keyDates]);
  const statusCounts = useMemo(() => calculateStatusCounts(activities), [activities]);
  const reminders = useMemo(() => buildReminders(activities), [activities]);
  const readinessStatus = useMemo(
    () => determineReadinessStatus(completionPercent, defectSummary.critical),
    [completionPercent, defectSummary.critical]
  );

  return {
    activities,
    creditsLogged,
    completionPercent,
    upcomingKeyDate,
    keyDates,
    statusCounts,
    reminders,
    readinessStatus,
    defectSummary,
    selectedActivity,
    handleNewEntry,
    handleMetadata,
    handleStatusUpdate,
    selectActivity,
    requiredCredits
  };
}
