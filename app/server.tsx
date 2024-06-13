import { Hono } from 'hono';
import { logger } from 'hono/logger';
import { render } from './render';
import { What } from './pages/What';
import { Create } from './pages/Create';
import renderer from './jsx-renderer';
import api from './api';

const app = new Hono();

app.use('*', logger());
app.get('*', renderer);

app.get('/', (c) => {
  return render(c, <Create />);
});

app.get('/what', (c) => {
  return render(c, <What />);
});

app.route('/api', api);

// biome-ignore lint/style/noDefaultExport: <explanation>
export default app;
