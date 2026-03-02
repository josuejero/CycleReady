import { useRef, useState, type ChangeEvent } from 'react';
import type { Activity, FileMetadata } from '../data/types';
import { formatDateTime } from '../utils/date';
import { formatFileSize } from '../utils/format';

interface UploadSimulatorProps {
  selectedActivity?: Activity;
  onSaveMetadata: (activityId: string, metadata: FileMetadata) => void;
}

export default function UploadSimulator({ selectedActivity, onSaveMetadata }: UploadSimulatorProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [uploaded, setUploaded] = useState<FileMetadata | null>(null);
  const [notice, setNotice] = useState<string>('Adding metadata keeps QA reminders green; files are not actually uploaded.');

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!selectedActivity || !file) {
      setNotice('Select an activity before attaching metadata.');
      return;
    }
    const metadata: FileMetadata = {
      fileName: file.name,
      fileType: file.type || 'application/octet-stream',
      sizeInBytes: file.size,
      uploadedAt: new Date().toISOString(),
      notes: 'Recorded via simulated upload control.'
    };
    setUploaded(metadata);
    setNotice('Metadata stored in localStorage for QA verification.');
    onSaveMetadata(selectedActivity.id, metadata);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/60">
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold uppercase tracking-wider text-cyan-300">Upload simulation</p>
        <h2 className="text-2xl font-semibold text-white">Attach documentation metadata</h2>
        <p className="text-sm text-slate-400">
          The uploader only records metadata (name/type/size/date) so QA can see the reminder rule fire. Files stay local.
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-4">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="inline-flex w-full items-center justify-center rounded-2xl border border-cyan-500/60 bg-cyan-500/30 px-4 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-100 transition hover:border-cyan-400/80 hover:bg-cyan-500/50"
        >
          Select a file for {selectedActivity ? selectedActivity.title : 'an activity'}
        </button>
        <input
          type="file"
          ref={inputRef}
          onChange={handleFileChange}
          className="hidden"
        />
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm text-slate-300">
          <p className="text-xs uppercase tracking-[0.4em] text-slate-500">Last metadata</p>
          {uploaded ? (
            <div className="mt-3 space-y-1">
              <p className="text-base font-semibold text-white">{uploaded.fileName}</p>
              <p className="text-xs text-slate-400">{uploaded.fileType} · {formatFileSize(uploaded.sizeInBytes)}</p>
              <p className="text-xs text-slate-500">{formatDateTime(uploaded.uploadedAt)} ET</p>
            </div>
          ) : selectedActivity?.metadata ? (
            <div className="mt-3 space-y-1">
              <p className="text-base font-semibold text-white">{selectedActivity.metadata.fileName}</p>
              <p className="text-xs text-slate-400">{selectedActivity.metadata.fileType} · {formatFileSize(selectedActivity.metadata.sizeInBytes)}</p>
              <p className="text-xs text-slate-500">{formatDateTime(selectedActivity.metadata.uploadedAt)} ET</p>
            </div>
          ) : (
            <p className="mt-3 text-xs text-slate-500">No metadata stored yet. A click here creates a QA playback artifact.</p>
          )}
        </div>
        <p className="text-xs text-slate-400">{notice}</p>
      </div>
    </section>
  );
}
