import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
    site: 'https://brettbaisley.com',
    vite: {
        plugins: [ tailwindcss() ]
    },
});