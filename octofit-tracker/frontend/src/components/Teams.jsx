import { useEffect, useState } from 'react';
import { fetchFromApi } from '../api';

// API endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadTeams() {
      try {
        setLoading(true);
        const data = await fetchFromApi('teams');
        setTeams(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  if (loading) return <div className="alert alert-info">Loading teams...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1>Teams</h1>
      <div className="row">
        {teams.map(team => (
          <div key={team._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">
                  <strong>Description:</strong> {team.description}<br />
                  <strong>Members:</strong> {team.members?.length || 0}<br />
                  <strong>Total Points:</strong> {team.totalPoints}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {teams.length === 0 && <p>No teams found.</p>}
    </div>
  );
}
