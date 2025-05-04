export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event)
  try {
    const params = getQuery(event) // ✅ define it first

    const { anime_id } = params

    const url = `${config.public.baseURL}anime/${anime_id}`

    console.log('params in fetch: ', anime_id)
    console.log(url)

    if(!params || params === undefined) throw new Error(`error id not found: ${anime_id}`)

    const {data, error} = await $fetch(url)

    if(error || !data) throw new Error(error)
      
    return {data: data, error: error}
  } catch (error) {
    console.error('unable to fetch data from getAnimeById: ', error.message)
  }

})
