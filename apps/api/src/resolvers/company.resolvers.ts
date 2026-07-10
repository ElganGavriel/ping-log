import { GraphQLError } from 'graphql';
import type { Resolvers } from '../generated/resolvers.generated.js';
import { Company } from '../models/company.model.js';
import { Profile } from '../models/profile.model.js';
import { PoopSession } from '../models/poop-session.model.js';
import { requireProfile } from '../lib/auth-guards.js';
import { generateUniqueJoinCode } from '../lib/join-code.js';

export const companyResolvers: Resolvers = {
  Query: {
    companyLeaderboard: async (_parent, { limit }, ctx) => {
      const profile = await requireProfile(ctx);
      if (!profile.companyId) {
        throw new GraphQLError('You are not in a company yet.', {
          extensions: { code: 'NOT_IN_COMPANY' },
        });
      }

      const members = await Profile.find({ companyId: profile.companyId }).select(
        'userId displayName currency',
      );

      const totals = await PoopSession.aggregate([
        { $match: { userId: { $in: members.map((m) => m.userId) }, endedAt: { $ne: null } } },
        {
          $group: {
            _id: '$userId',
            totalDurationSeconds: { $sum: '$durationSeconds' },
            totalMoneyEarned: { $sum: '$moneyEarned' },
          },
        },
      ]);

      const totalsByUserId = new Map(totals.map((t) => [t._id as string, t]));

      const entries = members.map((member) => {
        const totals = totalsByUserId.get(member.userId);
        return {
          userId: member.userId,
          displayName: member.displayName,
          totalDurationSeconds: totals?.totalDurationSeconds ?? 0,
          totalMoneyEarned: totals?.totalMoneyEarned ?? 0,
          currency: member.currency ?? 'USD',
        };
      });

      entries.sort((a, b) => b.totalDurationSeconds - a.totalDurationSeconds);

      return typeof limit === 'number' ? entries.slice(0, limit) : entries;
    },
  },
  Mutation: {
    createCompany: async (_parent, { input }, ctx) => {
      const profile = await requireProfile(ctx);
      const joinCode = await generateUniqueJoinCode();
      const company = await Company.create({
        name: input.name.trim(),
        joinCode,
        createdByUserId: profile.userId,
      });
      profile.companyId = company._id;
      await profile.save();
      return company;
    },
    joinCompany: async (_parent, { joinCode }, ctx) => {
      const profile = await requireProfile(ctx);
      const company = await Company.findOne({ joinCode: joinCode.trim().toUpperCase() });
      if (!company) {
        throw new GraphQLError('No company found with that code.', {
          extensions: { code: 'INVALID_JOIN_CODE' },
        });
      }
      profile.companyId = company._id;
      await profile.save();
      return profile;
    },
    leaveCompany: async (_parent, _args, ctx) => {
      const profile = await requireProfile(ctx);
      profile.companyId = null;
      await profile.save();
      return profile;
    },
  },
};
