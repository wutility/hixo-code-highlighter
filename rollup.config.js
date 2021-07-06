import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from "rollup-plugin-terser";
import postcss from "rollup-plugin-postcss";

export default {
  input: 'src/hixo.js',
  output: [
    {
      name: 'Hixo',
      file: 'build/hixo.umd.js',
      format: 'umd'
    },
    {
      file: 'build/hixo.esm.js',
      format: 'esm'
    },
    {
      file: 'build/hixo.cjs.js',
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
      extract: 'hixo.css'
    }),
    nodeResolve(),
    terser()
  ]
};
