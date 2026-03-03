import ReleaseSummaryPanel from './ReleaseSummaryPanel';
import {
  releaseDefects,
  releaseEvidenceLinks,
  releasePacketPdfHref,
  releaseSignoffMemo,
  releaseSummaryPageHref,
  severityBadge
} from '../data/release-room';

const basePath = import.meta.env.BASE_URL ?? '/';
const liveAppHref = basePath;

const testEvidenceCards = releaseEvidenceLinks.filter((link) =>
  link.label === 'Playwright smoke report' || link.label === 'Phase 5 UAT results log'
);

export default function ReleaseRoomPage() {
  const defectColumns = releaseDefects.map((defect) => {
    const badge = severityBadge(defect.severity);
    return (
      <tr key={defect.id} className="border-t border-white/5">
        <td className="py-3 text-sm text-slate-300">
          <div className="flex items-center gap-2">
            <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badge.color}`}>
              {badge.label}
            </span>
            <span className="text-slate-400">{defect.severity}</span>
          </div>
        </td>
        <td className="py-3 text-sm text-white">
          <p className="font-semibold">{defect.title}</p>
          <a href={defect.link} target="_blank" rel="noreferrer" className="text-xs text-cyan-300 underline">
            GitHub issue {defect.id}
          </a>
        </td>
        <td className="py-3 text-sm text-slate-300">{defect.owner}</td>
        <td className="py-3 text-sm text-slate-300">{defect.status}</td>
        <td className="py-3 text-sm text-slate-300">{defect.nextStep}</td>
      </tr>
    );
  });

  return (
    <main className="min-h-screen bg-slate-950 py-10 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4">
        <header className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300">Phase 8 · Release Room</p>
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl font-semibold text-white">Release-ready microsite</h1>
            <p className="max-w-3xl text-sm text-slate-400">
              This page compiles the latest QA readiness metrics, evidence, defects, and signoff memo so stakeholders can quickly audit the
              release state before shipping CycleReady.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={liveAppHref}
                className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300"
              >
                Live App
              </a>
              <a
                href={releaseSummaryPageHref}
                className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-300"
              >
                Release summary page
              </a>
              <a
                href={releasePacketPdfHref}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-cyan-500/40 bg-slate-900 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300"
              >
                UAT packet PDF
              </a>
            </div>
          </div>
        </header>

        <section>
          <ReleaseSummaryPanel compact />
        </section>

        <section className="space-y-4 rounded-3xl border border-white/5 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Open defects board</p>
              <h2 className="text-2xl font-semibold text-white">Tracked blockers</h2>
            </div>
            <p className="text-xs text-slate-500">Updated {releaseDefects.length} issues · {releaseTests.length} automation suites</p>
          </div>
          <div className="overflow-hidden rounded-2xl border border-white/5">
            <table className="w-full table-fixed">
              <thead className="bg-slate-950/60 text-left text-xs uppercase tracking-[0.4em] text-slate-500">
                <tr>
                  <th className="px-3 py-3">Severity</th>
                  <th className="px-3 py-3">Defect</th>
                  <th className="px-3 py-3">Owner</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-3 py-3">Next step</th>
                </tr>
              </thead>
              <tbody>{defectColumns}</tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-3xl border border-white/5 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6">
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Test evidence</p>
              <h3 className="text-xl font-semibold text-white">Automation + UAT snapshots</h3>
            </div>
            <div className="grid gap-4">
              {testEvidenceCards.map((link) => (
                <article key={link.label} className="space-y-2 rounded-2xl border border-white/5 bg-slate-950/50 p-4">
                  <p className="text-sm font-semibold text-white">{link.label}</p>
                  <p className="text-xs text-slate-400">{link.description}</p>
                  <a href={link.href} target="_blank" rel="noreferrer" className="text-xs font-semibold text-cyan-300 underline">
                    Open evidence folder
                  </a>
                </article>
              ))}
              <article className="rounded-2xl border border-white/5 bg-slate-950/50 p-4 text-xs text-slate-300">
                <p className="font-semibold text-white">Running the stack</p>
                <p className="mt-1 text-sm text-slate-400">Run <code className="rounded bg-slate-800 px-2 py-0.5 text-xs">npm run test:e2e</code> and review <code className="rounded bg-slate-800 px-2 py-0.5 text-xs">playwright-report/index.html</code>.</p>
              </article>
            </div>
          </article>
          <article className="rounded-3xl border border-white/5 bg-slate-950/60 p-6">
            <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Final signoff memo</p>
            <h3 className="text-xl font-semibold text-white">QA release recommendation</h3>
            <div className="mt-4 grid gap-4 text-sm text-slate-300 md:grid-cols-2">
              <div className="space-y-1 rounded-2xl border border-white/5 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Scope tested</p>
                <p>{releaseSignoffMemo.scopeTested}</p>
              </div>
              <div className="space-y-1 rounded-2xl border border-white/5 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Not tested</p>
                <p>{releaseSignoffMemo.notTested}</p>
              </div>
              <div className="space-y-1 rounded-2xl border border-white/5 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Defect summary</p>
                <p>{releaseSignoffMemo.defectSummary}</p>
              </div>
              <div className="space-y-1 rounded-2xl border border-white/5 bg-slate-900/60 p-4">
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Residual risks</p>
                <p>{releaseSignoffMemo.residualRisks}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-cyan-500/80 bg-cyan-500/10 px-4 py-1 text-xs font-semibold text-cyan-200">
                {releaseSignoffMemo.recommendation}
              </span>
              <p className="text-xs text-slate-400">Signed off {releaseSignoffMemo.signoffDate}</p>
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
