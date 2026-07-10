import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { authClient, useSession } from '../auth/auth-client';

export default function LoginPage() {
  const { data, isPending } = useSession();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isPending && data?.session) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await authClient.signIn.email({ email, password });
    setSubmitting(false);
    if (error) {
      setError(error.message ?? 'Failed to sign in.');
      return;
    }
    navigate('/');
  };

  return (
    <div className="container">
      <header>
        <h1>💩 Ping Log</h1>
        <p className="subtitle">Sign in to start tracking.</p>
      </header>
      <section className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          {error && <p className="subtitle">{error}</p>}
          <button className="btn btn-start" type="submit" disabled={submitting}>
            {submitting ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        <p className="subtitle" style={{ marginTop: '1rem' }}>
          No account yet? <Link to="/signup">Sign up</Link>
        </p>
        <p className="subtitle" style={{ marginTop: '0.5rem' }}>
          <Link to="/forgot-password">Forgot your password?</Link>
        </p>
      </section>
    </div>
  );
}
