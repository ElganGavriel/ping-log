import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import mongoose from 'mongoose';
import { toNodeHandler, fromNodeHeaders } from 'better-auth/node';
import { typeDefs } from './schema/typeDefs.js';
import { resolvers } from './resolvers/index.js';
import { createAuth } from './auth/auth.js';
import type { GraphQLContext } from './context.js';

const PORT = process.env.PORT ?? 4000;
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/ping-log';
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:3000';

async function start() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  if (!mongoose.connection.db) {
    throw new Error('Mongo connection has no db handle');
  }
  const auth = createAuth(mongoose.connection.db, mongoose.connection.getClient());

  const app = express();
  app.use(cors({ origin: CORS_ORIGIN, credentials: true }));

  app.all('/api/auth/*', toNodeHandler(auth));

  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }): Promise<GraphQLContext> => {
        const session = await auth.api.getSession({ headers: fromNodeHeaders(req.headers) });
        return { userId: session?.user.id ?? null };
      },
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`API ready at http://localhost:${PORT}/graphql`);
}

start().catch(console.error);
