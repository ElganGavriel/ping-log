import { useState } from 'react';
import { Link } from 'react-router-dom';
import { authClient } from '../auth/auth-client';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const { error } = await authClient.requestPasswordReset({
      email,
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setSubmitting(false);
    if (error) {
      setError(error.message ?? 'Failed to send reset email.');
      return;
    }
    setSent(true);
  };

  return (
    <div className="container">
      <header>
        <h1>💩 Ping Log</h1>
        <p className="subtitle">Reset your password.</p>
      </header>
      <section className="card">
        {sent ? (
          <p className="subtitle">
            If that email is registered, a reset link is on its way. Check your inbox.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <label>
                Email
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </label>
            </div>
            {error && <p className="subtitle">{error}</p>}
            <button className="btn btn-start" type="submit" disabled={submitting}>
              {submitting ? 'Sending...' : 'Send reset link'}
            </button>
          </form>
        )}
        <p className="subtitle" style={{ marginTop: '1rem' }}>
          <Link to="/login">Back to sign in</Link>
        </p>
      </section>
    </div>
  );
}
