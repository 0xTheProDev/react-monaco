import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss'
import resolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

const banner =
`/**
 * ${pkg.name} - ${pkg.version} : React Wrapper for Monaco Editor
 * Author: ${pkg.author}
 * ${pkg.license} License
 */
`;

export default {
  input: 'src/index.js',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      strict: true,
      banner: banner
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      strict: true,
      banner: banner
    }
  ],
  plugins: [
    external(),
    babel({ runtimeHelpers: true }),
    resolve(),
    postcss(),
    commonjs()
  ]
}
