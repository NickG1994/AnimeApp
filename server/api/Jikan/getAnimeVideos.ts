export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const {data, error} = await event.$fetch(config.public.baseURL)
        if(error) throw new Error('unable to get GetAnimeVideos')
        return data
    } catch (error) {
        console.error(error)
    }

})