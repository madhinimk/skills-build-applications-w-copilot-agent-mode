import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Activities from './components/Activities.jsx'
import Leaderboard from './components/Leaderboard.jsx'
import Teams from './components/Teams.jsx'
import Users from './components/Users.jsx'
import Workouts from './components/Workouts.jsx'
import { apiBaseUrl, hasCodespaceName } from './api.js'

function App() {
  return (
    <div className="app-shell">
      <header className="navbar navbar-expand-lg border-bottom bg-white">
        <div className="container py-2">
          <NavLink className="navbar-brand fw-bold" to="/">
            <span className="brand-mark">O</span> OctoFit Tracker
          </NavLink>
          <nav className="d-flex flex-wrap gap-1" aria-label="Primary navigation">
            {[
              ['/', 'Overview'],
              ['/activities', 'Activities'],
              ['/leaderboard', 'Leaderboard'],
              ['/teams', 'Teams'],
              ['/users', 'Users'],
              ['/workouts', 'Workouts'],
            ].map(([path, label]) => (
              <NavLink
                key={path}
                to={path}
                end={path === '/'}
                className={({ isActive }) => `nav-link px-3 ${isActive ? 'active' : ''}`}
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="container py-4">
        {!hasCodespaceName && (
          <div className="alert alert-warning small" role="status">
            <strong>Local API mode:</strong> VITE_CODESPACE_NAME is not set. Requests use {apiBaseUrl}.
          </div>
        )}
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  )
}

function Dashboard() {
  return (
    <section className="dashboard-intro">
      <p className="eyebrow">PERSONAL PERFORMANCE HUB</p>
      <h1>Make your next move count.</h1>
      <p className="lead text-secondary">Track the people, teams, workouts, and activity that keep your community moving.</p>
      <div className="row g-3 mt-4">
        {[
          ['Activities', '/activities', 'Log and review recent movement.'],
          ['Leaderboard', '/leaderboard', 'See who is setting the pace.'],
          ['Workouts', '/workouts', 'Find your next challenge.'],
        ].map(([title, path, description]) => (
          <div className="col-md-4" key={path}>
            <NavLink to={path} className="quick-link d-block h-100">
              <span className="text-uppercase small text-secondary">Explore</span>
              <h2>{title}</h2>
              <p className="text-secondary mb-0">{description}</p>
            </NavLink>
          </div>
        ))}
      </div>
    </section>
  )
}

export default App
