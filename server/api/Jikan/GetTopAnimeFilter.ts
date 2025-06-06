export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig(event);
        const queries = getQuery(event)
        const {rating, filter, limit} = queries
        // Fetch data from external API
        const {data, error} = await $fetch(`${config.public.baseURL}top/anime`,{
            params: {
                'rating': rating,
                'filter': filter,
                'limit': limit
            }
        });
        return {data: data, error: error};
    } catch (error) {
        console.error("Error fetching anime data:", error);
        throw createError({ statusCode: 500, statusMessage: "Failed to fetch anime data" });
    }
});
