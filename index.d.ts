type Params = { [key: string]: string };

type ContextBase<R, C> = {
  router: Router<R, C>;
  route: Route<R, C>;
  next: () => Promise<R>;
  url: string;
  baseUrl: string;
  path: string;
  params: Params;
  keys: any[];  // https://github.com/pillarjs/path-to-regexp
};

type ActualContext<R, C> = ContextBase<R, C> & C;

export type Route<R, C> = {
  path: string;
  name?: string;
  parent?: Route<R, C> | null;
  children?: Route<R, C>[] | null;
  action?: (context: ActualContext<R, C>, params: Params) => R | Promise<R>;
};

type RouterOptions<R, C> = {
  context?: C,
  baseUrl?: string,
  resolveRoute?: (context: ActualContext<R, C>, params: Params) => any;
};

type ResolveParams<R, C> = Partial<ActualContext<R, C>> & {
  [key: string]: any;
  path: string;
};

declare class Router<R, C> {
  constructor(routes: Route<R, C> | Route<R, C>[], options?: RouterOptions<R, C>);
  resolve(path: string): Promise<R>;
  resolve(path: ResolveParams<R, C>): Promise<R>;
}

export default Router;
