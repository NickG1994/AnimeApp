export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const {data} = await event.$fetch(`${config.public.baseURL}watch/episodes`) 
    if(data.length <= 0) {
      throw new error(`There is no data returned from endpoint: ${data}`)
    }
    return data
  } catch (error) {
    console.error('Error in getting watch recent Anime endpoint: ', error)
  }
})
