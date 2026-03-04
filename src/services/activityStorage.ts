import type { Activity } from '../data/types';

const STORAGE_KEY = 'cycleready:v3:activities';
const isBrowser = typeof window !== 'undefined';

export function readStoredActivities(): Activity[] | null {
  if (!isBrowser) return null;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as Activity[];
  } catch (error) {
    console.error('Failed to parse stored activities', error);
    return null;
  }
}

export function persistActivities(activities: Activity[]): void {
  if (!isBrowser) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(activities));
}
