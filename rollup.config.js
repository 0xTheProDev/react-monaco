import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import filesize from 'rollup-plugin-filesize';
import postcss from 'rollup-plugin-postcss';
import progress from 'rollup-plugin-progress';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import minify from 'rollup-plugin-minify';

import pkg from './package.json';

const isProduction = process.env.NODE_ENV === 'production';

const minified = name => name.replace('.js', '.min.js');

const banner =
`/**
 * ${pkg.name} - ${pkg.version} : React Wrapper for Monaco Editor
 * Author: ${pkg.author}
 * ${pkg.license} License
 */
`;

const commonPlugins = [
  external(),
  progress(),
  babel({
    runtimeHelpers: true,
  }),
  resolve({
    mainFields: [ 'module', 'main', 'browser' ],
  }),
  postcss(),
  filesize(),
];

const buildTasks = [{
  input: pkg.entry,
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
    ...commonPlugins,
    commonjs(),
    minify({
      cjs: minified(pkg.main),
      umd: minified(pkg.browser),
    }),
  ]
}];

const devBuildTasks = {
  input: pkg.example.entry,
  output: {
    file: pkg.example.main,
    format: 'umd',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
    },
    sourcemap: true,
    strict: true,
  },
  plugins: [
    ...commonPlugins,
    commonjs({
      include: 'node_modules/**',
      exclude: [
        'node_modules/process-es6/**',
      ],
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    })
  ]
};

export default (isProduction ? buildTasks : devBuildTasks);
