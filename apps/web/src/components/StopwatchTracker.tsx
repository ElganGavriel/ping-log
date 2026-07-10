import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  useActivePoopSessionQuery,
  useStartPoopSessionMutation,
  useStopPoopSessionMutation,
  type MeQuery,
} from '../generated/graphql.generated';
import { formatMoney } from '../lib/currencies';

const MAX_SESSION_DURATION_SECONDS = 2 * 60 * 60;

const MILESTONES: [number, string][] = [
  [0, 'Just getting comfortable...'],
  [15, "Phone's out. This is happening."],
  [30, 'Scrolling commences.'],
  [60, 'One minute in. HR would be so proud.'],
  [120, "2 minutes. You've earned a sip of coffee."],
  [300, '5 minutes. Officially a meeting now.'],
  [600, '10 minutes. Might as well read a book.'],
  [900, "15 minutes. Someone's definitely knocking by now."],
  [1200, '20 minutes. Basically salaried for sitting.'],
  [1800, '30 minutes. Time to ask for a promotion.'],
  [3600, '1 HOUR. Legendary status achieved.'],
];

function getCommentary(seconds: number) {
  let msg = MILESTONES[0][1];
  for (const [threshold, text] of MILESTONES) {
    if (seconds >= threshold) msg = text;
  }
  return msg;
}

function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const s = Math.floor(totalSeconds % 60)
    .toString()
    .padStart(2, '0');
  return `${m}:${s}`;
}

interface Props {
  me: NonNullable<MeQuery['me']>;
}

export default function StopwatchTracker({ me }: Props) {
  const [running, setRunning] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number>();

  const { data: activeData } = useActivePoopSessionQuery({ fetchPolicy: 'network-only' });
  const [startPoopSession, { loading: starting }] = useStartPoopSessionMutation();
  const [stopPoopSession, { loading: stopping }] = useStopPoopSessionMutation({
    refetchQueries: ['MyPoopSessions', 'CompanyLeaderboard'],
    awaitRefetchQueries: true,
  });
  const saving = starting || stopping;

  useEffect(() => {
    const active = activeData?.activePoopSession;
    if (active && !running) {
      startRef.current = new Date(active.startedAt).getTime();
      setActiveSessionId(active.id);
      setRunning(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeData]);

  const stopSession = async (id: string) => {
    setRunning(false);
    startRef.current = null;
    setActiveSessionId(null);
    setElapsedMs(0);
    await stopPoopSession({ variables: { id } });
  };

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      if (startRef.current !== null) {
        const ms = Date.now() - startRef.current;
        setElapsedMs(ms);
        if (ms / 1000 >= MAX_SESSION_DURATION_SECONDS && activeSessionId) {
          void stopSession(activeSessionId);
          return;
        }
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, activeSessionId]);

  const elapsedSeconds = elapsedMs / 1000;
  const rate = me.effectiveHourlyRate ?? 0;
  const currency = me.currency ?? 'USD';
  const moneyEarned = (rate / 3600) * Math.min(elapsedSeconds, MAX_SESSION_DURATION_SECONDS);

  const handleStart = async () => {
    const { data } = await startPoopSession();
    const session = data?.startPoopSession;
    if (!session) return;
    startRef.current = new Date(session.startedAt).getTime();
    setActiveSessionId(session.id);
    setElapsedMs(Date.now() - startRef.current);
    setRunning(true);
  };

  const handleStop = () => {
    if (!activeSessionId) return;
    void stopSession(activeSessionId);
  };

  if (!me.isReadyToTrack) {
    return (
      <section className="card">
        <h2>🚽 Start Your Session</h2>
        <p className="subtitle">
          Set up your wage and currency in <Link to="/settings">Settings</Link> before you can start tracking.
        </p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>🚽 Start Your Session</h2>
      <div className="stopwatch">
        <div className="stopwatch-time">{formatClock(elapsedSeconds)}</div>
        <div className="stopwatch-money">{formatMoney(moneyEarned, currency, 4)}</div>
        <p className="commentary">
          {running
            ? elapsedSeconds >= MAX_SESSION_DURATION_SECONDS
              ? "Hit the 2-hour cap. Wrapping this up for you..."
              : getCommentary(elapsedSeconds)
            : 'Ready when you are.'}
        </p>
      </div>

      {!running ? (
        <button className="btn btn-start" onClick={handleStart} disabled={saving}>
          {starting ? 'Starting...' : '💩 Start Session'}
        </button>
      ) : (
        <button className="btn btn-stop" onClick={handleStop} disabled={saving}>
          {stopping ? 'Saving...' : '✅ Done, Cash Out'}
        </button>
      )}
    </section>
  );
}
