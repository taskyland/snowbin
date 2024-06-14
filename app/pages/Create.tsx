import type { FC } from 'hono/jsx';
import { Button } from '../components/Button';
import { Textarea } from '../components/Textarea';

export const Create: FC = () => {
  return (
    <>
      <h2>snowbin</h2>
      <p>Delightfully crafted pastebin with {'<3'}.</p>
      <div class="w-full max-w-2xl space-y-4 p-4">
        <Textarea />
      </div>
      <div class="w-full max-w-2xl space-y-4 p-4">
        <Button name="Submit" id="submit" />
      </div>
    </>
  );
};
