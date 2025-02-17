export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const {data, error} = await event.$fetch(`${config.public.baseURL}recommendations/anime`)
    if(!data) {
      throw new Error(`unable to reach data for recommendations: ${data}`)
    }
    return data
  } catch (error) {
    console.error(error)
  }
})
