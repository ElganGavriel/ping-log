import { Link, useNavigate } from 'react-router-dom';
import { authClient } from '../auth/auth-client';

export default function NavBar({ displayName }: { displayName?: string }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await authClient.signOut();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Link to="/">Dashboard</Link>
        <Link to="/settings">Settings</Link>
        <Link to="/company">Company</Link>
      </div>
      <div className="navbar-user">
        {displayName && <span className="subtitle">{displayName}</span>}
        <button className="btn-link" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </nav>
  );
}
