import { sveltekit } from '@sveltejs/kit/vite';
import extractorSvelte from '@unocss/extractor-svelte';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [
		UnoCSS({
			extractors: [extractorSvelte()]
		}),
		sveltekit()
	]
});
