import type { Resolvers } from '../generated/resolvers.generated.js';
import { PoopSession, type IPoopSession } from '../models/poop-session.model.js';
import { computeEffectiveHourlyRate } from '../lib/wage.js';
import { requireProfile, requireWageConfigured } from '../lib/auth-guards.js';

function toPoopSession(doc: IPoopSession) {
  return {
    id: doc._id.toString(),
    durationSeconds: doc.durationSeconds,
    hourlyRate: doc.hourlyRate,
    currency: doc.currency,
    moneyEarned: doc.moneyEarned,
    createdAt: doc.createdAt.toISOString(),
  };
}

export const poopSessionResolvers: Resolvers = {
  Query: {
    myPoopSessions: async (_parent, { limit }, ctx) => {
      const profile = await requireProfile(ctx);
      const docs = await PoopSession.find({ userId: profile.userId })
        .sort({ createdAt: -1 })
        .limit(limit ?? 20);
      return docs.map(toPoopSession);
    },
  },
  Mutation: {
    createPoopSession: async (_parent, { input }, ctx) => {
      const profile = await requireProfile(ctx);
      requireWageConfigured(profile);

      const hourlyRate = computeEffectiveHourlyRate(profile)!;
      const durationSeconds = Math.max(0, Math.round(input.durationSeconds));
      const moneyEarned = (hourlyRate / 3600) * durationSeconds;

      const doc = await PoopSession.create({
        userId: profile.userId,
        durationSeconds,
        hourlyRate,
        currency: profile.currency!,
        moneyEarned,
      });

      return toPoopSession(doc);
    },
  },
};
