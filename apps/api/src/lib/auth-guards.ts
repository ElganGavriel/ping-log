import { GraphQLError } from 'graphql';
import type { GraphQLContext } from '../context.js';
import { Profile, type IProfile } from '../models/profile.model.js';

export function requireUserId(ctx: GraphQLContext): string {
  if (!ctx.userId) {
    throw new GraphQLError('You must be signed in.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  return ctx.userId;
}

export async function requireProfile(ctx: GraphQLContext): Promise<IProfile> {
  const userId = requireUserId(ctx);
  const profile = await Profile.findOne({ userId });
  if (!profile) {
    throw new GraphQLError('No profile found for this account.', {
      extensions: { code: 'UNAUTHENTICATED' },
    });
  }
  return profile;
}

export function requireWageConfigured(profile: IProfile): void {
  if (!profile.wageMode || !profile.currency) {
    throw new GraphQLError('Set up your wage and currency in Settings before tracking a session.', {
      extensions: { code: 'WAGE_NOT_CONFIGURED' },
    });
  }
}
