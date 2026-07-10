import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import type { Db, MongoClient } from 'mongodb';
import { Profile } from '../models/profile.model.js';

export function createAuth(db: Db, client: MongoClient) {
  return betterAuth({
    database: mongodbAdapter(db, { client }),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL ?? `http://localhost:${process.env.PORT ?? 4000}`,
    trustedOrigins: [process.env.CORS_ORIGIN ?? 'http://localhost:3000'],
    emailAndPassword: { enabled: true },
    databaseHooks: {
      user: {
        create: {
          after: async (user) => {
            await Profile.create({
              userId: user.id,
              displayName: user.name || user.email,
              email: user.email,
              currency: null,
              wageMode: null,
              hourlyWage: null,
              monthlySalary: null,
              hoursPerWeek: null,
              companyId: null,
            });
          },
        },
      },
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;
