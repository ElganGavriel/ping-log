import { useMeQuery } from '../generated/graphql.generated';
import NavBar from '../components/NavBar';
import StopwatchTracker from '../components/StopwatchTracker';
import SessionHistory from '../components/SessionHistory';
import CompanyLeaderboard from '../components/CompanyLeaderboard';

export default function DashboardPage() {
  const { data, loading, error } = useMeQuery();

  if (loading && !data) {
    return (
      <div className="container">
        <p className="subtitle">Loading...</p>
      </div>
    );
  }

  if (error || !data?.me) {
    return (
      <div className="container">
        <p className="subtitle">Error loading your profile: {error?.message}</p>
      </div>
    );
  }

  const me = data.me;

  return (
    <div className="container">
      <NavBar displayName={me.displayName} />
      <header>
        <h1>💩 Ping Log</h1>
        <p className="subtitle">Track your bathroom breaks. Watch the company pay for it.</p>
      </header>

      <StopwatchTracker me={me} />

      <div className="grid">
        <SessionHistory />
        <CompanyLeaderboard hasCompany={Boolean(me.company)} />
      </div>
    </div>
  );
}
