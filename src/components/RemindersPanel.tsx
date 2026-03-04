import type { ReminderItem } from '../models/reminder';

export default function RemindersPanel({
  reminders,
  onAction
}: {
  reminders: ReminderItem[];
  onAction?: (id: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/70">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-100">Reminders</h2>
        <p className="text-sm text-slate-400">Deadlines follow NCCPA Eastern Time (ET) so due dates stay consistent with certification rules.</p>
      </div>

      {reminders.length === 0 ? (
        <div className="space-y-2 rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm text-emerald-200">
          <p>No outstanding reminders. You cleared the metadata and reviewer notes required at this time.</p>
          <p>We'll repopulate this list if a new log goes pending or we detect missing support files.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {reminders.map((reminder) => (
            <article
              key={reminder.id}
              className="rounded-2xl border border-white/10 bg-slate-950/40 p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wide text-amber-300">{reminder.status}</p>
                  <h3 className="text-base font-semibold text-white">{reminder.title}</h3>
                  <p className="text-xs text-slate-400">{reminder.provider}</p>
                </div>
                <button
                  type="button"
                  onClick={() => onAction?.(reminder.id)}
                  className="rounded-full border border-cyan-500/40 bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cyan-200 transition hover:border-cyan-300/80 hover:text-cyan-100"
                >
                  {reminder.actionLabel}
                </button>
              </div>
              <p className="mt-3 text-sm text-slate-400">{reminder.reason}</p>
              <p className="mt-1 text-xs text-slate-500">{reminder.actionHint}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
