export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();
    const queries = getQuery(event);
    const { data, error } = await event.$fetch(`${config.public.baseURL}/anime/${queries}/streaming`)
    if(error) throw new Error('unable to get GetAnimeStreaming')
    return { data: data, error: error };
})