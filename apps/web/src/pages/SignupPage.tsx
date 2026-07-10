import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { authClient, useSession } from '../auth/auth-client';

export default function SignupPage() {
  const { data, isPending } = useSession();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  if (!isPending && data?.session) return <Navigate to="/" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await authClient.signUp.email({ name, email, password });
    setSubmitting(false);
    if (error) {
      setError(error.message ?? 'Failed to sign up.');
      return;
    }
    navigate('/');
  };

  return (
    <div className="container">
      <header>
        <h1>💩 Ping Log</h1>
        <p className="subtitle">Create an account to start tracking.</p>
      </header>
      <section className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              Name
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </label>
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
                minLength={8}
                required
              />
            </label>
          </div>
          {error && <p className="subtitle">{error}</p>}
          <button className="btn btn-start" type="submit" disabled={submitting}>
            {submitting ? 'Signing up...' : 'Sign up'}
          </button>
        </form>
        <p className="subtitle" style={{ marginTop: '1rem' }}>
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </section>
    </div>
  );
}
