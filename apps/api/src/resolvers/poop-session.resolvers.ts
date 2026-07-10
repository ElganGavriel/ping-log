import { GraphQLError } from 'graphql';
import type { Resolvers } from '../generated/resolvers.generated.js';
import { PoopSession, type IPoopSession } from '../models/poop-session.model.js';
import { computeEffectiveHourlyRate } from '../lib/wage.js';
import { requireProfile, requireWageConfigured } from '../lib/auth-guards.js';
import { getActiveSession, MAX_SESSION_DURATION_SECONDS } from '../lib/session-cap.js';

function toPoopSession(doc: IPoopSession) {
  return {
    id: doc._id.toString(),
    durationSeconds: doc.durationSeconds!,
    hourlyRate: doc.hourlyRate,
    currency: doc.currency,
    moneyEarned: doc.moneyEarned!,
    createdAt: doc.createdAt.toISOString(),
  };
}

function toActiveSession(doc: IPoopSession) {
  return {
    id: doc._id.toString(),
    startedAt: doc.startedAt.toISOString(),
    hourlyRate: doc.hourlyRate,
    currency: doc.currency,
  };
}

export const poopSessionResolvers: Resolvers = {
  Query: {
    myPoopSessions: async (_parent, { limit }, ctx) => {
      const profile = await requireProfile(ctx);
      const docs = await PoopSession.find({ userId: profile.userId, endedAt: { $ne: null } })
        .sort({ createdAt: -1 })
        .limit(limit ?? 20);
      return docs.map(toPoopSession);
    },
    activePoopSession: async (_parent, _args, ctx) => {
      const profile = await requireProfile(ctx);
      const active = await getActiveSession(profile.userId);
      return active ? toActiveSession(active) : null;
    },
  },
  Mutation: {
    startPoopSession: async (_parent, _args, ctx) => {
      const profile = await requireProfile(ctx);
      requireWageConfigured(profile);

      const existing = await getActiveSession(profile.userId);
      if (existing) return toActiveSession(existing);

      const hourlyRate = computeEffectiveHourlyRate(profile)!;
      const doc = await PoopSession.create({
        userId: profile.userId,
        startedAt: new Date(),
        endedAt: null,
        durationSeconds: null,
        hourlyRate,
        currency: profile.currency!,
        moneyEarned: null,
      });

      return toActiveSession(doc);
    },
    stopPoopSession: async (_parent, { id }, ctx) => {
      const profile = await requireProfile(ctx);

      const doc = await PoopSession.findOne({ _id: id, userId: profile.userId, endedAt: null });
      if (!doc) {
        throw new GraphQLError('No active session found with that id.', {
          extensions: { code: 'SESSION_NOT_FOUND' },
        });
      }

      const elapsedSeconds = (Date.now() - doc.startedAt.getTime()) / 1000;
      const durationSeconds = Math.min(Math.max(0, Math.round(elapsedSeconds)), MAX_SESSION_DURATION_SECONDS);

      doc.endedAt = new Date();
      doc.durationSeconds = durationSeconds;
      doc.moneyEarned = (doc.hourlyRate / 3600) * durationSeconds;
      await doc.save();

      return toPoopSession(doc);
    },
  },
};
