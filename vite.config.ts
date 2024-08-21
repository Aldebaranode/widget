// @ts-nocheck
import { resolve } from 'path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import viteCompression from 'vite-plugin-compression2';
import { viteSingleFile } from "vite-plugin-singlefile"
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import nodePolyfills from 'rollup-plugin-polyfill-node';
import inject from '@rollup/plugin-inject';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), cssInjectedByJsPlugin(), viteSingleFile(), viteCompression()],
  resolve: {
    preserveSymlinks: true,
    alias: {
      path: 'path-browserify',
      stream: 'stream-browserify',
      crypto: 'crypto-browserify',
      assert: 'assert-browserify',
    },
  },
  optimizeDeps: {
    force: true,
    esbuildOptions: {
      target: ['es2020'],
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
      ],
    },
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'build',
      // the proper extensions will be added
      fileName: 'build',
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
      plugins: [
        nodePolyfills({
          process: true,
          buffer: true,
        }),
        inject({ Buffer: ['buffer', 'Buffer'] }),
      ],
    },
  },
});
