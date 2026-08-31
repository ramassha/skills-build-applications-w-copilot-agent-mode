import { useEffect, useState } from 'react';
import { fetchFromApi } from '../api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        setLoading(true);
        const data = await fetchFromApi('workouts');
        setWorkouts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  if (loading) return <div className="alert alert-info">Loading workouts...</div>;
  if (error) return <div className="alert alert-danger">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h1>Workout Plans</h1>
      <div className="row">
        {workouts.map(workout => (
          <div key={workout._id} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{workout.name}</h5>
                <p className="card-text">
                  <strong>Difficulty:</strong>{' '}
                  <span className={`badge ${
                    workout.difficulty === 'beginner' ? 'bg-success' :
                    workout.difficulty === 'intermediate' ? 'bg-warning' :
                    'bg-danger'
                  }`}>
                    {workout.difficulty}
                  </span><br />
                  <strong>Duration:</strong> {workout.duration} min<br />
                  <strong>Exercises:</strong> {workout.exercises?.length || 0}
                </p>
                <p className="card-text"><small>{workout.description}</small></p>
              </div>
            </div>
          </div>
        ))}
      </div>
      {workouts.length === 0 && <p>No workout plans found.</p>}
    </div>
  );
}
