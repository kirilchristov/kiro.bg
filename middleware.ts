// Import from /src to avoid code duplication
// Vercel and Next behave differently on using the middleware.ts file on local and deployed version
export {middleware, config} from './src/middleware';
