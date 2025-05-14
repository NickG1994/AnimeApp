// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  ssr:true,
  runtimeConfig:{
    public:{
      baseURL:'https://api.jikan.moe/v4/'
    }
  },
  modules: ['@nuxtjs/tailwindcss','@pinia/nuxt','@vueuse/nuxt']
})
