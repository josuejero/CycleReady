export type ReviewStatus = 'Accepted' | 'Pending Review' | 'Needs Correction' | 'Rejected';
export type Actor = 'Clinician' | 'Reviewer';

export interface FileMetadata {
  fileName: string;
  fileType: string;
  sizeInBytes: number;
  uploadedAt: string;
  notes?: string;
}

export interface ActivityTimelineEntry {
  id: string;
  actor: Actor;
  action: string;
  detail?: string;
  timestamp: string;
}

export interface Activity {
  id: string;
  title: string;
  provider: string;
  category: string;
  credits: number;
  completionDate: string;
  status: ReviewStatus;
  notes?: string;
  createdAt: string;
  timeline: ActivityTimelineEntry[];
  metadata?: FileMetadata;
  reviewerNote?: string;
}

export interface KeyDate {
  id: string;
  label: string;
  date: string;
  description: string;
  type: 'cycle' | 'milestone';
}

export interface DefectSummary {
  total: number;
  critical: number;
  lastUpdated: string;
}

export interface RawTimelineEntry extends Omit<ActivityTimelineEntry, 'id'> {}

export interface RawActivity extends Omit<Activity, 'timeline'> {
  timeline: RawTimelineEntry[];
}
