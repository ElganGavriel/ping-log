import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { authClient } from '../auth/auth-client';

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const tokenError = searchParams.get('error');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setSubmitting(true);
    const { error } = await authClient.resetPassword({ newPassword: password, token });
    setSubmitting(false);
    if (error) {
      setError(error.message ?? 'Failed to reset password.');
      return;
    }
    navigate('/login');
  };

  if (!token || tokenError) {
    return (
      <div className="container">
        <header>
          <h1>💩 Ping Log</h1>
        </header>
        <section className="card">
          <p className="subtitle">This reset link is invalid or has expired.</p>
          <p className="subtitle" style={{ marginTop: '1rem' }}>
            <Link to="/forgot-password">Request a new one</Link>
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>💩 Ping Log</h1>
        <p className="subtitle">Choose a new password.</p>
      </header>
      <section className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>
              New password
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
            {submitting ? 'Resetting...' : 'Reset password'}
          </button>
        </form>
      </section>
    </div>
  );
}
