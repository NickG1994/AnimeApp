export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const {data, error} = await event.$fetch(`${config.public.baseURL}top/anime`, {
      method:'GET',
      params:{
        filter:'bypopularity'
      }
    })

    if(error) {
      throw new error('error: ', error)
      return
    }

    return data

  } catch (error) {
    console.error(error)
  }
})
