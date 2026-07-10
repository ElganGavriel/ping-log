import { GraphQLResolveInfo } from 'graphql';
import { IProfile } from '../models/profile.model.js';
import { ICompany } from '../models/company.model.js';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
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

export type CreatePoopSessionInput = {
  durationSeconds: Scalars['Int']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCompany: Company;
  createPoopSession: PoopSession;
  joinCompany: Profile;
  leaveCompany: Profile;
  updateProfile: Profile;
};


export type MutationCreateCompanyArgs = {
  input: CreateCompanyInput;
};


export type MutationCreatePoopSessionArgs = {
  input: CreatePoopSessionInput;
};


export type MutationJoinCompanyArgs = {
  joinCode: Scalars['String']['input'];
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

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Company: ResolverTypeWrapper<ICompany>;
  CompanyLeaderboardEntry: ResolverTypeWrapper<CompanyLeaderboardEntry>;
  CreateCompanyInput: CreateCompanyInput;
  CreatePoopSessionInput: CreatePoopSessionInput;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  PoopSession: ResolverTypeWrapper<PoopSession>;
  Profile: ResolverTypeWrapper<IProfile>;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  UpdateProfileInput: UpdateProfileInput;
  WageMode: WageMode;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Boolean: Scalars['Boolean']['output'];
  Company: ICompany;
  CompanyLeaderboardEntry: CompanyLeaderboardEntry;
  CreateCompanyInput: CreateCompanyInput;
  CreatePoopSessionInput: CreatePoopSessionInput;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Int: Scalars['Int']['output'];
  Mutation: {};
  PoopSession: PoopSession;
  Profile: IProfile;
  Query: {};
  String: Scalars['String']['output'];
  UpdateProfileInput: UpdateProfileInput;
}>;

export type CompanyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Company'] = ResolversParentTypes['Company']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  joinCode?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type CompanyLeaderboardEntryResolvers<ContextType = any, ParentType extends ResolversParentTypes['CompanyLeaderboardEntry'] = ResolversParentTypes['CompanyLeaderboardEntry']> = ResolversObject<{
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  totalDurationSeconds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalMoneyEarned?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createCompany?: Resolver<ResolversTypes['Company'], ParentType, ContextType, RequireFields<MutationCreateCompanyArgs, 'input'>>;
  createPoopSession?: Resolver<ResolversTypes['PoopSession'], ParentType, ContextType, RequireFields<MutationCreatePoopSessionArgs, 'input'>>;
  joinCompany?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationJoinCompanyArgs, 'joinCode'>>;
  leaveCompany?: Resolver<ResolversTypes['Profile'], ParentType, ContextType>;
  updateProfile?: Resolver<ResolversTypes['Profile'], ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'input'>>;
}>;

export type PoopSessionResolvers<ContextType = any, ParentType extends ResolversParentTypes['PoopSession'] = ResolversParentTypes['PoopSession']> = ResolversObject<{
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  currency?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  durationSeconds?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  hourlyRate?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  moneyEarned?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type ProfileResolvers<ContextType = any, ParentType extends ResolversParentTypes['Profile'] = ResolversParentTypes['Profile']> = ResolversObject<{
  company?: Resolver<Maybe<ResolversTypes['Company']>, ParentType, ContextType>;
  currency?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  displayName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  effectiveHourlyRate?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  hourlyWage?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  hoursPerWeek?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  isReadyToTrack?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  monthlySalary?: Resolver<Maybe<ResolversTypes['Float']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  wageMode?: Resolver<Maybe<ResolversTypes['WageMode']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  companyLeaderboard?: Resolver<Array<ResolversTypes['CompanyLeaderboardEntry']>, ParentType, ContextType, Partial<QueryCompanyLeaderboardArgs>>;
  hello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  me?: Resolver<Maybe<ResolversTypes['Profile']>, ParentType, ContextType>;
  myPoopSessions?: Resolver<Array<ResolversTypes['PoopSession']>, ParentType, ContextType, Partial<QueryMyPoopSessionsArgs>>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Company?: CompanyResolvers<ContextType>;
  CompanyLeaderboardEntry?: CompanyLeaderboardEntryResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  PoopSession?: PoopSessionResolvers<ContextType>;
  Profile?: ProfileResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
}>;

