import { ComputedRef, Ref } from 'vue'
export type LayoutKey = string
declare module "E:/Kerja/Magang/CMLABS/pre test/cmlabs-feinternship-test/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: false | LayoutKey | Ref<LayoutKey> | ComputedRef<LayoutKey>
  }
}