import {
  getCoveragePercent,
  getSeverityCounts,
  groupDefectsByOwner,
  releaseDefects,
  releaseEvidenceLinks,
  releaseSignoffMemo,
  releaseStoryCoverage,
  releaseTests,
  severityBadge
} from '../data/release-room';

const testSummary = releaseTests.reduce(
  (acc, test) => {
    acc.passed += test.passed;
    acc.failed += test.failed;
    return acc;
  },
  { passed: 0, failed: 0 }
);

const COVERAGE_PERCENT = getCoveragePercent(releaseStoryCoverage);
const SEVERITY_COUNTS = getSeverityCounts(releaseDefects);
const DEFECTS_BY_OWNER = groupDefectsByOwner(releaseDefects);

export default function ReleaseSummaryPanel({ compact }: { compact?: boolean }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/80 to-slate-950/80 p-6 shadow-2xl shadow-slate-950/40">
      {!compact && (
        <header className="mb-6 space-y-2">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-cyan-300">Phase 8 Release Room</p>
          <h2 className="text-2xl font-semibold text-white">Release summary</h2>
          <p className="text-sm text-slate-300">Story coverage, test evidence, and open defects that influence the go/no-go recommendation.</p>
        </header>
      )}

      <div className="grid gap-4 md:grid-cols-3">
        <article className="space-y-2 rounded-2xl border border-white/5 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Story coverage</p>
          <p className="text-4xl font-semibold text-white">{COVERAGE_PERCENT}%</p>
          <p className="text-xs text-slate-400">
            {releaseStoryCoverage.qaReviewedStories} of {releaseStoryCoverage.totalStories} QA-reviewed stories
          </p>
        </article>
        <article className="space-y-2 rounded-2xl border border-white/5 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Tests (pass/fail)</p>
          <p className="text-4xl font-semibold text-white">
            {testSummary.passed}/{testSummary.passed + testSummary.failed}
          </p>
          <p className="text-xs text-slate-400">{testSummary.failed} tests failed</p>
        </article>
        <article className="space-y-2 rounded-2xl border border-white/5 bg-white/5 p-4">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Open defects</p>
          <p className="text-4xl font-semibold text-white">{releaseDefects.length}</p>
          <div className="grid grid-cols-3 gap-2 text-xs text-slate-300">
            <span className="text-emerald-200">Sev1 {SEVERITY_COUNTS.sev1}</span>
            <span className="text-amber-200">Sev2 {SEVERITY_COUNTS.sev2}</span>
            <span className="text-sky-200">Sev3 {SEVERITY_COUNTS.sev3}</span>
          </div>
        </article>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <div className="space-y-2 rounded-2xl border border-white/5 bg-slate-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Blockers by owner</p>
          <div className="space-y-3">
            {Object.entries(DEFECTS_BY_OWNER).map(([owner, defects]) => (
              <div key={owner} className="space-y-1">
                <p className="text-sm font-semibold text-white">{owner}</p>
                <div className="space-y-1 text-xs text-slate-300">
                  {defects.map((defect) => {
                    const badge = severityBadge(defect.severity);
                    return (
                      <p key={defect.id}>
                        <span className={`mr-2 inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${badge.color}`}>
                          {badge.label}
                        </span>
                        <span>{defect.title}</span>
                        <span className="text-slate-500"> · {defect.status}</span>
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-2 rounded-2xl border border-white/5 bg-slate-950/60 p-4">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Recommendation</p>
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-cyan-500/80 bg-cyan-500/10 px-3 py-1 text-sm font-semibold text-cyan-200">{releaseSignoffMemo.recommendation}</span>
            <p className="text-xs text-slate-300">{releaseSignoffMemo.rationale ?? 'Ship once remaining blockers have assigned owners and triage notes.'}</p>
          </div>
        </div>
      </div>

      {!compact && (
        <div className="mt-6 space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-400">Evidence links</p>
          <div className="grid gap-3 md:grid-cols-2">
            {releaseEvidenceLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between rounded-2xl border border-white/5 bg-slate-900/60 p-4 text-left text-sm text-slate-300 transition hover:border-cyan-500/50"
              >
                <div>
                  <p className="text-white">{link.label}</p>
                  <p className="text-xs text-slate-400">{link.description}</p>
                </div>
                <span className="text-xs font-semibold text-slate-400">↗</span>
              </a>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
