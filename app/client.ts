import type { Props } from 'hono/dist/types/jsx/base';
import { jsx as jsxFn } from 'hono/jsx';

function renderServerComponentToJSX({
  tag,
  props,
  children
}: {
  tag: string;
  props: Props;
  children: unknown[];
}): unknown {
  const processedChildren = children.map((child) => {
    if (typeof child === 'object' && child !== null) {
      return renderServerComponentToJSX(child);
    }
    return child;
  });
  return jsxFn(tag, props, ...processedChildren);
}

async function mountComponent(pathname: string) {
  const res = await fetch(`${pathname}?__sc`);
  const serverComponent = await res.json();
  const jsx = renderServerComponentToJSX(serverComponent);
  const root = document.querySelector<HTMLElement>('#root');
  root.innerHTML = await jsx.toString();
}

document.addEventListener('DOMContentLoaded', async function () {
  // Don't handle a server component when initial loading
  await mountComponent(window.location.pathname);
});

window.addEventListener(
  'click',
  (e) => {
    if ((e.target as HTMLElement).tagName !== 'A') {
      return;
    }
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) {
      return;
    }
    const href = (e.target as HTMLElement).getAttribute('href')!;
    if (!href.startsWith('/')) {
      return;
    }
    e.preventDefault();
    window.history.pushState(null, null, href);

    // Fallback for browsers that don't support this API:
    if (!document.startViewTransition) {
      mountComponent(href);
      return;
    }

    // With a View Transition:
    document.startViewTransition(() => mountComponent(href));
  },
  true
);
