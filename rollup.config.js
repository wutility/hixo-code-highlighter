import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

export default {
  input: 'src/index.js',
  output: [
    {
      name: 'Hixo',
      file: 'build/index.umd.js',
      format: 'umd'
    },
    {
      file: 'build/index.esm.js',
      format: 'esm'
    },
    {
      file: 'build/index.js',
      format: 'cjs',
      sourcemap: false,
    }
  ],
  plugins: [
    postcss({
      babelrc: false,
      modules: false,
      plugins: [],
      extract: true,
      minimize: true,
      sourceMap: false,
      babelHelpers: 'runtime',
      extract: 'index.css'
    }),
    nodeResolve(),
    terser()
  ]
};
