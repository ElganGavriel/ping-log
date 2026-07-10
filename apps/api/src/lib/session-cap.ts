import { PoopSession, type IPoopSession } from '../models/poop-session.model.js';

export const MAX_SESSION_DURATION_SECONDS = 2 * 60 * 60;

async function closeSessionAtCap(doc: IPoopSession): Promise<void> {
  doc.endedAt = new Date(doc.startedAt.getTime() + MAX_SESSION_DURATION_SECONDS * 1000);
  doc.durationSeconds = MAX_SESSION_DURATION_SECONDS;
  doc.moneyEarned = (doc.hourlyRate / 3600) * MAX_SESSION_DURATION_SECONDS;
  await doc.save();
}

/**
 * Returns the caller's in-progress session, if any. A session left running
 * past the cap is auto-closed at the cap and treated as if none is active.
 */
export async function getActiveSession(userId: string): Promise<IPoopSession | null> {
  const active = await PoopSession.findOne({ userId, endedAt: null });
  if (!active) return null;

  const elapsedSeconds = (Date.now() - active.startedAt.getTime()) / 1000;
  if (elapsedSeconds >= MAX_SESSION_DURATION_SECONDS) {
    await closeSessionAtCap(active);
    return null;
  }
  return active;
}
