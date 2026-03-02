import type { KeyDate } from '../data/types';
import { daysUntil, dueStatus, formatDate } from '../utils/date';

const statusLabel: Record<'on-track' | 'due-soon' | 'overdue', { text: string; badge: string }> = {
  'on-track': { text: 'On track', badge: 'bg-cyan-500/20 text-cyan-200' },
  'due-soon': { text: 'Due soon', badge: 'bg-amber-500/20 text-amber-200' },
  overdue: { text: 'Overdue', badge: 'bg-rose-500/20 text-rose-200' }
};

export default function KeyDatesPanel({ keyDates }: { keyDates: KeyDate[] }) {
  const sorted = [...keyDates].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/50">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Key Dates</p>
          <h2 className="text-2xl font-semibold text-white">NCCPA cycle checkpoints</h2>
        </div>
        <p className="text-sm text-slate-400">
          NCCPA guidance ties each date to a mandated CME logging window; the system treats everything in Eastern Time (ET).
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {sorted.map((date) => {
          const status = dueStatus(date.date, { dueSoon: 21, overdue: 0 });
          const remaining = daysUntil(date.date);
          const badge = statusLabel[status];
          return (
            <article key={date.id} className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{date.type === 'cycle' ? 'Cycle' : 'Milestone'}</p>
                  <h3 className="text-xl font-semibold text-white">{date.label}</h3>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] ${badge.badge}`}>
                  {badge.text}
                </span>
              </div>
              <p className="text-sm text-slate-300">{date.description}</p>
              <div className="flex items-center justify-between text-sm text-slate-400">
                <span>{formatDate(date.date)}</span>
                <span>{remaining >= 0 ? `${remaining} days left` : `${Math.abs(remaining)} days overdue`}</span>
              </div>
            </article>
          );
        })}
      </div>
      <p className="mt-4 text-xs text-slate-500">
        Dates flip to “Due soon” within 21 days of a deadline and become “Overdue” after midnight ET so QA can replay NCCPA window rules consistently.
      </p>
    </section>
  );
}
