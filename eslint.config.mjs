import js from '@eslint/js';
import astro from 'eslint-plugin-astro';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{ ignores: ['dist/**', '.astro/**'] },
	js.configs.recommended,
	{
		files: ['**/*.{ts,tsx,mts,cts}'],
		extends: [...tseslint.configs.recommended],
	},
	...astro.configs.recommended,
);
