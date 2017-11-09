import * as pathToRegexp from 'path-to-regexp';

interface Params {
  [key: string]: any;
}

interface BaseContext {
  [key: string]: any;
}

type ActionFunctionContext<Result, Context> = Context & {
  next: () => Result | Promise<Result>;
};

export interface Route<Result, Context> {
  path: string;
  action: (context: ActionFunctionContext<Result, Context>, params: Params) => Result | Promise<Result>;
  name?: string;
  parent?: Route<Result, Context> | null;
  children?: Route<Result, Context>[];
}

type ResolveRoute<Result, Context> = (context: Context, params: Params) => Result | null;

interface ConstructorOptions<Context, Result> {
  context?: Context;
  baseUrl?: string;
  resolveRoute?: ResolveRoute<Result, Context>;
}

declare class UniversalRouter<Result, Context extends BaseContext> {
  baseUrl: string;
  resolveRoute: ResolveRoute<Result, Context>;
  context: Context & { router: UniversalRouter<Result, Context> };
  root: Route<Result, Context>;

  constructor(routes: Route<Result, Context>[], options?: ConstructorOptions<Context, Result>);

  resolve(pathname: string): Promise<Result>;
  resolve(context: Context & { pathname: string }): Promise<Result>;

  static pathToRegexp: typeof pathToRegexp;
  static matchPath: <Result = any, Context = any>(
    route: Route<Result, Context>,
    pathname: string,
    parentKeys: string[],
    parentParams: { [key: string]: any },
  ) => any;
  static matchRoute: <Result = any, Context = any>(
    route: Route<Result, Context>,
    baseUrl: string,
    pathname: string,
    parentKeys: string[],
    parentParams: { [key: string]: any },
  ) => any;
  static resolveRoute: <Result = any>(context: BaseContext, params: Params) => Result | null;
}

export default UniversalRouter;
