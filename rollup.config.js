import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import resolve from 'rollup-plugin-node-resolve';
import minify from 'rollup-plugin-minify';

import pkg from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

const banner =
`/**
 * ${pkg.name} - ${pkg.version} : React Wrapper for Monaco Editor
 * Author: ${pkg.author}
 * ${pkg.license} License
 */
`;

const commonPlugins = [
  progress(),
  babel({ runtimeHelpers: true }),
  external(),
  resolve(),
  postcss(),
  commonjs(),
  filesize(),
  (isProduction && minify({ cjs: pkg.browser }))
];

const buildTasks = [{
  input: pkg.entry,
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
      format: 'esm',
      sourcemap: true,
      strict: true,
      banner: banner
    }
  ],
  external: [ 'monaco-editor' ],
  plugins: commonPlugins
}];

const devBuildTasks = [ /* ...buildTasks, */ {
  input: pkg.example.entry,
  output: {
    file: pkg.example.main,
    format: 'umd',
    sourcemap: true,
    strict: true
  },
  plugins: [ ...commonPlugins,
    commonjs({
      namedExports: {
        'node_modules/react/index.js': ['Children', 'Component', 'PropTypes', 'createElement'],
        'node_modules/react-dom/index.js': ['render'],
      }
    })
  ]
}];

export default (isProduction ? buildTasks : devBuildTasks);
