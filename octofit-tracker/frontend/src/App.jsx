import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { API_BASE_URL } from './api';
import Users from './components/Users';
import Teams from './components/Teams';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Workouts from './components/Workouts';
import './App.css';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              🏋️ Octofit Tracker
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link" to="/">
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/users">
                    Users
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/teams">
                    Teams
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/activities">
                    Activities
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/leaderboard">
                    Leaderboard
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/workouts">
                    Workouts
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <main className="flex-grow-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </main>

        <footer className="bg-dark text-white text-center py-3 mt-4">
          <div className="container-fluid">
            <p className="mb-1">Octofit Tracker - Multi-tier Application</p>
            <small>API Base URL: <code>{API_BASE_URL}</code></small>
          </div>
        </footer>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h1 className="mb-4">🏋️ Welcome to Octofit Tracker</h1>
          <p className="lead mb-4">
            Track your fitness activities, join teams, and compete on the leaderboard!
          </p>
          
          <div className="row g-4 mb-5">
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">👥 Users</h5>
                  <p className="card-text">View all registered users and their profiles</p>
                  <Link to="/users" className="btn btn-primary btn-sm">View Users</Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">🏆 Leaderboard</h5>
                  <p className="card-text">Check the competitive rankings</p>
                  <Link to="/leaderboard" className="btn btn-success btn-sm">View Leaderboard</Link>
                </div>
              </div>
            </div>
            
            <div className="col-md-4">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">⚡ Activities</h5>
                  <p className="card-text">Track fitness activities and progress</p>
                  <Link to="/activities" className="btn btn-info btn-sm">View Activities</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="alert alert-info">
            <strong>Configuration:</strong><br />
            The frontend is configured to connect to the backend API. 
            Make sure your backend is running on port 8000.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
