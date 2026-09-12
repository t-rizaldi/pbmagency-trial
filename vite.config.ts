import fs from 'node:fs';
import path from 'node:path';
import inertia from '@inertiajs/vite';
import { wayfinder } from '@laravel/vite-plugin-wayfinder';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
import { defineConfig, type Plugin } from 'vite';
import { compression } from 'vite-plugin-compression2';

function servePublicAssets(): Plugin {
    return {
        name: 'serve-public-assets',
        configureServer(server) {
            server.middlewares.use((req, res, next) => {
                if (!req.url) return next();
                const rawPath = req.url.split('?')[0];
                let decodedPath = '';
                try {
                    decodedPath = decodeURIComponent(rawPath);
                } catch {
                    decodedPath = rawPath;
                }

                if (
                    decodedPath.startsWith('/assets/') ||
                    decodedPath.startsWith('/logo/') ||
                    decodedPath === '/favicon.ico'
                ) {
                    const filePath = path.resolve(__dirname, 'public', '.' + decodedPath);
                    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
                        const ext = path.extname(filePath).toLowerCase();
                        const mimes: Record<string, string> = {
                            '.png': 'image/png',
                            '.webp': 'image/webp',
                            '.jpg': 'image/jpeg',
                            '.jpeg': 'image/jpeg',
                            '.gif': 'image/gif',
                            '.svg': 'image/svg+xml',
                            '.ico': 'image/x-icon',
                            '.mp4': 'video/mp4',
                            '.woff': 'font/woff',
                            '.woff2': 'font/woff2',
                        };
                        const contentType = mimes[ext] || 'application/octet-stream';
                        const stat = fs.statSync(filePath);
                        const range = req.headers.range;

                        if (range) {
                            const parts = range.replace(/bytes=/, '').split('-');
                            const start = parseInt(parts[0], 10);
                            const end = parts[1] ? parseInt(parts[1], 10) : stat.size - 1;
                            const chunksize = end - start + 1;
                            res.writeHead(206, {
                                'Content-Range': `bytes ${start}-${end}/${stat.size}`,
                                'Accept-Ranges': 'bytes',
                                'Content-Length': chunksize,
                                'Content-Type': contentType,
                            });
                            fs.createReadStream(filePath, { start, end }).pipe(res);
                            return;
                        }

                        res.writeHead(200, {
                            'Content-Length': stat.size,
                            'Content-Type': contentType,
                            'Cache-Control': 'no-cache',
                        });
                        fs.createReadStream(filePath).pipe(res);
                        return;
                    }
                }
                next();
            });
        },
    };
}

export default defineConfig({
    plugins: [
        servePublicAssets(),
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.tsx'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
                bunny('Space Grotesk', {
                    weights: [600, 700],
                }),
                bunny('Nunito', {
                    weights: [400, 500, 600, 700, 800, 900],
                }),
            ],
        }),
        inertia(),
        react({
            babel: {
                plugins: ['babel-plugin-react-compiler'],
            },
        }),
        tailwindcss(),
        wayfinder({
            formVariants: true,
        }),
        // Add Gzip and Brotli compression
        compression({ algorithm: 'gzip', exclude: [/\.(br)$/, /\.(gz)$/] }),
        compression({ algorithm: 'brotliCompress', exclude: [/\.(br)$/, /\.(gz)$/] }),
    ],
    build: {
        rollupOptions: {
            output: {
                manualChunks(id) {
                    // React core — always needed, long-lived cache
                    if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
                        return 'react-vendor';
                    }
                    // Lucide icons — shared across pages
                    if (id.includes('node_modules/lucide-react')) {
                        return 'icons-vendor';
                    }
                    // Vite will naturally code-split the rest!
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    }
});