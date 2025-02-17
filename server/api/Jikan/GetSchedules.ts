export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig(event)
    const {data,error} = await event.$fetch(`${config.public.baseURL}schedules`,
      {
        params: {"limit":10,"sfw":true}
      }
    )

    if(error) throw new Error(`unable to ${error}`)
    return data
  } catch (error) {
    
  }

})
