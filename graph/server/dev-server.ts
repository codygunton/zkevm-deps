import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

const app = express();
const PORT = 3001;
const DATA_DIR = join(process.cwd(), 'data');

app.use(cors());
app.use(express.json({ limit: '5mb' }));

app.get('/api/graphs', (_req, res) => {
  const index = readFileSync(join(DATA_DIR, '_index.json'), 'utf-8');
  res.json(JSON.parse(index));
});

app.get('/api/graph/:id', (req, res) => {
  const { id } = req.params;
  if (!/^[a-z0-9-]+$/.test(id)) {
    res.status(400).json({ error: 'Invalid graph id' });
    return;
  }
  try {
    const data = readFileSync(join(DATA_DIR, `${id}.json`), 'utf-8');
    res.json(JSON.parse(data));
  } catch {
    res.status(404).json({ error: 'Graph not found' });
  }
});

app.put('/api/graph/:id', (req, res) => {
  const { id } = req.params;
  if (!/^[a-z0-9-]+$/.test(id)) {
    res.status(400).json({ error: 'Invalid graph id' });
    return;
  }
  const data = req.body;
  data.meta.lastModified = new Date().toISOString();
  writeFileSync(join(DATA_DIR, `${id}.json`), JSON.stringify(data, null, 2) + '\n');
  res.json({ ok: true });
});

app.listen(PORT, () => {
  console.log(`Dev server running on http://localhost:${PORT}`);
});
