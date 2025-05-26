export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig()
        const queries = getQuery(event)
        const {mal_id} = queries
        console.log('Fetching anime videos for mal_id:', mal_id)
        const { data, error } = await event.$fetch(`${config.public.baseURL}anime/${mal_id}/videos`)
        if(error) throw new Error('unable to get GetAnimeVideos')
        return {data: data, error: error}
    } catch (error) {
        console.error(error)
    }

})