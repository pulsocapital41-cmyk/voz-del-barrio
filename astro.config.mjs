import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://vozdelbarrio.com.mx',
  trailingSlash: 'always',
  build: {
    format: 'directory'
  }
});
