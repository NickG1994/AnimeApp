import { defineNuxtConfig } from "nuxt/config"

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)

  const {data, error} = event.$fetch(`${config.public.baseURL}/anime`,{
    query:{
      genres: 2
    }
  })

  return {data: data, error: error}

})
