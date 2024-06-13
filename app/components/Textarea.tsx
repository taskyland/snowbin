import type { FC } from 'hono/jsx';

export const Textarea: FC = () => {
  return (
    <div class="relative">
      <textarea
        class="ring-offset-background focus-visible:ring-ring flex h-96 min-h-[80px] w-full rounded-md bg-neutral-3 p-4 text-sm text-neutral-dark-5 placeholder:text-neutral-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-dark-3 dark:text-neutral-5"
        placeholder="Enter your text here. ✨️"
        spellcheck={false}
        id="input"
      />
      <div class="absolute bottom-2 left-2 text-xs text-black dark:text-white">
        <span id="size">0 KB / 1024 KB</span>
      </div>
    </div>
  );
};
