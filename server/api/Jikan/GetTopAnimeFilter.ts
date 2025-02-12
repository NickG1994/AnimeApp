export default defineEventHandler(async (event) => {
    try {
        const config = useRuntimeConfig(event);
        const queries = getQuery(event)
        const {rating, filter, limit} = queries
        console.log('inside api nuxt3 route!!! ', rating)
        console.log('inside api nuxt3 route!!! ', filter)
        console.log('inside api nuxt3 route!!! ', limit)
        // Fetch data from external API
        const data = await $fetch(`${config.public.baseURL}top/anime`,{
            params: {
                'rating': rating,
                'filter': filter,
                'limit': limit
            }
        });

        return data;
    } catch (error) {
        console.error("Error fetching anime data:", error);
        throw createError({ statusCode: 500, statusMessage: "Failed to fetch anime data" });
    }
});
