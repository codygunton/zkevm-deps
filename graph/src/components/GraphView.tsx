import {
  ReactFlow,
  Controls,
  Background,
  MiniMap,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useGraphData } from '../hooks/useGraphData';
import { useAutoSave } from '../hooks/useAutoSave';
import { isEditMode } from '../lib/mode';
import { defaultEdgeOptions } from '../lib/defaults';
import { GraphNode } from './GraphNode';
import { GraphToolbar } from './GraphToolbar';

const nodeTypes = { default: GraphNode };

interface Props {
  graphId: string;
}

export function GraphView({ graphId }: Props) {
  const { nodes, edges, meta, onNodesChange, onEdgesChange, onConnect, isLoading } =
    useGraphData(graphId);
  const saveStatus = useAutoSave(graphId, nodes, edges, meta);

  if (isLoading) {
    return <div className="graph-loading">Loading graph...</div>;
  }

  return (
    <div className="graph-container">
      <GraphToolbar meta={meta} saveStatus={saveStatus} />
      <div className="graph-canvas">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={isEditMode ? onNodesChange : undefined}
          onEdgesChange={isEditMode ? onEdgesChange : undefined}
          onConnect={isEditMode ? onConnect : undefined}
          nodeTypes={nodeTypes}
          nodesDraggable={isEditMode}
          nodesConnectable={isEditMode}
          defaultEdgeOptions={defaultEdgeOptions}
          fitView
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
}
