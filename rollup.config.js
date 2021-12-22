import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import utilPkg from './packages/utils/package.json';

export default [
	// browser-friendly UMD build
	{
		input: 'packages/utils/index.js',
		output: {
			name: 'howLongUntilLunch',
			file: `packages/utils/${utilPkg.browser}`,
			format: 'umd'
		},
		plugins: [
			resolve(), // so Rollup can find `ms`
			commonjs() // so Rollup can convert `ms` to an ES module
		]
	},
	// CommonJS (for Node) and ES module (for bundlers) build. 
	{
		input: 'packages/utils/index.js',
		external: ['ms'],
		output: [
			{ file: `packages/utils/${utilPkg.main}`, format: 'cjs' },
			{ file: `packages/utils/${utilPkg.module}`, format: 'es' }
		]
	}
];