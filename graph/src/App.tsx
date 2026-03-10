import { HashRouter, Routes, Route, useParams } from 'react-router-dom';
import { GraphIndex } from './components/GraphIndex';
import { GraphView } from './components/GraphView';
import './styles/graph.css';

function GraphPage() {
  const { id } = useParams<{ id: string }>();
  if (!id) return null;
  return <GraphView graphId={id} />;
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<GraphIndex />} />
        <Route path="/graph/:id" element={<GraphPage />} />
      </Routes>
    </HashRouter>
  );
}
