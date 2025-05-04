export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const {data, error} = await event.$fetch(`${config.public.baseURL}reviews/anime`)
    
    if(error) throw new Error('unable to fetch RecentAnimeReviews: ', error)

    return {data:data, error: error}
  } catch (error) {
    throw new Error(error)
  }
})
