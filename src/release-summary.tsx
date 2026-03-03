import React from 'react';
import ReactDOM from 'react-dom/client';
import ReleaseSummaryPanel from './components/ReleaseSummaryPanel';
import { releaseRoomPageHref, releasePacketPdfHref } from './data/release-room';
import './index.css';

function ReleaseSummaryPage() {
  const basePath = import.meta.env.BASE_URL ?? '/';
  const releaseRoomHref = releaseRoomPageHref;
  const liveAppHref = basePath;

  return (
    <main className="min-h-screen bg-slate-950 py-10 text-slate-100">
      <div className="mx-auto flex max-w-5xl flex-col gap-8 px-4">
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300">Phase 8 Release Room</p>
          <h1 className="text-4xl font-semibold text-white">Release summary</h1>
          <p className="text-sm text-slate-400">
            Story coverage, automation results, and the remaining blockers that feed the go/no-go recommendation for this release.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href={releaseRoomHref}
              className="rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-300"
            >
              Open release room
            </a>
            <a
              href={liveAppHref}
              className="rounded-full border border-amber-500/40 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-100 transition hover:border-amber-300"
            >
              Live app
            </a>
            <a
              href={releasePacketPdfHref}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-cyan-500/40 bg-slate-900 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300"
            >
              Download UAT packet
            </a>
          </div>
        </header>
        <ReleaseSummaryPanel />
      </div>
    </main>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReleaseSummaryPage />
  </React.StrictMode>
);
