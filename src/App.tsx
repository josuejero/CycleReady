import { useEffect, useMemo, useState } from 'react';
import LogForm from './components/LogForm';
import UploadSimulator from './components/UploadSimulator';
import HistoryList from './components/HistoryList';
import ReviewerPanel from './components/ReviewerPanel';
import KeyDatesPanel from './components/KeyDatesPanel';
import RemindersPanel, { type ReminderItem } from './components/RemindersPanel';
import { ensureSeededActivities, persistActivities, keyDates, defectSummary, requiredCredits, seedActivities } from './data/seed';
import type { Activity, FileMetadata, ReviewStatus } from './data/types';
import { formatDate, daysUntil } from './utils/date';

const basePath = import.meta.env.BASE_URL ?? '/';
const releaseRoomHref = `${basePath}release-room.html`;
const releaseSummaryHref = `${basePath}release-summary.html`;

function App() {
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

  const selectedActivity = useMemo(
    () => activities.find((activity) => activity.id === selectedActivityId) ?? activities[0],
    [activities, selectedActivityId]
  );

  const updateActivities = (updater: (items: Activity[]) => Activity[]) => {
    setActivities((current) => {
      const updated = updater(current);
      persistActivities(updated);
      return updated;
    });
  };

  const creditsLogged = activities.reduce((sum, activity) => sum + activity.credits, 0);
  const completionPercent = Math.min(100, Math.round((creditsLogged / requiredCredits) * 100));

  const upcomingKeyDate = useMemo(() => {
    const sorted = [...keyDates].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const future = sorted.find((date) => daysUntil(date.date) >= 0);
    return future ?? sorted[sorted.length - 1];
  }, []);

  const statusCounts = useMemo(() => {
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
  }, [activities]);

  const readinessStatus = completionPercent >= 80 && defectSummary.critical === 0 ? 'On Track' : 'Monitoring';
  const reminders: ReminderItem[] = useMemo(() => {
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
  }, [activities]);

  const handleNewEntry = (entry: Activity) => {
    updateActivities((prev) => [entry, ...prev]);
    setSelectedActivityId(entry.id);
  };

  const handleMetadata = (activityId: string, metadata: FileMetadata) => {
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
  };

  const handleStatusUpdate = (activityId: string, status: ReviewStatus, note?: string) => {
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
  };

  return (
    <div className="min-h-screen bg-slate-950 pb-16">
      <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
        <header className="space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.5em] text-cyan-300">CycleReady · Phase 3</p>
          <h1 className="text-3xl font-semibold text-white sm:text-4xl">Thin CME QA product</h1>
          <p className="max-w-3xl text-sm text-slate-400">
            LocalStorage + seeded JSON keep data predictable while QA replays the NCCPA-friendly workflow—the dashboard, logging, upload metadata, history, and reviewer controls stay in sync.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={releaseRoomHref}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white transition hover:border-cyan-300"
            >
              Release room
            </a>
            <a
              href={releaseSummaryHref}
              className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-amber-100 transition hover:border-amber-300"
            >
              Release summary
            </a>
          </div>
        </header>

        <section className="grid gap-6 xl:grid-cols-[1.35fr,0.65fr]">
          <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-2xl shadow-slate-950/70">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-400">Credits logged</p>
                <p className="text-5xl font-semibold text-white">{creditsLogged}</p>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{completionPercent}% of {requiredCredits}</p>
              </div>
              <div className="flex h-24 w-24 items-center justify-center rounded-2xl border border-cyan-500/60 bg-slate-950/40 text-2xl font-semibold text-white">
                {completionPercent}%
              </div>
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="space-y-1 rounded-2xl border border-white/5 bg-white/5 p-4 text-slate-100">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Next due</p>
                <p className="text-lg font-semibold">{upcomingKeyDate.label}</p>
                <p className="text-sm text-slate-300">
                  {formatDate(upcomingKeyDate.date)} · {daysUntil(upcomingKeyDate.date) >= 0 ? `${daysUntil(upcomingKeyDate.date)} days left` : `${Math.abs(daysUntil(upcomingKeyDate.date))} days overdue`}
                </p>
              </div>
              <div className="space-y-1 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-4 text-slate-100">
                <p className="text-xs uppercase tracking-[0.4em] text-amber-200">Reminders</p>
                <p className="text-2xl font-semibold">{reminders.length}</p>
                <p className="text-xs text-amber-100">Metadata or reviewer corrections still pending.</p>
              </div>
            </div>
            <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/60 p-4 text-sm text-slate-300">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white">Accepted {statusCounts.Accepted}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-white">Pending {statusCounts['Pending Review']}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-sky-200">Needs Correction {statusCounts['Needs Correction']}</span>
                <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-rose-200">Rejected {statusCounts.Rejected}</span>
              </div>
              <div className="mt-3 grid gap-1 text-xs text-slate-400 sm:grid-cols-2">
                <p>Open defects: {defectSummary.total} (critical {defectSummary.critical})</p>
                <p>
                  Readiness: <span className="font-semibold text-white">{readinessStatus}</span>
                </p>
              </div>
            </div>
          </div>

          <RemindersPanel reminders={reminders} onAction={(id) => setSelectedActivityId(id)} />
        </section>

        <KeyDatesPanel keyDates={keyDates} />

        <section className="grid gap-6 lg:grid-cols-2">
          <LogForm onSave={handleNewEntry} totalCredits={creditsLogged} requiredCredits={requiredCredits} />
          <UploadSimulator selectedActivity={selectedActivity} onSaveMetadata={handleMetadata} />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <HistoryList activities={activities} />
          <ReviewerPanel activity={selectedActivity} onUpdateStatus={handleStatusUpdate} />
        </section>
      </div>
    </div>
  );
}

export default App;
