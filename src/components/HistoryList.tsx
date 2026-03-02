import StatusChip from './StatusChip';
import type { Activity } from '../data/types';
import { formatDate, formatDateTime } from '../utils/date';

export default function HistoryList({ activities }: { activities: Activity[] }) {
  if (activities.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-white/20 bg-slate-900/60 p-6 text-sm text-slate-400">
        <h2 className="text-base font-semibold text-white">Submission history</h2>
        <p className="mt-2">History is empty. Start by logging your first CME activity to see it here.</p>
      </section>
    );
  }

  const sorted = [...activities].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/50">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">History</p>
          <h2 className="text-2xl font-semibold text-white">Newest submissions first</h2>
        </div>
        <p className="text-xs text-slate-500">Status chips stay consistent with all other views (Accepted / Pending Review / Needs Correction / Rejected).</p>
      </div>

      <div className="space-y-4">
        {sorted.map((activity) => (
          <article
            key={activity.id}
            className="rounded-2xl border border-white/5 bg-slate-950/40 p-4 shadow-inner shadow-black/40"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{activity.title}</h3>
                <p className="text-sm text-slate-400">{activity.provider}</p>
              </div>
              <StatusChip status={activity.status} />
            </div>
            <div className="mt-3 grid gap-2 text-xs text-slate-400 sm:grid-cols-3">
              <span>Category: {activity.category}</span>
              <span>Credits: {activity.credits}</span>
              <span>Completion: {formatDate(activity.completionDate)}</span>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
              <p>{activity.metadata ? 'Metadata attached, reviewer-ready' : 'Missing metadata – add support upload below.'}</p>
              <p className="text-slate-500">Logged {formatDate(activity.createdAt)}</p>
            </div>
            <div className="mt-3 rounded-xl border border-white/5 bg-slate-950/40 p-3 text-xs text-slate-300">
              <p className="font-semibold text-slate-100">Latest action</p>
              <p className="mt-1 text-slate-400">{activity.timeline[activity.timeline.length - 1]?.detail || 'No detail recorded.'}</p>
              <p className="text-[11px] uppercase tracking-[0.4em] text-slate-500">
                {activity.timeline[activity.timeline.length - 1]?.actor ?? 'Clinician'} ·{' '}
                {activity.timeline[activity.timeline.length - 1]?.timestamp
                  ? formatDateTime(activity.timeline[activity.timeline.length - 1]?.timestamp)
                  : 'Timestamp missing'}{' '}
                ET
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
