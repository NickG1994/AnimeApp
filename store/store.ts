import { defineStore } from "pinia"
import { useStorage } from '@vueuse/core';  // or wherever it's defined

export const useJikenStore = defineStore('jikenStore',{
    state:()=>({
        GetTopAnimeData:[],
        GetTopAnimeByUpcoming: [],
        recentAnimeReviews: [],
        getRecentWatchAnimeData: [],
        getAnimeGenresData: typeof window !== 'undefined'? useStorage('getAnimeGenresData',[]) : [],
        getRecommendationData: [],
        getScheduleData: [],
        getTopAnimeByPopData: typeof window !== 'undefined' ? useStorage('getTopAnimeByPopData', []) : [],
        animeDataHeroCards: typeof window !== 'undefined' ? useStorage('animeDataHeroCards', []) : [],
        getAnimeByUpcomingData: typeof window !== 'undefined' ? useStorage('getAnimeByUpcomingData', []) : [],
        getTopAnimeByAiringData: typeof window !== 'undefined' ? useStorage('getTopAnimeByAiringData', []) : [],
        getAnimeByPopularData: typeof window !== 'undefined' ? useStorage('getAnimeByPopularData', []) : [],
        getAnimeByFavoriteData: typeof window !== 'undefined' ? useStorage('getAnimeByFavoriteData', []) : [],
    }),
    actions: {
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
                console.log(this.getTopAnimeByPopData.length)
                if(this.getTopAnimeByPopData.length > 0) {
                    console.warn(`getTopAnimeByPopData is already populated in store: ${this.getTopAnimeByPopData}`); 
                    return;
                }
                const data = await $fetch('/api/Jikan/GetTopAnimePopularity')
                this.getTopAnimeByPopData = data
                console.log('getting popular anime!!!', this.getTopAnimeByPopData)
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
                if(this.getRecentWatchAnimeData.length > 0) {
                    return 
                }
                // call api endpoint
                const data = await $fetch('/api/Jikan/getWatchRecentAnime');
                if(data.length <= 0) {
                    throw new Error(`no data when fecthing in store: ${data}`)
                }
                this.getRecentWatchAnimeData = data.slice(0,12)
            } catch (error) {
                console.error('error fetching watch recent anime data from store: ', error)
            }
            
        },
        async getAnimeDataFilter(rating = null, filter = null, limit = null) {
            try {

                    
                    if (filter === 'upcoming') {
                        const storedData = localStorage.getItem('getAnimeByUpcomingData');
                        if (!storedData) {
                            const data = await $fetch("/api/Jikan/GetTopAnimeFilter", {
                                query: { "rating": rating, "filter": filter, "limit": limit }
                            });
                            await delay(1000);
                            this.getAnimeByUpcomingData = data;
                            localStorage.setItem('getAnimeByUpcomingData', data);
                            console.log('data fetched: ', this.getAnimeByUpcomingData)
                        } else {
                            this.getAnimeByUpcomingData = JSON.parse(storedData);
                            console.log('persitant data fetched: ', JSON.parse(storedData))
                        }
                    }
        
                    if (filter === 'airing') {
                        const storedData = localStorage.getItem('getTopAnimeByAiringData');
                        if (!storedData) {
                            const data = await $fetch("/api/Jikan/GetTopAnimeFilter", {
                                query: { "rating": rating, "filter": filter, "limit": limit }
                            });
                            await delay(1000);
                            this.getTopAnimeByAiringData = data;
                            localStorage.setItem('getTopAnimeByAiringData', data);
                        } else {
                            this.getTopAnimeByAiringData = JSON.parse(storedData);
                        }
                    }
        
                    if (filter === 'bypopularity') {
                        const storedData = localStorage.getItem('getAnimeByPopularData');
                        if (!storedData) {
                            const data = await $fetch("/api/Jikan/GetTopAnimeFilter", {
                                query: { "rating": rating, "filter": filter, "limit": limit }
                            });
                            await delay(1000);
                            this.getAnimeByPopularData = data;
                            localStorage.setItem('getAnimeByPopularData', data);
                        } else {
                            this.getAnimeByPopularData = JSON.parse(storedData);
                        }
                    }
        
                    if (filter === 'favorite') {
                        const storedData = localStorage.getItem('getAnimeByFavoriteData');
                        if (!storedData) {
                            const data = await $fetch("/api/Jikan/GetTopAnimeFilter", {
                                query: { "rating": rating, "filter": filter, "limit": limit }
                            });
                            await delay(1000);
                            this.getAnimeByFavoriteData = data;
                            localStorage.setItem('getAnimeByFavoriteData', data);
                        } else {
                            this.getAnimeByFavoriteData = JSON.parse(storedData);
                        }
                    }
        
                    if (!filter) {
                        const storedData = localStorage.getItem('animeDataHeroCards');
                        if (!storedData) {
                            const data = await $fetch("/api/Jikan/GetTopAnimeFilter", {
                                query: { "rating": rating, "filter": filter, "limit": limit }
                            });
                            await delay(1000);
                            this.animeDataHeroCards = data;
                            localStorage.setItem('animeDataHeroCards', data);
                        } else {
                            this.animeDataHeroCards = JSON.parse(storedData);
                        }
                    }
                
                
            } catch (error) {
                console.error("Error in getAnimeDataFilter:", error);
            }
        },
        
        async getAnimeGenres () {
            try {
                const dataChunk = []
                const dataLimit = 20

                if(!JSON.parse(localStorage.getItem('getAnimeGenresData'))) {
                    const data = await $fetch('/api/Jikan/GetAnimeGenres')
                    this.getAnimeGenresData = data
                }
                else {
                    this.getAnimeGenresData = JSON.parse(localStorage.getItem('getAnimeGenresData'))
                }

            } catch (error) {
                console.error('error getting anime genres: ', error)
            }
        },
        async getAnimeRecommendations() {
            try {
                const data = await $fetch('/api/Jikan/getRecommendations')
                if(!data) throw new Error(`unable to fetch recommendations on store: ${data}`)
                this.getRecommendationData = data
            } catch (error) {
                console.error(error)
            }
        },
        async getSchedules(daySelected) {
            try {
                const data = await $fetch('/api/Jikan/GetSchedules', {
                    params: {"filter" : daySelected}
                })
                if(!data) throw new Error(`unable to fetch schdule in store: ${data}`)
                this.getScheduleData = data
            } catch (error) {
                console.error(error)
            }
        }
    }

})