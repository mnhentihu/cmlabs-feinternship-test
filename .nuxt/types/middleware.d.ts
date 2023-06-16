import type { NavigationGuard } from 'vue-router'
export type MiddlewareKey = string
declare module "E:/Kerja/Magang/CMLABS/pre test/cmlabs-feinternship-test/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    middleware?: MiddlewareKey | NavigationGuard | Array<MiddlewareKey | NavigationGuard>
  }
}