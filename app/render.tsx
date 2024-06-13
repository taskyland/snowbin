import type { Context } from 'hono';

async function renderJSXToClientJSX(jsxElement: JSX.Element) {
  const jsx = jsxElement as unknown as JSXNode;
  if (
    typeof jsx === 'string' ||
    typeof jsx === 'number' ||
    typeof jsx === 'boolean' ||
    jsx == null
  ) {
    return jsx;
  }

  const { children, tag, props } = jsx;

  if (typeof tag === 'function') {
    const returnedJSX = await tag(props);
    if (returnedJSX['tag'] !== '') {
      return renderJSXToClientJSX(returnedJSX);
    }
  }

  let resolvedChildren = [];

  if (children && children.length > 0) {
    resolvedChildren = await Promise.all(
      children.map((child) => renderJSXToClientJSX(child as JSX.Element))
    );
  }

  return { tag, props, children: resolvedChildren };
}

export async function render(c: Context, element: JSX.Element) {
  if (c.req.query('__sc') !== undefined) {
    const clientJSX = await renderJSXToClientJSX(element);
    return c.json(clientJSX);
  }
  return c.render(element);
}
