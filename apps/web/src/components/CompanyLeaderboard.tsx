import { Link } from 'react-router-dom';
import { useCompanyLeaderboardQuery } from '../generated/graphql.generated';
import { formatMoney } from '../lib/currencies';

const MEDALS = ['🥇', '🥈', '🥉'];

function formatDuration(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  return h > 0 ? `${h}h ${m}m` : `${m}m`;
}

interface Props {
  hasCompany: boolean;
}

export default function CompanyLeaderboard({ hasCompany }: Props) {
  const { data, loading, error } = useCompanyLeaderboardQuery({
    variables: { limit: 10 },
    pollInterval: 4000,
    skip: !hasCompany,
  });

  if (!hasCompany) {
    return (
      <section className="card">
        <h2>🏆 Company Leaderboard</h2>
        <p className="subtitle">
          Join or create a company on the <Link to="/company">Company page</Link> to see how you stack up.
        </p>
      </section>
    );
  }

  const entries = data?.companyLeaderboard ?? [];

  return (
    <section className="card">
      <h2>🏆 Company Leaderboard</h2>
      {loading && !data && <p className="subtitle">Loading...</p>}
      {error && <p className="subtitle">Error: {error.message}</p>}
      {!loading && !error && entries.length === 0 && (
        <p className="subtitle">Nobody's tracked any time yet. Be the first.</p>
      )}
      {entries.length > 0 && (
        <ol className="leaderboard-list">
          {entries.map((entry, i) => (
            <li key={entry.userId}>
              <span className="rank">{MEDALS[i] ?? `#${i + 1}`}</span>
              <span className="session-name">{entry.displayName}</span>
              <span className="session-duration">{formatDuration(entry.totalDurationSeconds)}</span>
              <span className="session-money">{formatMoney(entry.totalMoneyEarned, entry.currency)}</span>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}
