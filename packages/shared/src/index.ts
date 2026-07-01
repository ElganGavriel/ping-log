// Shared types between web and api
// When you add graphql-codegen, generated types will live here too

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface ApiError {
  message: string;
  code?: string;
}
