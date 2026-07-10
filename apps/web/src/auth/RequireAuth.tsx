import { Navigate } from 'react-router-dom';
import { useSession } from './auth-client';

export default function RequireAuth({ children }: { children: React.ReactNode }) {
  const { data, isPending } = useSession();

  if (isPending) return <p className="subtitle">Loading...</p>;
  if (!data?.session) return <Navigate to="/login" replace />;

  return <>{children}</>;
}
