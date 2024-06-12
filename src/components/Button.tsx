import type { FC } from 'hono/jsx';

export const Button: FC = (props) => {
  return (
    <button
      class="ring-offset-background focus-visible:ring-ring inline-flex h-10 w-full items-center justify-center rounded-md bg-neutral-dark-5 px-4 py-2 text-sm font-medium text-primary-1 transition-colors hover:bg-neutral-dark-3/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
      id={props.id}
    >
      {props.name}
    </button>
  );
};
