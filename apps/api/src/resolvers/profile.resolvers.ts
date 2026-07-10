import type { Resolvers } from '../generated/resolvers.generated.js';
import { Profile, type IProfile } from '../models/profile.model.js';
import { Company } from '../models/company.model.js';
import { computeEffectiveHourlyRate } from '../lib/wage.js';
import { requireProfile } from '../lib/auth-guards.js';
import { GraphQLError } from 'graphql';

export const profileResolvers: Resolvers = {
  Query: {
    me: async (_parent, _args, ctx) => {
      if (!ctx.userId) return null;
      return Profile.findOne({ userId: ctx.userId });
    },
  },
  Mutation: {
    updateProfile: async (_parent, { input }, ctx) => {
      const profile = await requireProfile(ctx);

      if (input.currency !== undefined && input.currency !== null) {
        profile.currency = input.currency;
      }
      if (input.wageMode !== undefined && input.wageMode !== null) {
        profile.wageMode = input.wageMode;
        if (input.wageMode === 'HOURLY') {
          profile.monthlySalary = null;
          profile.hoursPerWeek = null;
        } else if (input.wageMode === 'SALARY') {
          profile.hourlyWage = null;
        }
      }
      if (input.hourlyWage !== undefined && input.hourlyWage !== null) {
        profile.hourlyWage = input.hourlyWage;
      }
      if (input.monthlySalary !== undefined && input.monthlySalary !== null) {
        profile.monthlySalary = input.monthlySalary;
      }
      if (input.hoursPerWeek !== undefined && input.hoursPerWeek !== null) {
        profile.hoursPerWeek = input.hoursPerWeek;
      }

      await profile.save();
      return profile;
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
  Profile: {
    effectiveHourlyRate: (parent: IProfile) => computeEffectiveHourlyRate(parent),
    isReadyToTrack: (parent: IProfile) => Boolean(parent.wageMode && parent.currency),
    company: async (parent: IProfile) => {
      if (!parent.companyId) return null;
      return Company.findById(parent.companyId);
    },
  },
};

