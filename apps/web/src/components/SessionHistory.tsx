import { useMyPoopSessionsQuery } from '../generated/graphql.generated';
import { formatMoney } from '../lib/currencies';

function formatDuration(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}m ${s}s`;
}

export default function SessionHistory() {
  const { data, loading, error } = useMyPoopSessionsQuery({
    variables: { limit: 20 },
    fetchPolicy: 'cache-and-network',
  });

  const sessions = data?.myPoopSessions ?? [];

  return (
    <section className="card">
      <h2>📜 Recent Sessions</h2>
      {loading && !data && <p className="subtitle">Loading...</p>}
      {error && <p className="subtitle">Error: {error.message}</p>}
      {!loading && !error && sessions.length === 0 && (
        <p className="subtitle">No sessions yet. Go make some money.</p>
      )}
      {sessions.length > 0 && (
        <ul className="session-list">
          {sessions.map((s) => (
            <li key={s.id}>
              <span className="session-duration">{formatDuration(s.durationSeconds)}</span>
              <span className="session-money">{formatMoney(s.moneyEarned, s.currency)}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
