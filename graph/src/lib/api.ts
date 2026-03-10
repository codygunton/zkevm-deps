import { isEditMode } from './mode';
import type { GraphFile } from '../types';

const API_BASE = '/api';

interface GraphIndexEntry {
  id: string;
  title: string;
  description?: string;
}

interface GraphIndex {
  graphs: GraphIndexEntry[];
}

export async function fetchGraphIndex(): Promise<GraphIndex> {
  const url = isEditMode ? `${API_BASE}/graphs` : `${import.meta.env.BASE_URL}data/_index.json`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchGraph(id: string): Promise<GraphFile> {
  const url = isEditMode ? `${API_BASE}/graph/${id}` : `${import.meta.env.BASE_URL}data/${id}.json`;
  const res = await fetch(url);
  return res.json();
}

export async function saveGraph(id: string, data: GraphFile): Promise<void> {
  if (!isEditMode) return;
  await fetch(`${API_BASE}/graph/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
}
