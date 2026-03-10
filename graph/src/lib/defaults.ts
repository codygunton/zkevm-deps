import type { DefaultEdgeOptions } from '@xyflow/react';
import { MarkerType } from '@xyflow/react';

export const defaultEdgeOptions: DefaultEdgeOptions = {
  type: 'default',
  animated: false,
  style: { stroke: '#64748b', strokeWidth: 2 },
  markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' },
};
