import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import resolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';

const banner =
`/**
 * ${pkg.name} - ${pkg.version} : React Wrapper for Monaco Editor
 * Author: ${pkg.author}
 * ${pkg.license} License
 */
`;

export default [{
  input: pkg.entry,
  external: [ 'react', 'monaco-editor' ],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true,
      strict: true,
      banner: banner,
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: pkg.name,
      sourcemap: true,
      strict: true,
      globals: {
        react: 'React',
        'monaco-editor': 'monaco',
      },
      banner: banner,
    },
    {
      file: pkg.module,
      format: 'esm',
      sourcemap: true,
      strict: true,
      preserveModules: true,
      banner: banner,
    },
  ],
  plugins: [
    progress(),
    babel({
      runtimeHelpers: true,
    }),
    resolve({
      mainFields: [ 'module', 'main', 'browser' ],
    }),
    postcss(),
    filesize(),
    commonjs(),
  ],
}];
