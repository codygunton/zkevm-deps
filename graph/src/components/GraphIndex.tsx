import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchGraphIndex } from '../lib/api';

interface GraphEntry {
  id: string;
  title: string;
  description?: string;
}

export function GraphIndex() {
  const [graphs, setGraphs] = useState<GraphEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchGraphIndex().then((data) => {
      setGraphs(data.graphs);
      setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <div className="graph-loading">Loading graphs...</div>;
  }

  return (
    <div className="graph-index">
      <h1>Dependency Graphs</h1>
      <ul className="graph-index-list">
        {graphs.map((g) => (
          <li key={g.id}>
            <Link to={`/graph/${g.id}`}>
              <strong>{g.title}</strong>
              {g.description && <p>{g.description}</p>}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
