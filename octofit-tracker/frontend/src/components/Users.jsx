import { useEffect, useState } from 'react';
import { fetchFromApi } from '../api';

// API endpoint: https://${VITE_CODESPACE_NAME}-8000.app.github.dev/api/users

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
        const data = await fetchFromApi('users');
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  if (loading) return <div className="alert alert-info">Loading users...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1>Users</h1>
      <div className="row">
        {users.map(user => (
          <div key={user._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{user.displayName}</h5>
                <p className="card-text">
                  <strong>Username:</strong> {user.username}<br />
                  <strong>Email:</strong> {user.email}<br />
                  <strong>Points:</strong> {user.points}
                </p>
                {user.bio && <p className="card-text"><em>{user.bio}</em></p>}
              </div>
            </div>
          </div>
        ))}
      </div>
      {users.length === 0 && <p>No users found.</p>}
    </div>
  );
}
