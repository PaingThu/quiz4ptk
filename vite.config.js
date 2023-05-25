import { defineConfig } from 'vite'
// import { VitePWA } from "vite-plugin-pwa";
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
  // plugins: [vue(), VitePWA(
  //   {      
  //     manifest: { 
  //       icons: [
  //         {
  //           src: "favicon.ico",
  //           sizes: "512x512",
  //           type: "image/favicon",
  //           purpose: "any maskable"
  //         }
  //       ]
  //     }
  //   }
  // )],
})
