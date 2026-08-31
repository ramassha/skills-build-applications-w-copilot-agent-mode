import { useEffect, useState } from 'react';
import { fetchFromApi } from '../api';

// API endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        setLoading(true);
        const data = await fetchFromApi('leaderboard');
        setLeaderboard(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  if (loading) return <div className="alert alert-info">Loading leaderboard...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1>Leaderboard</h1>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>Rank</th>
            <th>Username</th>
            <th>Points</th>
            <th>Total Activities</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((entry, index) => (
            <tr key={entry._id}>
              <td>
                {entry.rank === 1 && <span className="badge bg-warning">🥇</span>}
                {entry.rank === 2 && <span className="badge bg-secondary">🥈</span>}
                {entry.rank === 3 && <span className="badge bg-danger">🥉</span>}
                {entry.rank > 3 && entry.rank}
              </td>
              <td><strong>{entry.username}</strong></td>
              <td>{entry.totalPoints}</td>
              <td>{entry.totalActivities}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {leaderboard.length === 0 && <p>No leaderboard data available.</p>}
    </div>
  );
}
