export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig(event)
        const {data, error} = await event.$fetch(`${config.public.baseURL}top/anime`,{
            method:'GET'
        })
        if(error) throw new Error('unable to fetch topAnime api: ', error)
        return data
    } catch (error) {
        console.error(error)
    }

})