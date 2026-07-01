import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'apps/api/src/schema/schema.graphql',
  generates: {
    // Typed resolver map for the API — ensures resolvers match the schema exactly
    'apps/api/src/generated/resolvers.generated.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        useIndexSignature: true,
      },
    },
    // Typed operations + Apollo hooks for the web app
    'apps/web/src/generated/graphql.generated.ts': {
      documents: ['apps/web/src/**/*.graphql'],
      plugins: ['typescript', 'typescript-operations', 'typescript-react-apollo'],
      config: {
        withHooks: true,
        withComponent: false,
        withHOC: false,
      },
    },
  },
};

export default config;
