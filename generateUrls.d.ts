import Router from '../universal-router';

type UrlizeFunction = (name: string, params: { [key: string]: string }) => string;
type GenerateUrls = (routes: Router<any, any>) => UrlizeFunction;

declare const generateUrls: GenerateUrls;

export default generateUrls;
