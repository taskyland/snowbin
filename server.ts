import app from './app/server';
import { Hono } from 'hono';
import { serveStatic } from 'hono/bun';

const base = new Hono();
base.get('/static/*', serveStatic({ root: './public' }));
base.route('/', app);

// biome-ignore lint/style/noDefaultExport: <explanation>
export default base;
