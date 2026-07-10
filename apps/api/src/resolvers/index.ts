import type { Resolvers } from '../generated/resolvers.generated.js';
import { profileResolvers } from './profile.resolvers.js';
import { companyResolvers } from './company.resolvers.js';
import { poopSessionResolvers } from './poop-session.resolvers.js';

export const resolvers: Resolvers = {
  Query: {
    hello: () => 'Hello from ping-log API!',
    ...profileResolvers.Query,
    ...companyResolvers.Query,
    ...poopSessionResolvers.Query,
  },
  Mutation: {
    ...profileResolvers.Mutation,
    ...companyResolvers.Mutation,
    ...poopSessionResolvers.Mutation,
  },
  Profile: profileResolvers.Profile,
};
