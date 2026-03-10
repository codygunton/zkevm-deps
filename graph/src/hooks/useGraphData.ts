import { useState, useEffect, useCallback } from 'react';
import {
  useNodesState,
  useEdgesState,
  type OnConnect,
  type Connection,
} from '@xyflow/react';
import { fetchGraph } from '../lib/api';
import type { GraphNode, GraphEdge, GraphMeta } from '../types';

export function useGraphData(graphId: string) {
  const [nodes, setNodes, onNodesChange] = useNodesState<GraphNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<GraphEdge>([]);
  const [meta, setMeta] = useState<GraphMeta | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    fetchGraph(graphId).then((data) => {
      if (cancelled) return;
      setNodes(data.nodes);
      setEdges(data.edges);
      setMeta(data.meta);
      setIsLoading(false);
    });
    return () => { cancelled = true; };
  }, [graphId, setNodes, setEdges]);

  const onConnect: OnConnect = useCallback(
    (connection: Connection) => {
      const id = `e-${connection.source}-${connection.target}`;
      const newEdge: GraphEdge = {
        id,
        source: connection.source,
        target: connection.target,
        type: 'smoothstep',
        data: { label: 'blocks' },
      };
      setEdges((eds) => [...eds, newEdge]);
    },
    [setEdges],
  );

  return { nodes, edges, meta, onNodesChange, onEdgesChange, onConnect, isLoading };
}
