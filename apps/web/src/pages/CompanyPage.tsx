import { useState } from 'react';
import {
  useMeQuery,
  useCreateCompanyMutation,
  useJoinCompanyMutation,
  useLeaveCompanyMutation,
} from '../generated/graphql.generated';
import NavBar from '../components/NavBar';
import CompanyLeaderboard from '../components/CompanyLeaderboard';

export default function CompanyPage() {
  const { data, loading, refetch } = useMeQuery();
  const [createCompany, { loading: creating }] = useCreateCompanyMutation();
  const [joinCompany, { loading: joining }] = useJoinCompanyMutation();
  const [leaveCompany, { loading: leaving }] = useLeaveCompanyMutation();

  const [name, setName] = useState('');
  const [joinCode, setJoinCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (loading && !data) {
    return (
      <div className="container">
        <p className="subtitle">Loading...</p>
      </div>
    );
  }

  const me = data?.me;

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await createCompany({ variables: { input: { name } } });
      await refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create company.');
    }
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await joinCompany({ variables: { joinCode } });
      await refetch();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join company.');
    }
  };

  const handleLeave = async () => {
    await leaveCompany();
    await refetch();
  };

  return (
    <div className="container">
      <NavBar displayName={me?.displayName} />
      <header>
        <h1>🏢 Company</h1>
        <p className="subtitle">See how your time (and money) stacks up against coworkers.</p>
      </header>

      {me?.company ? (
        <section className="card">
          <h2>{me.company.name}</h2>
          <p className="subtitle">
            Share this code with coworkers: <strong>{me.company.joinCode}</strong>
          </p>
          <button className="btn btn-stop" onClick={handleLeave} disabled={leaving}>
            {leaving ? 'Leaving...' : 'Leave company'}
          </button>
        </section>
      ) : (
        <>
          <section className="card">
            <h2>Create a company</h2>
            <form onSubmit={handleCreate}>
              <div className="form-row">
                <label>
                  Company name
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
              </div>
              <button className="btn btn-start" type="submit" disabled={creating}>
                {creating ? 'Creating...' : 'Create company'}
              </button>
            </form>
          </section>

          <section className="card">
            <h2>Join with a code</h2>
            <form onSubmit={handleJoin}>
              <div className="form-row">
                <label>
                  Join code
                  <input
                    type="text"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="ABC123"
                    required
                  />
                </label>
              </div>
              <button className="btn btn-start" type="submit" disabled={joining}>
                {joining ? 'Joining...' : 'Join company'}
              </button>
            </form>
          </section>
        </>
      )}

      {error && <p className="subtitle">{error}</p>}

      <CompanyLeaderboard hasCompany={Boolean(me?.company)} />
    </div>
  );
}
