import type { BuildConfig, BunPlugin, OnLoadResult } from 'bun';
import { resolve } from 'node:path';

export const clientPlugin: BunPlugin = {
  name: 'Client Plugin',
  target: 'browser',

  setup(build) {
    build.onLoad({ filter: /[?&]client(?:[&=]|$)/ }, async (args) => {
      const path = args.path.split('?')[0];
      const fullPath = resolve(path);
      const isProd =
        Bun.env.NODE_ENV === 'production'
          ? ({ minify: true, sourcemap: 'none' } as Omit<
            BuildConfig,
            'entrypoints'
          >)
          : ({ sourcemap: 'inline' } as Omit<BuildConfig, 'entrypoints'>);

      const pipeline = await Bun.build({
        entrypoints: [fullPath],
        loader: { '.ts': 'ts' },
        target: 'browser',
        ...isProd
      });

      const built = await pipeline.outputs[0].text();

      // console.log(built);

      return {
        loader: 'object',
        exports: {
          default: built.toString()
        }
      } satisfies OnLoadResult;
    });
  }
};
