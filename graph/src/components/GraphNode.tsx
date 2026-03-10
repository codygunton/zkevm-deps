import { Handle, Position, type NodeProps } from '@xyflow/react';
import type { GraphNode as GraphNodeType } from '../types';

export function GraphNode({ data }: NodeProps<GraphNodeType>) {
  return (
    <div className="graph-node">
      <Handle type="target" position={Position.Left} />
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
      <Handle type="source" position={Position.Right} />
    </div>
  );
}
