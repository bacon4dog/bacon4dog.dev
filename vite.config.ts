import { sveltekit } from '@sveltejs/kit/vite';
import extractorSvelte from '@unocss/extractor-svelte';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vite';
import { partytownVite } from '@builder.io/partytown/utils';
import { resolve } from 'path';

/** @type {import('vite').UserConfig} */
export default defineConfig({
	plugins: [
		UnoCSS({
			extractors: [extractorSvelte()]
		}),
		sveltekit(),
		partytownVite({
			dest: resolve(__dirname, 'static', '~partytown')
		})
	]
});
