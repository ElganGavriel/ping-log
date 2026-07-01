import type { Resolvers } from '../generated/resolvers.generated';

export const resolvers: Resolvers = {
  Query: {
    hello: () => 'Hello from ping-log API!',
  },
};
