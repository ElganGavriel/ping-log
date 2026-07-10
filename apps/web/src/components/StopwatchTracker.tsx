import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useCreatePoopSessionMutation, type MeQuery } from '../generated/graphql.generated';
import { formatMoney } from '../lib/currencies';

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
  const startRef = useRef<number | null>(null);
  const frameRef = useRef<number>();

  const [createPoopSession, { loading: saving }] = useCreatePoopSessionMutation({
    refetchQueries: ['MyPoopSessions', 'CompanyLeaderboard'],
    awaitRefetchQueries: true,
  });

  useEffect(() => {
    if (!running) return;
    const tick = () => {
      if (startRef.current !== null) {
        setElapsedMs(Date.now() - startRef.current);
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== undefined) cancelAnimationFrame(frameRef.current);
    };
  }, [running]);

  const elapsedSeconds = elapsedMs / 1000;
  const rate = me.effectiveHourlyRate ?? 0;
  const currency = me.currency ?? 'USD';
  const moneyEarned = (rate / 3600) * elapsedSeconds;

  const handleStart = () => {
    startRef.current = Date.now();
    setElapsedMs(0);
    setRunning(true);
  };

  const handleStop = async () => {
    setRunning(false);
    const durationSeconds = Math.round(elapsedSeconds);
    startRef.current = null;

    if (durationSeconds < 1) {
      setElapsedMs(0);
      return;
    }

    await createPoopSession({ variables: { input: { durationSeconds } } });
    setElapsedMs(0);
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
        <p className="commentary">{running ? getCommentary(elapsedSeconds) : 'Ready when you are.'}</p>
      </div>

      {!running ? (
        <button className="btn btn-start" onClick={handleStart}>
          💩 Start Session
        </button>
      ) : (
        <button className="btn btn-stop" onClick={handleStop} disabled={saving}>
          {saving ? 'Saving...' : '✅ Done, Cash Out'}
        </button>
      )}
    </section>
  );
}
