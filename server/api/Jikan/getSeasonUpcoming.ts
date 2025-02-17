export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  const {data, error} = event.$fetch(`${config.public.baseURL}seasons/upcoming`)
})
