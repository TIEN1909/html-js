import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import fsExtra from 'fs-extra'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const ROOT = __dirname
const ASSETS = resolve(ROOT, '..')
const PUBLIC = resolve(ROOT, 'public')

// Copy static assets into public dir before build/dev
function copyAssets() {
  const dirs = ['images', 'session1', 'session0']
  for (const dir of dirs) {
    const src = resolve(ASSETS, dir)
    const dest = resolve(PUBLIC, dir)
    if (fsExtra.existsSync(src)) {
      if (fsExtra.existsSync(dest)) {
        try { fsExtra.rmSync(dest, { recursive: true, force: true }) } catch {}
      }
      console.log(`Copying ${src} → ${dest}`)
      fsExtra.copySync(src, dest)
    } else {
      console.warn(`Source not found: ${src}`)
    }
  }
  // session2: only copy if source has actual content; never wipe existing public/session2
  const src2 = resolve(ASSETS, 'session2')
  const dest2 = resolve(PUBLIC, 'session2')
  if (fsExtra.existsSync(src2)) {
    const srcFrames = resolve(src2, 'frames')
    const hasFramesInSrc = fsExtra.existsSync(srcFrames) && fsExtra.readdirSync(srcFrames).length > 0
    if (hasFramesInSrc) {
      if (fsExtra.existsSync(dest2)) {
        try { fsExtra.rmSync(dest2, { recursive: true, force: true }) } catch {}
      }
      console.log(`Copying ${src2} → ${dest2}`)
      fsExtra.copySync(src2, dest2)
    } else {
      console.warn(`Source session2 has no frames, skipping copy to preserve existing assets`)
    }
  }
}
copyAssets()

export default defineConfig({
  plugins: [react()],
  root: ROOT,
  base: './',
  publicDir: 'public',
  build: {
    outDir: resolve(ROOT, 'dist'),
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    host: true,
    fs: {
      allow: [ROOT, ASSETS],
    },
  },
})
