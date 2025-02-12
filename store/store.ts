import { defineStore } from "pinia"
import getAnimeGenres from "~/server/api/Jikan/GetAnimeGenres"
export const useJikenStore = defineStore('jikenStore',{
    state:()=>({
        GetTopAnimeData:[],
        getTopAnimeByPopData: [],
        GetTopAnimeByUpcoming: [],
        recentAnimeReviews: [],
        getAnimeRequestData:[],
        getRecentWatchAnimeData: [],
        getAnimeGenresData: []
    
    }),
    actions:{
        async GetTopAnime() {
            try {
                const data = await $fetch('/api/Jikan/GetTopAnime')
                this.GetTopAnimeData = data 
            } catch (error) {
                console.error(error)
            }
        },
        async GetTopAnimeByPopularity() {
            try {
                const data = await $fetch('/api/Jikan/GetTopAnimePopularity')
                this.getTopAnimeByPopData = data
            } catch (error) {
               console.error(error) 
            }
        },
        async getRecentAnimeReviews() {
            try {
                const data = await $fetch('/api/Jikan/getRecentAnimeReviews')
                console.log('recentReviewsData: ', data)
                this.recentAnimeReviews = data
            } catch (error) {
                console.error(error)
            }
        },
        async getRecentWatchAnime() {
            
            try {
                // call api endpoint
                const data = await $fetch('/api/Jikan/getWatchRecentAnime');
                if(data.length <= 0) {
                    throw new Error(`no data when fecthing in store: ${data}`)
                }
                this.getRecentWatchAnimeData = data
            } catch (error) {
                console.error('error fetching watch recent anime data from store: ', error)
            }
            
        },
        async getAnimeDataFilter(rating = null, filter = null, limit = null) {
            try {
                console.log("Fetching anime data with filters...");
                const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                // Fetch data using only the query parameters
                const data = await $fetch("/api/Jikan/GetTopAnimeFilter", {
                    query: {
                        "rating": rating,
                        "filter": filter,
                        "limit": limit
                    }
                });
                await delay(1000)
                if (data) {
                    this.getAnimeRequestData = data;
                }
                console.log('anime with filters data!!!', data)
        
                return data;
            } catch (error) {
                console.error("Error in getAnimeDataFilter:", error);
            }
        },
        async getAnimeGenres () {
            try {
                const dataChunk = []
                const dataLimit = 20

                const data = await $fetch('/api/Jikan/GetAnimeGenres')
                for(let x = 0; x <= dataLimit; x++ ) {
                    console.error(data[x])
                    dataChunk.push(data[x])
                }

                if(data) {
                    this.getAnimeGenresData = data
                }

                //this.getAnimeGenresData = data
            } catch (error) {
                console.error('error getting anime genres: ', error)
            }
        }
        
        

        
    }
})