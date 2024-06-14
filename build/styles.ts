import type { BunPlugin, OnLoadResult } from 'bun';
import postcss from 'postcss';
import postcssrc from 'postcss-load-config';
import { compileAsync } from 'sass';
import cssnano from 'cssnano';

export const stylesPlugin: BunPlugin = {
  name: 'Styles Plugin',
  setup(build) {
    build.onLoad({ filter: /\.scss$/ }, async (args) => {
      const { css: scss } = await compileAsync(args.path);
      const config = await postcssrc({ from: args.path, to: args.path });

      const plugins =
        Bun.env.NODE_ENV === 'production'
          ? [...config.plugins, cssnano()]
          : config.plugins;

      const pipeline = await postcss(plugins).process(scss).async();

      return {
        loader: 'object',
        exports: {
          default: pipeline.css
        }
      } satisfies OnLoadResult;
    });
  }
};
