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
  resolve({ browser: true }),
  postcss(),
  filesize()
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
  plugins: [
    external(),
    ...commonPlugins,
    commonjs(),
    (isProduction && minify({ cjs: pkg.browser }))
  ]
}];

const devBuildTasks = {
  input: pkg.example.entry,
  output: {
    file: pkg.example.main,
    format: 'umd',
    sourcemap: 'inline',
    strict: true,
  },
  plugins: [
    ...commonPlugins,
    commonjs({
      include: 'node_modules/**',
      exclude: [
        'node_modules/process-es6/**',
      ],
      namedExports: {
        'node_modules/react/react.js': [
          'cloneElement', 
          'createElement', 
          'PropTypes', 
          'Children', 
          'Component'
        ],
        'node_modules/react-dom/index.js': [ 'render' ],
        'node_modules/monaco-editor/esm/vs/editor/editor.main.js': [
          'create',
          'setModelLanguage',
          'setTheme'
        ]
      }
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production'),
    })
  ]
};

export default (isProduction ? buildTasks : devBuildTasks);
