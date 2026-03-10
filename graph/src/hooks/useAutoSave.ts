import { useEffect, useRef, useState } from 'react';
import { isEditMode } from '../lib/mode';
import { saveGraph } from '../lib/api';
import type { GraphNode, GraphEdge, GraphMeta } from '../types';

export type SaveStatus = 'saved' | 'saving' | 'unsaved';

export function useAutoSave(
  graphId: string,
  nodes: GraphNode[],
  edges: GraphEdge[],
  meta: GraphMeta | null,
) {
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('saved');
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (!isEditMode || !meta) return;
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    setSaveStatus('unsaved');
    clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      setSaveStatus('saving');
      await saveGraph(graphId, { meta, nodes, edges });
      setSaveStatus('saved');
    }, 500);

    return () => clearTimeout(timeoutRef.current);
  }, [graphId, nodes, edges, meta]);

  return saveStatus;
}
