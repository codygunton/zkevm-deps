import type { Node, Edge } from '@xyflow/react';

export interface GraphNodeData {
  label: string;
  description?: string;
  status?: 'not-started' | 'in-progress' | 'blocked' | 'complete';
  url?: string;
  [key: string]: unknown;
}

export interface GraphEdgeData {
  label?: string;
  [key: string]: unknown;
}

export type GraphNode = Node<GraphNodeData>;
export type GraphEdge = Edge<GraphEdgeData>;

export interface GraphMeta {
  id: string;
  title: string;
  description?: string;
  lastModified?: string;
}

export interface GraphFile {
  meta: GraphMeta;
  nodes: GraphNode[];
  edges: GraphEdge[];
}
