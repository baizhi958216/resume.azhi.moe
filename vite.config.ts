import process from 'node:process'

import { cloudflare } from '@cloudflare/vite-plugin'
import { kvDataAdapter } from '@vinext/cloudflare/cache/kv-data-adapter'
import { imagesOptimizer } from '@vinext/cloudflare/images/images-optimizer'
import vinext from 'vinext'
import { defineConfig } from 'vite'

// macOS Seatbelt blocks FSEvents, so Codex previews need polling for HMR.
const isCodexSeatbeltSandbox = process.env.CODEX_SANDBOX === 'seatbelt'

export default defineConfig({
  server: isCodexSeatbeltSandbox
    ? { watch: { useFsEvents: false, usePolling: true } }
    : undefined,
  plugins: [
    vinext({
      cache: { data: kvDataAdapter() },
      images: { optimizer: imagesOptimizer() },
      prerender: { routes: '*' },
    }),
    cloudflare({
      viteEnvironment: {
        name: 'rsc',
        childEnvironments: ['ssr'],
      },
    }),
  ],
})
