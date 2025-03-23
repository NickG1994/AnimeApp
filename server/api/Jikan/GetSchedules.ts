export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const {filter} = getQuery(event)
    const {data,error} = await event.$fetch(`${config.public.baseURL}schedules`,
      {
        params: {"limit":10,"sfw":true, 'filter':filter}
      }
    )

    if(error) throw new Error(`unable to ${error}`)
    return data
  } catch (error) {
    
  }

})
