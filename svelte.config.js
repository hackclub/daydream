import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex, escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

// shiki config for the guide
const shikiTheme = "min-light"
const shikiHighlighter = await createHighlighter({
	themes: [shikiTheme],
	langs: ["javascript", "bash"],
})

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	highlight: {
		highlighter: async (code, lang = 'text') => {
			const html = escapeSvelte(shikiHighlighter.codeToHtml(code, { lang, theme: shikiTheme }));
			return `{@html \`${html}\` }`;
		}
	},
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
	extensions: ['.svelte', '.svx'],
	kit: {
		adapter: adapter({ fallback: '404.html' })
	}
};

export default config;

// mama mia mama mia mama mia let me go
