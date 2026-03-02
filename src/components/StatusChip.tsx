import type { ReviewStatus } from '../data/types';

const colorMap: Record<ReviewStatus, string> = {
  Accepted: 'bg-emerald-400/20 text-emerald-300 border-emerald-600',
  'Pending Review': 'bg-amber-400/20 text-amber-300 border-amber-500',
  'Needs Correction': 'bg-sky-400/20 text-sky-300 border-sky-500',
  Rejected: 'bg-rose-400/20 text-rose-300 border-rose-500'
};

export default function StatusChip({ status }: { status: ReviewStatus }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-0.5 text-xs font-semibold uppercase tracking-wide ${
        colorMap[status]
      }`}
    >
      {status}
    </span>
  );
}
