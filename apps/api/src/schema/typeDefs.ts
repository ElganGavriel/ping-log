import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

// root.graphql must load first: it declares the base Query/Mutation types
// that the other domain files extend.
const SCHEMA_FILES = ['root.graphql', 'profile.graphql', 'company.graphql', 'poop-session.graphql'];

export const typeDefs = SCHEMA_FILES.map((file) => readFileSync(join(__dirname, file), 'utf-8'));
