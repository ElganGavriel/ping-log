import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type ActivePoopSession = {
  __typename?: 'ActivePoopSession';
  currency: Scalars['String']['output'];
  hourlyRate: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  startedAt: Scalars['String']['output'];
};

export type Company = {
  __typename?: 'Company';
  id: Scalars['ID']['output'];
  joinCode: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type CompanyLeaderboardEntry = {
  __typename?: 'CompanyLeaderboardEntry';
  currency: Scalars['String']['output'];
  displayName: Scalars['String']['output'];
  totalDurationSeconds: Scalars['Int']['output'];
  totalMoneyEarned: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
};

export type CreateCompanyInput = {
  name: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCompany: Company;
  joinCompany: Profile;
  leaveCompany: Profile;
  /** Starts a session, or returns the already-running one if the caller has one open. */
  startPoopSession: ActivePoopSession;
  /** Ends the given session. Duration is computed server-side from the recorded start time, capped at a max session length. */
  stopPoopSession: PoopSession;
  updateProfile: Profile;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationJoinCompanyArgs = {
  joinCode: Scalars['String']['input'];
};


export type MutationStopPoopSessionArgs = {
  id: Scalars['ID']['input'];
};


export type MutationUpdateProfileArgs = {
  input: UpdateProfileInput;
};

export type PoopSession = {
  __typename?: 'PoopSession';
  createdAt: Scalars['String']['output'];
  currency: Scalars['String']['output'];
  durationSeconds: Scalars['Int']['output'];
  hourlyRate: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  moneyEarned: Scalars['Float']['output'];
};

export type Profile = {
  __typename?: 'Profile';
  company?: Maybe<Company>;
  currency?: Maybe<Scalars['String']['output']>;
  displayName: Scalars['String']['output'];
  effectiveHourlyRate?: Maybe<Scalars['Float']['output']>;
  hourlyWage?: Maybe<Scalars['Float']['output']>;
  hoursPerWeek?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  isReadyToTrack: Scalars['Boolean']['output'];
  monthlySalary?: Maybe<Scalars['Float']['output']>;
  userId: Scalars['String']['output'];
  wageMode?: Maybe<WageMode>;
};

export type Query = {
  __typename?: 'Query';
  /** The caller's in-progress session, if any. Lets the UI resume a running stopwatch after a page refresh. */
  activePoopSession?: Maybe<ActivePoopSession>;
  /** Company leaderboard ranked by total time tracked. Requires the caller to be in a company. */
  companyLeaderboard: Array<CompanyLeaderboardEntry>;
  hello: Scalars['String']['output'];
  /** Current authenticated user's profile, or null if not signed in. */
  me?: Maybe<Profile>;
  /** Current user's own poop sessions, newest first. */
  myPoopSessions: Array<PoopSession>;
};


export type QueryCompanyLeaderboardArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryMyPoopSessionsArgs = {
  limit?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateProfileInput = {
  currency?: InputMaybe<Scalars['String']['input']>;
  hourlyWage?: InputMaybe<Scalars['Float']['input']>;
  hoursPerWeek?: InputMaybe<Scalars['Float']['input']>;
  monthlySalary?: InputMaybe<Scalars['Float']['input']>;
  wageMode?: InputMaybe<WageMode>;
};

export enum WageMode {
  Hourly = 'HOURLY',
  Salary = 'SALARY'
}

export type CompanyLeaderboardQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type CompanyLeaderboardQuery = { __typename?: 'Query', companyLeaderboard: Array<{ __typename?: 'CompanyLeaderboardEntry', userId: string, displayName: string, totalDurationSeconds: number, totalMoneyEarned: number, currency: string }> };

export type CreateCompanyMutationVariables = Exact<{
  input: CreateCompanyInput;
}>;


export type CreateCompanyMutation = { __typename?: 'Mutation', createCompany: { __typename?: 'Company', id: string, name: string, joinCode: string } };

export type JoinCompanyMutationVariables = Exact<{
  joinCode: Scalars['String']['input'];
}>;


export type JoinCompanyMutation = { __typename?: 'Mutation', joinCompany: { __typename?: 'Profile', id: string, company?: { __typename?: 'Company', id: string, name: string, joinCode: string } | null } };

export type LeaveCompanyMutationVariables = Exact<{ [key: string]: never; }>;


export type LeaveCompanyMutation = { __typename?: 'Mutation', leaveCompany: { __typename?: 'Profile', id: string, company?: { __typename?: 'Company', id: string } | null } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type ActivePoopSessionQueryVariables = Exact<{ [key: string]: never; }>;


export type ActivePoopSessionQuery = { __typename?: 'Query', activePoopSession?: { __typename?: 'ActivePoopSession', id: string, startedAt: string, hourlyRate: number, currency: string } | null };

export type MyPoopSessionsQueryVariables = Exact<{
  limit?: InputMaybe<Scalars['Int']['input']>;
}>;


export type MyPoopSessionsQuery = { __typename?: 'Query', myPoopSessions: Array<{ __typename?: 'PoopSession', id: string, durationSeconds: number, hourlyRate: number, currency: string, moneyEarned: number, createdAt: string }> };

export type StartPoopSessionMutationVariables = Exact<{ [key: string]: never; }>;


export type StartPoopSessionMutation = { __typename?: 'Mutation', startPoopSession: { __typename?: 'ActivePoopSession', id: string, startedAt: string, hourlyRate: number, currency: string } };

export type StopPoopSessionMutationVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type StopPoopSessionMutation = { __typename?: 'Mutation', stopPoopSession: { __typename?: 'PoopSession', id: string, durationSeconds: number, hourlyRate: number, currency: string, moneyEarned: number, createdAt: string } };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Profile', id: string, userId: string, displayName: string, currency?: string | null, wageMode?: WageMode | null, hourlyWage?: number | null, monthlySalary?: number | null, hoursPerWeek?: number | null, effectiveHourlyRate?: number | null, isReadyToTrack: boolean, company?: { __typename?: 'Company', id: string, name: string, joinCode: string } | null } | null };

export type UpdateProfileMutationVariables = Exact<{
  input: UpdateProfileInput;
}>;


export type UpdateProfileMutation = { __typename?: 'Mutation', updateProfile: { __typename?: 'Profile', id: string, currency?: string | null, wageMode?: WageMode | null, hourlyWage?: number | null, monthlySalary?: number | null, hoursPerWeek?: number | null, effectiveHourlyRate?: number | null, isReadyToTrack: boolean } };


export const CompanyLeaderboardDocument = gql`
    query CompanyLeaderboard($limit: Int) {
  companyLeaderboard(limit: $limit) {
    userId
    displayName
    totalDurationSeconds
    totalMoneyEarned
    currency
  }
}
    `;

/**
 * __useCompanyLeaderboardQuery__
 *
 * To run a query within a React component, call `useCompanyLeaderboardQuery` and pass it any options that fit your needs.
 * When your component renders, `useCompanyLeaderboardQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCompanyLeaderboardQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useCompanyLeaderboardQuery(baseOptions?: Apollo.QueryHookOptions<CompanyLeaderboardQuery, CompanyLeaderboardQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CompanyLeaderboardQuery, CompanyLeaderboardQueryVariables>(CompanyLeaderboardDocument, options);
      }
export function useCompanyLeaderboardLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CompanyLeaderboardQuery, CompanyLeaderboardQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CompanyLeaderboardQuery, CompanyLeaderboardQueryVariables>(CompanyLeaderboardDocument, options);
        }
// @ts-ignore
export function useCompanyLeaderboardSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<CompanyLeaderboardQuery, CompanyLeaderboardQueryVariables>): Apollo.UseSuspenseQueryResult<CompanyLeaderboardQuery, CompanyLeaderboardQueryVariables>;
export function useCompanyLeaderboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CompanyLeaderboardQuery, CompanyLeaderboardQueryVariables>): Apollo.UseSuspenseQueryResult<CompanyLeaderboardQuery | undefined, CompanyLeaderboardQueryVariables>;
export function useCompanyLeaderboardSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<CompanyLeaderboardQuery, CompanyLeaderboardQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<CompanyLeaderboardQuery, CompanyLeaderboardQueryVariables>(CompanyLeaderboardDocument, options);
        }
export type CompanyLeaderboardQueryHookResult = ReturnType<typeof useCompanyLeaderboardQuery>;
export type CompanyLeaderboardLazyQueryHookResult = ReturnType<typeof useCompanyLeaderboardLazyQuery>;
export type CompanyLeaderboardSuspenseQueryHookResult = ReturnType<typeof useCompanyLeaderboardSuspenseQuery>;
export type CompanyLeaderboardQueryResult = Apollo.QueryResult<CompanyLeaderboardQuery, CompanyLeaderboardQueryVariables>;
export const CreateCompanyDocument = gql`
    mutation CreateCompany($input: CreateCompanyInput!) {
  createCompany(input: $input) {
    id
    name
    joinCode
  }
}
    `;
export type CreateCompanyMutationFn = Apollo.MutationFunction<CreateCompanyMutation, CreateCompanyMutationVariables>;

/**
 * __useCreateCompanyMutation__
 *
 * To run a mutation, you first call `useCreateCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompanyMutation, { data, loading, error }] = useCreateCompanyMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateCompanyMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompanyMutation, CreateCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompanyMutation, CreateCompanyMutationVariables>(CreateCompanyDocument, options);
      }
export type CreateCompanyMutationHookResult = ReturnType<typeof useCreateCompanyMutation>;
export type CreateCompanyMutationResult = Apollo.MutationResult<CreateCompanyMutation>;
export type CreateCompanyMutationOptions = Apollo.BaseMutationOptions<CreateCompanyMutation, CreateCompanyMutationVariables>;
export const JoinCompanyDocument = gql`
    mutation JoinCompany($joinCode: String!) {
  joinCompany(joinCode: $joinCode) {
    id
    company {
      id
      name
      joinCode
    }
  }
}
    `;
export type JoinCompanyMutationFn = Apollo.MutationFunction<JoinCompanyMutation, JoinCompanyMutationVariables>;

/**
 * __useJoinCompanyMutation__
 *
 * To run a mutation, you first call `useJoinCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useJoinCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [joinCompanyMutation, { data, loading, error }] = useJoinCompanyMutation({
 *   variables: {
 *      joinCode: // value for 'joinCode'
 *   },
 * });
 */
export function useJoinCompanyMutation(baseOptions?: Apollo.MutationHookOptions<JoinCompanyMutation, JoinCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<JoinCompanyMutation, JoinCompanyMutationVariables>(JoinCompanyDocument, options);
      }
export type JoinCompanyMutationHookResult = ReturnType<typeof useJoinCompanyMutation>;
export type JoinCompanyMutationResult = Apollo.MutationResult<JoinCompanyMutation>;
export type JoinCompanyMutationOptions = Apollo.BaseMutationOptions<JoinCompanyMutation, JoinCompanyMutationVariables>;
export const LeaveCompanyDocument = gql`
    mutation LeaveCompany {
  leaveCompany {
    id
    company {
      id
    }
  }
}
    `;
export type LeaveCompanyMutationFn = Apollo.MutationFunction<LeaveCompanyMutation, LeaveCompanyMutationVariables>;

/**
 * __useLeaveCompanyMutation__
 *
 * To run a mutation, you first call `useLeaveCompanyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLeaveCompanyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [leaveCompanyMutation, { data, loading, error }] = useLeaveCompanyMutation({
 *   variables: {
 *   },
 * });
 */
export function useLeaveCompanyMutation(baseOptions?: Apollo.MutationHookOptions<LeaveCompanyMutation, LeaveCompanyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LeaveCompanyMutation, LeaveCompanyMutationVariables>(LeaveCompanyDocument, options);
      }
export type LeaveCompanyMutationHookResult = ReturnType<typeof useLeaveCompanyMutation>;
export type LeaveCompanyMutationResult = Apollo.MutationResult<LeaveCompanyMutation>;
export type LeaveCompanyMutationOptions = Apollo.BaseMutationOptions<LeaveCompanyMutation, LeaveCompanyMutationVariables>;
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

/**
 * __useHelloQuery__
 *
 * To run a query within a React component, call `useHelloQuery` and pass it any options that fit your needs.
 * When your component renders, `useHelloQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHelloQuery({
 *   variables: {
 *   },
 * });
 */
export function useHelloQuery(baseOptions?: Apollo.QueryHookOptions<HelloQuery, HelloQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
      }
export function useHelloLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
// @ts-ignore
export function useHelloSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<HelloQuery, HelloQueryVariables>): Apollo.UseSuspenseQueryResult<HelloQuery, HelloQueryVariables>;
export function useHelloSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HelloQuery, HelloQueryVariables>): Apollo.UseSuspenseQueryResult<HelloQuery | undefined, HelloQueryVariables>;
export function useHelloSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<HelloQuery, HelloQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<HelloQuery, HelloQueryVariables>(HelloDocument, options);
        }
export type HelloQueryHookResult = ReturnType<typeof useHelloQuery>;
export type HelloLazyQueryHookResult = ReturnType<typeof useHelloLazyQuery>;
export type HelloSuspenseQueryHookResult = ReturnType<typeof useHelloSuspenseQuery>;
export type HelloQueryResult = Apollo.QueryResult<HelloQuery, HelloQueryVariables>;
export const ActivePoopSessionDocument = gql`
    query ActivePoopSession {
  activePoopSession {
    id
    startedAt
    hourlyRate
    currency
  }
}
    `;

/**
 * __useActivePoopSessionQuery__
 *
 * To run a query within a React component, call `useActivePoopSessionQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivePoopSessionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivePoopSessionQuery({
 *   variables: {
 *   },
 * });
 */
export function useActivePoopSessionQuery(baseOptions?: Apollo.QueryHookOptions<ActivePoopSessionQuery, ActivePoopSessionQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivePoopSessionQuery, ActivePoopSessionQueryVariables>(ActivePoopSessionDocument, options);
      }
export function useActivePoopSessionLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivePoopSessionQuery, ActivePoopSessionQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivePoopSessionQuery, ActivePoopSessionQueryVariables>(ActivePoopSessionDocument, options);
        }
// @ts-ignore
export function useActivePoopSessionSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ActivePoopSessionQuery, ActivePoopSessionQueryVariables>): Apollo.UseSuspenseQueryResult<ActivePoopSessionQuery, ActivePoopSessionQueryVariables>;
export function useActivePoopSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ActivePoopSessionQuery, ActivePoopSessionQueryVariables>): Apollo.UseSuspenseQueryResult<ActivePoopSessionQuery | undefined, ActivePoopSessionQueryVariables>;
export function useActivePoopSessionSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ActivePoopSessionQuery, ActivePoopSessionQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ActivePoopSessionQuery, ActivePoopSessionQueryVariables>(ActivePoopSessionDocument, options);
        }
export type ActivePoopSessionQueryHookResult = ReturnType<typeof useActivePoopSessionQuery>;
export type ActivePoopSessionLazyQueryHookResult = ReturnType<typeof useActivePoopSessionLazyQuery>;
export type ActivePoopSessionSuspenseQueryHookResult = ReturnType<typeof useActivePoopSessionSuspenseQuery>;
export type ActivePoopSessionQueryResult = Apollo.QueryResult<ActivePoopSessionQuery, ActivePoopSessionQueryVariables>;
export const MyPoopSessionsDocument = gql`
    query MyPoopSessions($limit: Int) {
  myPoopSessions(limit: $limit) {
    id
    durationSeconds
    hourlyRate
    currency
    moneyEarned
    createdAt
  }
}
    `;

/**
 * __useMyPoopSessionsQuery__
 *
 * To run a query within a React component, call `useMyPoopSessionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyPoopSessionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyPoopSessionsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useMyPoopSessionsQuery(baseOptions?: Apollo.QueryHookOptions<MyPoopSessionsQuery, MyPoopSessionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyPoopSessionsQuery, MyPoopSessionsQueryVariables>(MyPoopSessionsDocument, options);
      }
export function useMyPoopSessionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyPoopSessionsQuery, MyPoopSessionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyPoopSessionsQuery, MyPoopSessionsQueryVariables>(MyPoopSessionsDocument, options);
        }
// @ts-ignore
export function useMyPoopSessionsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MyPoopSessionsQuery, MyPoopSessionsQueryVariables>): Apollo.UseSuspenseQueryResult<MyPoopSessionsQuery, MyPoopSessionsQueryVariables>;
export function useMyPoopSessionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyPoopSessionsQuery, MyPoopSessionsQueryVariables>): Apollo.UseSuspenseQueryResult<MyPoopSessionsQuery | undefined, MyPoopSessionsQueryVariables>;
export function useMyPoopSessionsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MyPoopSessionsQuery, MyPoopSessionsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MyPoopSessionsQuery, MyPoopSessionsQueryVariables>(MyPoopSessionsDocument, options);
        }
export type MyPoopSessionsQueryHookResult = ReturnType<typeof useMyPoopSessionsQuery>;
export type MyPoopSessionsLazyQueryHookResult = ReturnType<typeof useMyPoopSessionsLazyQuery>;
export type MyPoopSessionsSuspenseQueryHookResult = ReturnType<typeof useMyPoopSessionsSuspenseQuery>;
export type MyPoopSessionsQueryResult = Apollo.QueryResult<MyPoopSessionsQuery, MyPoopSessionsQueryVariables>;
export const StartPoopSessionDocument = gql`
    mutation StartPoopSession {
  startPoopSession {
    id
    startedAt
    hourlyRate
    currency
  }
}
    `;
export type StartPoopSessionMutationFn = Apollo.MutationFunction<StartPoopSessionMutation, StartPoopSessionMutationVariables>;

/**
 * __useStartPoopSessionMutation__
 *
 * To run a mutation, you first call `useStartPoopSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStartPoopSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [startPoopSessionMutation, { data, loading, error }] = useStartPoopSessionMutation({
 *   variables: {
 *   },
 * });
 */
export function useStartPoopSessionMutation(baseOptions?: Apollo.MutationHookOptions<StartPoopSessionMutation, StartPoopSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StartPoopSessionMutation, StartPoopSessionMutationVariables>(StartPoopSessionDocument, options);
      }
export type StartPoopSessionMutationHookResult = ReturnType<typeof useStartPoopSessionMutation>;
export type StartPoopSessionMutationResult = Apollo.MutationResult<StartPoopSessionMutation>;
export type StartPoopSessionMutationOptions = Apollo.BaseMutationOptions<StartPoopSessionMutation, StartPoopSessionMutationVariables>;
export const StopPoopSessionDocument = gql`
    mutation StopPoopSession($id: ID!) {
  stopPoopSession(id: $id) {
    id
    durationSeconds
    hourlyRate
    currency
    moneyEarned
    createdAt
  }
}
    `;
export type StopPoopSessionMutationFn = Apollo.MutationFunction<StopPoopSessionMutation, StopPoopSessionMutationVariables>;

/**
 * __useStopPoopSessionMutation__
 *
 * To run a mutation, you first call `useStopPoopSessionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useStopPoopSessionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [stopPoopSessionMutation, { data, loading, error }] = useStopPoopSessionMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useStopPoopSessionMutation(baseOptions?: Apollo.MutationHookOptions<StopPoopSessionMutation, StopPoopSessionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<StopPoopSessionMutation, StopPoopSessionMutationVariables>(StopPoopSessionDocument, options);
      }
export type StopPoopSessionMutationHookResult = ReturnType<typeof useStopPoopSessionMutation>;
export type StopPoopSessionMutationResult = Apollo.MutationResult<StopPoopSessionMutation>;
export type StopPoopSessionMutationOptions = Apollo.BaseMutationOptions<StopPoopSessionMutation, StopPoopSessionMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    userId
    displayName
    currency
    wageMode
    hourlyWage
    monthlySalary
    hoursPerWeek
    effectiveHourlyRate
    isReadyToTrack
    company {
      id
      name
      joinCode
    }
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
// @ts-ignore
export function useMeSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>): Apollo.UseSuspenseQueryResult<MeQuery | undefined, MeQueryVariables>;
export function useMeSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const UpdateProfileDocument = gql`
    mutation UpdateProfile($input: UpdateProfileInput!) {
  updateProfile(input: $input) {
    id
    currency
    wageMode
    hourlyWage
    monthlySalary
    hoursPerWeek
    effectiveHourlyRate
    isReadyToTrack
  }
}
    `;
export type UpdateProfileMutationFn = Apollo.MutationFunction<UpdateProfileMutation, UpdateProfileMutationVariables>;

/**
 * __useUpdateProfileMutation__
 *
 * To run a mutation, you first call `useUpdateProfileMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProfileMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProfileMutation, { data, loading, error }] = useUpdateProfileMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateProfileMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProfileMutation, UpdateProfileMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateProfileMutation, UpdateProfileMutationVariables>(UpdateProfileDocument, options);
      }
export type UpdateProfileMutationHookResult = ReturnType<typeof useUpdateProfileMutation>;
export type UpdateProfileMutationResult = Apollo.MutationResult<UpdateProfileMutation>;
export type UpdateProfileMutationOptions = Apollo.BaseMutationOptions<UpdateProfileMutation, UpdateProfileMutationVariables>;