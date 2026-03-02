import { useEffect, useState, type FormEvent } from 'react';
import type { Activity, ReviewStatus } from '../data/types';
import StatusChip from './StatusChip';
import { formatDateTime } from '../utils/date';

const reviewerOptions: ReviewStatus[] = ['Accepted', 'Pending Review', 'Needs Correction', 'Rejected'];

interface ReviewerPanelProps {
  activity?: Activity;
  onUpdateStatus: (activityId: string, status: ReviewStatus, note?: string) => void;
}

export default function ReviewerPanel({ activity, onUpdateStatus }: ReviewerPanelProps) {
  const [selectedStatus, setSelectedStatus] = useState<ReviewStatus>('Pending Review');
  const [note, setNote] = useState('');
  const [banner, setBanner] = useState<string | null>(null);

  useEffect(() => {
    if (activity) {
      setSelectedStatus(activity.status);
    }
  }, [activity]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!activity) return;
    onUpdateStatus(activity.id, selectedStatus, note.trim() || undefined);
    setBanner('Reviewer update saved locally. Timeline appended for clinician review.');
  };

  if (!activity) {
    return (
      <section className="rounded-2xl border border-dashed border-white/10 bg-slate-900/60 p-6 text-sm text-slate-400">
        Select a submission to review.
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/60">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Reviewer</p>
        <h2 className="text-2xl font-semibold text-white">Status &amp; notes</h2>
        <p className="text-sm text-slate-400">
          Timeline entries label actions as Clinician or Reviewer so everyone knows who made the change.
        </p>
      </div>

      {banner && (
        <div className="mt-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2 text-sm text-cyan-50">
          {banner}
        </div>
      )}

      <div className="mt-4 grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Current entry</p>
          <h3 className="text-lg font-semibold text-white">{activity.title}</h3>
          <p className="text-xs text-slate-400">{activity.provider}</p>
          <p className="text-sm text-slate-300">{activity.notes ?? 'No clinician note provided.'}</p>
          <p className="text-xs text-slate-500">Completion date: {formatDateTime(activity.completionDate)}</p>
          <div className="mt-2">
            <StatusChip status={activity.status} />
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-xs font-semibold uppercase tracking-[0.4em] text-slate-500">
            Reviewer action
          </label>
          <div className="space-y-2">
            {reviewerOptions.map((option) => (
              <label key={option} className="flex items-center gap-2 text-sm text-slate-300">
                <input
                  type="radio"
                  name="status"
                  value={option}
                  checked={selectedStatus === option}
                  onChange={() => setSelectedStatus(option)}
                  className="accent-cyan-500"
                />
                {option}
              </label>
            ))}
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.4em] text-slate-500" htmlFor="review-note">
              Comment
            </label>
            <textarea
              id="review-note"
              rows={3}
              value={note}
              onChange={(event) => setNote(event.target.value)}
              className="w-full rounded-xl border border-white/10 bg-slate-950/70 px-3 py-2 text-sm text-white shadow-sm shadow-black/40 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
              placeholder="Add a reviewer note for the clinician (optional)."
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl border border-amber-500/50 bg-amber-500/30 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-amber-100 transition hover:border-amber-400/80 hover:bg-amber-500/40"
          >
            Save reviewer update
          </button>
        </form>
      </div>

      <div className="mt-6 space-y-3">
        <h3 className="text-sm font-semibold uppercase tracking-[0.4em] text-slate-500">Timeline</h3>
        <div className="space-y-2">
          {activity.timeline.map((entry) => (
            <div key={entry.id} className="flex items-start justify-between rounded-xl border border-white/5 bg-slate-950/40 p-3 text-sm text-slate-300">
              <div>
                <p className="font-semibold text-slate-100">{entry.actor}</p>
                <p className="text-[13px] text-slate-400">{entry.action}</p>
                {entry.detail && <p className="text-[12px] text-slate-500">{entry.detail}</p>}
              </div>
              <p className="text-[11px] uppercase tracking-[0.4em] text-slate-500">{formatDateTime(entry.timestamp)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
