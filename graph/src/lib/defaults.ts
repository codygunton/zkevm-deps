import type { DefaultEdgeOptions } from '@xyflow/react';

export const statusColors: Record<string, string> = {
  'not-started': '#9ca3af',
  'in-progress': '#3b82f6',
  'blocked': '#ef4444',
  'complete': '#22c55e',
};

export const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'smoothstep',
  animated: false,
  style: { stroke: '#64748b', strokeWidth: 2 },
};
