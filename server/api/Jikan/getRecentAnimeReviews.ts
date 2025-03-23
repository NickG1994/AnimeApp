export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const {data, error} = await event.$fetch(`${config.public.baseURL}reviews/anime`)
    //console.log('data reviews api: ', data)
    if(error) throw new Error('unable to fetch RecentAnimeReviews: ', error)
    return data
  } catch (error) {
    throw new Error(error)
  }
})
