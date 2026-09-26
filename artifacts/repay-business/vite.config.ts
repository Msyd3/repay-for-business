import path from 'path';
import { createReadStream, readFileSync } from 'node:fs';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig, type Plugin } from 'vite';

import runtimeErrorOverlay from '@replit/vite-plugin-runtime-error-modal';

const rawPort = process.env.PORT;

if (!rawPort) {
  throw new Error(
    'PORT environment variable is required but was not provided.',
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

const basePath = process.env.BASE_PATH;

if (!basePath) {
  throw new Error(
    'BASE_PATH environment variable is required but was not provided.',
  );
}

const privacyPolicySource = path.resolve(
  import.meta.dirname,
  '..',
  '..',
  'attached_assets',
  'سياسة_الخصوصية_ري_باي_المالية_1788215944892.pdf',
);
const privacyPolicyFileName = 'privacy-policy/document.pdf';

function privacyPolicyDocument(): Plugin {
  return {
    name: 'privacy-policy-document',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const route = `${basePath!.replace(/\/+$/, '')}/${privacyPolicyFileName}`;
        if (req.url?.split('?')[0] !== route) return next();
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('X-Content-Type-Options', 'nosniff');
        createReadStream(privacyPolicySource)
          .on('error', () => {
            if (!res.headersSent) res.statusCode = 500;
            res.end();
          })
          .pipe(res);
      });
    },
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: privacyPolicyFileName,
        source: readFileSync(privacyPolicySource),
      });
    },
  };
}

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    privacyPolicyDocument(),
    runtimeErrorOverlay(),
    ...(process.env.NODE_ENV !== 'production' &&
    process.env.REPL_ID !== undefined
      ? [
          await import('@replit/vite-plugin-cartographer').then((m) =>
            m.cartographer({
              root: path.resolve(import.meta.dirname, '..'),
            }),
          ),
          await import('@replit/vite-plugin-dev-banner').then((m) =>
            m.devBanner(),
          ),
        ]
      : []),
  ],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
      '@assets': path.resolve(
        import.meta.dirname,
        '..',
        '..',
        'attached_assets',
      ),
    },
    dedupe: ['react', 'react-dom'],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, 'dist/public'),
    emptyOutDir: true,
  },
  server: {
    port,
    strictPort: true,
    host: '0.0.0.0',
    allowedHosts: true,
    fs: {
      strict: true,
    },
  },
  preview: {
    port,
    host: '0.0.0.0',
    allowedHosts: true,
  },
});
