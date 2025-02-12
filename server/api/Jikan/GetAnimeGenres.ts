export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const {data, error} = await event.$fetch(`${config.public.baseURL}genres/anime`, {
      params: {"filter": "genres"}
    })
    if(error) {
      throw new error(`error!!!, unable to fetch genres: ${error}`)
    }
    return data
  } catch (error) {
    console.error(error)
  }
})
