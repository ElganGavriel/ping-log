import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import http from 'http';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import mongoose from 'mongoose';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './resolvers';

const PORT = process.env.PORT ?? 4000;
const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/ping-log';
const CORS_ORIGIN = process.env.CORS_ORIGIN ?? 'http://localhost:3000';

async function start() {
  await mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');

  const app = express();
  const httpServer = http.createServer(app);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    '/graphql',
    cors<cors.CorsRequest>({ origin: CORS_ORIGIN }),
    express.json(),
    expressMiddleware(server),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: PORT }, resolve));
  console.log(`API ready at http://localhost:${PORT}/graphql`);
}

start().catch(console.error);
