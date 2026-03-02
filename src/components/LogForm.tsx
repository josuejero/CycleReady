import { useState, type FormEvent } from 'react';
import type { Activity } from '../data/types';

const categories = ['Clinical', 'Educational', 'Simulation', 'Leadership', 'Quality Improvement'];

interface LogFormProps {
  onSave: (entry: Activity) => void;
  totalCredits: number;
  requiredCredits: number;
}

const initialForm = {
  title: '',
  provider: '',
  category: '',
  credits: '',
  completionDate: '',
  notes: ''
};

export default function LogForm({ onSave, totalCredits, requiredCredits }: LogFormProps) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [banner, setBanner] = useState<string | null>(null);

  const handleChange = (field: keyof typeof initialForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
    setBanner(null);
  };

  const validate = () => {
    const result: Record<string, string> = {};
    if (!form.title.trim()) {
      result.title = 'Title is required so QA knows which activity to test.';
    }
    if (!form.provider.trim()) {
      result.provider = 'Provider name is required for compliance tracking.';
    }
    if (!form.category) {
      result.category = 'Select a category to describe the CME type.';
    }
    if (!form.completionDate) {
      result.completionDate = 'Provide a completion date so the cycle window can be validated.';
    }
    const creditsNumber = Number(form.credits);
    if (!form.credits || Number.isNaN(creditsNumber) || creditsNumber <= 0) {
      result.credits = 'Enter a number greater than zero for the credits earned.';
    }
    return result;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setBanner('One or more required fields are invalid. Please resolve the listed errors.');
      return;
    }

    const creditsNumber = Number(form.credits);
    const id = `cme-${Date.now()}`;

    const newEntry: Activity = {
      id,
      title: form.title.trim(),
      provider: form.provider.trim(),
      category: form.category,
      credits: creditsNumber,
      completionDate: form.completionDate,
      status: 'Pending Review',
      notes: form.notes.trim() || undefined,
      createdAt: new Date().toISOString(),
      timeline: [
        {
          id: `${id}-timeline-0`,
          actor: 'Clinician',
          action: 'Clinician submitted CME log',
          detail: 'Metadata will be added via the upload simulator.',
          timestamp: new Date().toISOString()
        }
      ]
    };

    onSave(newEntry);
    setForm(initialForm);
    setBanner('CME log saved locally and pushed into history for review.');
  };

  const completionPercentage = Math.min(100, Math.round((totalCredits / requiredCredits) * 100));

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/70">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Log CME</p>
        <h2 className="text-2xl font-semibold text-white">Capture the next activity</h2>
        <p className="text-sm text-slate-400">
          This form writes directly to localStorage so QA can replay the same steps. Metadata uploads live in a separate panel below.
        </p>
      </div>

      {banner && (
        <div className="mt-4 rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-2 text-sm text-rose-100">
          {banner}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 grid gap-6 sm:grid-cols-[2fr,1fr]">
        <div className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="title">
              Activity Title
            </label>
            <input
              id="title"
              value={form.title}
              onChange={(event) => handleChange('title', event.target.value)}
              className={`w-full rounded-xl border bg-slate-950/70 px-4 py-2 text-sm text-white shadow-sm shadow-black/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                errors.title ? 'border-rose-500 ring-rose-200/40' : 'border-white/10'
              }`}
              placeholder="Example: Diabetes Remote Monitoring"
            />
            {errors.title && <p className="mt-1 text-xs text-rose-200">{errors.title}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="provider">
              Provider
            </label>
            <input
              id="provider"
              value={form.provider}
              onChange={(event) => handleChange('provider', event.target.value)}
              className={`w-full rounded-xl border bg-slate-950/70 px-4 py-2 text-sm text-white shadow-sm shadow-black/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                errors.provider ? 'border-rose-500 ring-rose-200/40' : 'border-white/10'
              }`}
              placeholder="Organisation or conference"
            />
            {errors.provider && <p className="mt-1 text-xs text-rose-200">{errors.provider}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="credits">
              Credits
            </label>
            <input
              id="credits"
              type="number"
              min={0.25}
              step={0.25}
              value={form.credits}
              onChange={(event) => handleChange('credits', event.target.value)}
              className={`w-full rounded-xl border bg-slate-950/70 px-4 py-2 text-sm text-white shadow-sm shadow-black/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                errors.credits ? 'border-rose-500 ring-rose-200/40' : 'border-white/10'
              }`}
              placeholder="e.g., 2"
            />
            <p className="text-xs text-slate-500">Quarter-credit precision keeps NCCPA reporting accurate.</p>
            {errors.credits && <p className="mt-1 text-xs text-rose-200">{errors.credits}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="completionDate">
              Completion date
            </label>
            <input
              id="completionDate"
              type="date"
              value={form.completionDate}
              onChange={(event) => handleChange('completionDate', event.target.value)}
              className={`w-full rounded-xl border bg-slate-950/70 px-4 py-2 text-sm text-white shadow-sm shadow-black/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                errors.completionDate ? 'border-rose-500 ring-rose-200/40' : 'border-white/10'
              }`}
            />
            {errors.completionDate && <p className="mt-1 text-xs text-rose-200">{errors.completionDate}</p>}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-200" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={form.category}
              onChange={(event) => handleChange('category', event.target.value)}
              className={`w-full rounded-xl border bg-slate-950/70 px-4 py-2 text-sm text-white shadow-sm shadow-black/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 ${
                errors.category ? 'border-rose-500 ring-rose-200/40' : 'border-white/10'
              }`}
            >
              <option value="">Select a category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="mt-1 text-xs text-rose-200">{errors.category}</p>}
          </div>
        </div>

        <div className="space-y-4 rounded-2xl border border-white/5 bg-slate-950/60 p-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Cycle snapshot</p>
            <p className="text-3xl font-semibold text-white">{totalCredits} credits</p>
            <p className="text-xs uppercase tracking-[0.4em] text-slate-500">{completionPercentage}% complete</p>
          </div>
          <div className="space-y-2 text-xs text-slate-400">
            <p>
              {Math.max(0, requiredCredits - totalCredits)} credits to go to meet the required {requiredCredits}. QA can reference this number without reloading.
            </p>
            <p>Metadata upload is optional when saving, but required for acceptance—use the uploader below.</p>
          </div>
          <button
            type="submit"
            className="w-full rounded-2xl border border-cyan-500/60 bg-cyan-500/30 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100 transition hover:border-cyan-400/80 hover:bg-cyan-500/50"
          >
            Save &amp; queue for review
          </button>
        </div>
      </form>
    </section>
  );
}
