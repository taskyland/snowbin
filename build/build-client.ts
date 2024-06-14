import { Glob, $, build } from 'bun';

const glob = new Glob('*.ts');
const entrypoints = await Array.fromAsync(
  glob.scan({ cwd: 'app/client', absolute: true })
);

await $`rm -rf public/static`;

await build({
  entrypoints: entrypoints,
  minify: true,
  loader: { '.ts': 'ts' },
  outdir: 'public/static/',
  target: 'browser'
});
