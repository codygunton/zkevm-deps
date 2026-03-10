import { Handle, Position, type NodeProps } from '@xyflow/react';
import { statusColors } from '../lib/defaults';
import type { GraphNode as GraphNodeType } from '../types';

export function GraphNode({ data }: NodeProps<GraphNodeType>) {
  const borderColor = statusColors[data.status ?? 'not-started'] ?? statusColors['not-started'];

  return (
    <div className="graph-node" style={{ borderLeftColor: borderColor }}>
      <Handle type="target" position={Position.Top} />
      <div className="graph-node-label">
        {data.url ? (
          <a href={data.url} target="_blank" rel="noopener noreferrer">
            {data.label}
          </a>
        ) : (
          data.label
        )}
      </div>
      {data.description && (
        <div className="graph-node-description">{data.description}</div>
      )}
      {data.status && (
        <div className="graph-node-status" style={{ color: borderColor }}>
          {data.status}
        </div>
      )}
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
