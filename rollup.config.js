import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import jsx from 'rollup-plugin-jsx';
import babel from '@rollup/plugin-babel';
import scss from 'rollup-plugin-scss'

const packageJson = require('./package.json');

export default {
    input: 'index.jsx',
    entry: 'index.jsx',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            sourcemap: true,
        },
    ],
    plugins: [
        scss(),
        babel({ babelHelpers: 'bundled' }),
        jsx({ factory: 'React.createElement' }),
        peerDepsExternal(),
        resolve(),
    ],
};
