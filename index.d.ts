import * as pathToRegexp from 'path-to-regexp';

interface Params {
  [key: string]: any
}

interface BaseContext {
  [key: string]: any;
}

type RouteResult<Result> = Result | Promise<Result>;

type ActionFunctionContext<Result, Context> = Context & {
  next: () => RouteResult<Result>;
};

type ActionFunction<Result, Context> = (
  context: ActionFunctionContext<Result, Context>,
  params: Params,
) => RouteResult<Result>;

export interface Route<Result, Context extends BaseContext = BaseContext> {
  path: string;
  action: ActionFunction<Result, Context>;
  name?: string;
  parent?: Route<Result> | null;
  children?: Route<Result>[];
}

export type Routes<Result, Context> = Route<Result, Context>[]

type MatchPath<Result> = (
  route: Route<Result>,
  pathname: string,
  parentKeys: string[],
  parentParams: { [key: string]: any },
) => any;

type MatchRoute<Result> = (
  route: Route<Result>,
  baseUrl: string,
  pathname: string,
  parentKeys: string[],
  parentParams: { [key: string]: any },
) => any;

type ResolveRoute<Result> = (context: BaseContext, params: Params) => Result | null;

interface ConstructorOptions<Context, Result> {
  context?: Context;
  baseUrl?: string;
  resolveRoute?: ResolveRoute<Result>;
}

interface InstanceContext<Result, Context> extends BaseContext {
  router: UniversalRouter<Result, Context>
}

interface ResolverContext extends BaseContext {
  pathname: string;
}

declare class UniversalRouter<Result, Context> {
  baseUrl: string;
  resolveRoute: ResolveRoute<Result>;
  context: InstanceContext<Result, Context>;
  root: Route<Result>;

  constructor(routes: Routes<Result, Context>, options?: ConstructorOptions<Context, Result>);

  resolve(pathname: string): Promise<Result>;
  resolve(context: ResolverContext & Context): Promise<Result>;

  static pathToRegexp: typeof pathToRegexp;
  static matchPath: MatchPath<any>;
  static matchRoute: MatchRoute<any>;
  static resolveRoute: ResolveRoute<any>;
}

export default UniversalRouter;
