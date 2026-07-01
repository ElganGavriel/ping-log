import { useHelloQuery } from './generated/graphql.generated';

export default function App() {
  const { loading, error, data } = useHelloQuery();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container">
      <h1>Ping Log</h1>
      <p className="subtitle">{data?.hello}</p>
    </div>
  );
}
