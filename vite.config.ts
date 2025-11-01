import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	server: {
		allowedHosts: true,
		proxy: {
			'/jakarta/twibbon': {
				target: "https://dave9123.me/ddjkt.html",
				changeOrigin: true,
				rewrite: (path) => path.replace(/^\/jakarta\/twibbon/, '')
			}
		}
	}
});
