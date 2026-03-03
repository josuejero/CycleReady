export type ReleaseStoryCoverage = {
  totalStories: number;
  qaReviewedStories: number;
};

export type ReleaseTestResult = {
  name: string;
  passed: number;
  failed: number;
};

export type ReleaseEvidenceLink = {
  label: string;
  description: string;
  href: string;
};

export type ReleaseDefect = {
  id: string;
  title: string;
  severity: 'Sev1 - Blocker' | 'Sev2 - Critical' | 'Sev3 - Major';
  owner: string;
  status: string;
  nextStep: string;
  link: string;
};

export type ReleaseSignoffMemo = {
  scopeTested: string;
  notTested: string;
  defectSummary: string;
  residualRisks: string;
  rationale: string;
  recommendation: 'Ship' | 'Do Not Ship';
  signoffDate: string;
};

const basePath = import.meta.env.BASE_URL ?? '/';
const normalizedBase = basePath.endsWith('/') ? basePath : `${basePath}/`;

export const releaseStoryCoverage: ReleaseStoryCoverage = {
  totalStories: 10,
  qaReviewedStories: 9
};

export const releaseTests: ReleaseTestResult[] = [
  {
    name: 'Playwright smoke suite',
    passed: 4,
    failed: 0
  }
];

export const releaseDefects: ReleaseDefect[] = [
  {
    id: 'CR-401',
    title: 'Overdue reminder never clears after metadata upload',
    severity: 'Sev1 - Blocker',
    owner: 'Release QA Lead',
    status: 'Investigating fix',
    nextStep: 'Revisit reminder flag logic after metadata contract is updated',
    link: 'https://github.com/josuejero/CycleReady/issues/401'
  },
  {
    id: 'CR-312',
    title: 'Reviewer notes not saving when reviewer updated status',
    severity: 'Sev2 - Critical',
    owner: 'Reviewer Services',
    status: 'Under fix',
    nextStep: 'Patch reviewer panel save payload and rerun UI smoke tests',
    link: 'https://github.com/josuejero/CycleReady/issues/312'
  },
  {
    id: 'CR-287',
    title: 'Defect board missing owner tag on reopened cards',
    severity: 'Sev2 - Critical',
    owner: 'Release QA Lead',
    status: 'Needs triage',
    nextStep: 'Assign owner metadata before refreshing board view',
    link: 'https://github.com/josuejero/CycleReady/issues/287'
  }
];

export const releaseEvidenceLinks: ReleaseEvidenceLink[] = [
  {
    label: 'Phase 5 UAT plan',
    description: 'Describes scope, personas, scripts, and entry/exit criteria for Phase 5.',
    href: 'docs/uat-plan.md'
  },
  {
    label: 'Phase 5 UAT results log',
    description: 'Documents actual outcomes, defect references, and retest notes.',
    href: 'docs/uat-results.md'
  },
  {
    label: 'Playwright smoke report',
    description: 'Pass/fail proof from automated suite (see playwright-report/index.html).',
    href: 'playwright-report/index.html'
  },
  {
    label: 'Triage guidelines',
    description: 'Explains how to keep defect metadata and release blockers current.',
    href: 'docs/triage-guidelines.md'
  }
];

export const releasePacketPdfHref = `${normalizedBase}assets/cycleready-uat-packet.pdf`;

export const releaseSummaryPageHref = `${normalizedBase}release-summary.html`;
export const releaseRoomPageHref = `${normalizedBase}release-room.html`;

export const releaseSignoffMemo: ReleaseSignoffMemo = {
  scopeTested:
    'Dashboard readiness metrics, CME logging, reader history, reminders, reviewer transitions, seeded metadata uploads, and Phase 5 UAT scripts.',
  notTested:
    'Live integrations (GitHub issue APIs), actual clinician accounts, and production databases were not available in this static proof-of-concept.',
  defectSummary:
    'Critical reminders or reviewer-save regressions remain (see GitHub issues 401 & 312) but do not block the core remediation workflow.',
  residualRisks:
    'Reminder logic and reviewer metadata saving are still in flux; these risks are documented in the defect board and tracked via triage meetings.',
  rationale:
    'Coverage stands at 90% with zero automation regressions, so ship once Sev1 entry 401 is confirmed with triage markers.',
  recommendation: 'Ship',
  signoffDate: 'March 3, 2026'
};

export function getCoveragePercent(coverage: ReleaseStoryCoverage) {
  if (coverage.totalStories === 0) return 0;
  return Math.round((coverage.qaReviewedStories / coverage.totalStories) * 100);
}

export function getSeverityCounts(defects: ReleaseDefect[]) {
  return defects.reduce(
    (counts, defect) => {
      if (defect.severity.startsWith('Sev1')) counts.sev1 += 1;
      if (defect.severity.startsWith('Sev2')) counts.sev2 += 1;
      if (defect.severity.startsWith('Sev3')) counts.sev3 += 1;
      return counts;
    },
    { sev1: 0, sev2: 0, sev3: 0 }
  );
}

export function groupDefectsByOwner(defects: ReleaseDefect[]) {
  return defects.reduce<Record<string, ReleaseDefect[]>>((grouped, defect) => {
    if (!grouped[defect.owner]) {
      grouped[defect.owner] = [];
    }
    grouped[defect.owner].push(defect);
    return grouped;
  }, {});
}

export function severityBadge(severity: ReleaseDefect['severity']) {
  if (severity.startsWith('Sev1')) {
    return { label: 'Sev1', color: 'bg-rose-500/10 text-rose-200 border-rose-500/40' };
  }
  if (severity.startsWith('Sev2')) {
    return { label: 'Sev2', color: 'bg-amber-500/10 text-amber-200 border-amber-500/40' };
  }
  return { label: 'Sev3', color: 'bg-cyan-500/10 text-cyan-200 border-cyan-500/40' };
}
