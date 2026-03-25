import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { copyFileSync, mkdirSync, existsSync, readFileSync, writeFileSync } from 'fs'

export default defineConfig({
plugins: [
react(),
{
name: 'copy-files',
closeBundle() {
const distPath = resolve(__dirname, 'dist')
mkdirSync(distPath, { recursive: true })




const manifestPath = resolve(__dirname, 'public/manifest.json')
    const manifest = JSON.parse(readFileSync(manifestPath, 'utf-8'))

    if (process.env.BROWSER === 'firefox') {
      console.log('Transforming manifest for Firefox...')
      if (manifest.background) {
        const sw = manifest.background.service_worker || 'background.js'
        // Firefox MV3 background.scripts doesn't use type: module or service_worker
        delete manifest.background.service_worker
        delete manifest.background.type
        manifest.background.scripts = [sw]
      }
    }
    
    writeFileSync(resolve(distPath, 'manifest.json'), JSON.stringify(manifest, null, 2))
    
    if (existsSync(resolve(distPath, 'src/popup/index.html'))) {
      copyFileSync(resolve(distPath, 'src/popup/index.html'), resolve(distPath, 'popup.html'))
    }
  }
}
],
build: {
outDir: 'dist',
emptyOutDir: true,
rollupOptions: {
input: {
popup: resolve(__dirname, 'src/popup/index.html'),
content: resolve(__dirname, 'src/content/index.ts'),
injected: resolve(__dirname, 'src/injected/index.ts'),
background: resolve(__dirname, 'src/background/index.ts')
},
output: {
entryFileNames: '[name].js'
}
}
}
})
