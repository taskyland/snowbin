import type { FC } from 'hono/jsx';
import { Layout } from '../components/Layout';
import { Button } from '../components/Button';
import { Textarea } from '../components/Textarea';

export const Create: FC = () => {
  return (
    <Layout>
      <script defer={true} src="/static/create.js" />
      <h2>snowbin</h2>
      <p>Delightfully crafted pastebin with {'<3'}.</p>
      <div class="w-full max-w-2xl space-y-4 p-4">
        <Textarea />
        <Button name="Submit" id="submit" />
      </div>
    </Layout>
  );
};
