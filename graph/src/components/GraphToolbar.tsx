import { Link } from 'react-router-dom';
import { isEditMode } from '../lib/mode';
import type { SaveStatus } from '../hooks/useAutoSave';
import type { GraphMeta } from '../types';

interface Props {
  meta: GraphMeta | null;
  saveStatus: SaveStatus;
}

const statusLabel: Record<SaveStatus, string> = {
  saved: 'Saved',
  saving: 'Saving...',
  unsaved: 'Unsaved',
};

export function GraphToolbar({ meta, saveStatus }: Props) {
  return (
    <div className="graph-toolbar">
      <Link to="/" className="graph-toolbar-back">&larr; Graphs</Link>
      <span className="graph-toolbar-title">{meta?.title ?? 'Loading...'}</span>
      {isEditMode && (
        <span className={`graph-toolbar-status graph-toolbar-status--${saveStatus}`}>
          {statusLabel[saveStatus]}
        </span>
      )}
    </div>
  );
}
