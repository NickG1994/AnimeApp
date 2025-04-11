import { defineStore } from "pinia"
import { useStorage } from '@vueuse/core';  // or wherever it's defined
import { meta } from "eslint-plugin-vue";

export const useJikenStore = defineStore('jikenStore',{
    state:()=>({
        GetTopAnimeData:[],
        GetTopAnimeByUpcoming: [],
        recentAnimeReviews: typeof window !== null? useStorage('recentAnimeReviews',[]) : [],
        getRecentWatchAnimeData: [],
        getAnimeGenresData: typeof window !== 'undefined'? useStorage('getAnimeGenresData',[]) : [],
        getRecommendationData: [],
        getScheduleData: typeof window !=='undefined'? useStorage('getScheduleData',[]) : [],
        getTopAnimeByPopData: typeof window !== 'undefined' ? useStorage('getTopAnimeByPopData', []) : [],
        animeDataHeroCards: typeof window !== 'undefined' ? useStorage('animeDataHeroCards', []) : [],
        getAnimeByUpcomingData: typeof window !== 'undefined' ? useStorage('getAnimeByUpcomingData', []) : [],
        getTopAnimeByAiringData: typeof window !== 'undefined' ? useStorage('getTopAnimeByAiringData', []) : [],
        getAnimeByPopularData: typeof window !== 'undefined' ? useStorage('getAnimeByPopularData', []) : [],
        getAnimeByFavoriteData: typeof window !== 'undefined' ? useStorage('getAnimeByFavoriteData', []) : [],
        getSearchAnime: typeof window !== 'undefined' ? useStorage('getSearchAnime',[]) :[]
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
                if(this.getTopAnimeByPopData.length > 0) {
                    return;
                }
                const data = await $fetch('/api/Jikan/GetTopAnimePopularity')
                this.getTopAnimeByPopData = data
            } catch (error) {
               console.error(error) 
            }
        },
        async getRecentAnimeReviews() {
            try {
            if(import.meta.client) {
                const storedData = JSON.parse(localStorage.getItem('recentAnimeReviews')) || null
                
                try {
                    if(storedData) {
                        //onsole.log('data stored: ',storedData) 
                        if(!Array.isArray(storedData)) {
                            localStorage.removeItem('recentAnimeReviews')
                            this.recentAnimeReviews = null
                        }
                    }
                } catch (error) {
                    console.error('no data: ',error)
                    localStorage.removeItem('recentAnimeReviews')
                    this.recentAnimeReviews = null
                } 
                if(!storedData) { 
                    const {data, error} = await $fetch('/api/Jikan/getRecentAnimeReviews')
                    this.recentAnimeReviews = data    
                    localStorage.setItem('recentAnimeReviews',JSON.stringify(data))   
                }   
                else {
                    this.recentAnimeReviews = storedData    
                    localStorage.setItem('recentAnimeReviews',JSON.stringify(storedData))
                }

            }
            }
            catch (error) {
                console.error(error)
                localStorage.removeItem('recentAnimeReviews')
                this.recentAnimeReviews = null
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
                const filter2Store = {
                    'upcoming':"getAnimeByUpcomingData",
                    'airing':'getTopAnimeByAiringData',
                    'bypopularity':'getAnimeByPopularData',
                    'favorite':'getAnimeByFavoriteData',
                    'null':'animeDataHeroCards',
                }

                if(import.meta.client) {
                    const delay = (time) => {
                        return new Promise((resolve) => {
                            setTimeout(resolve,time)
                        }) 
                    }

                    const key = filter2Store[filter] || "animeDataHeroCards";
                    let storedData = JSON.parse(localStorage.getItem(key));
                    //console.log(storedData)
                    try {
                        if(storedData) {
                            if(!Array.isArray(storedData)) {
                                localStorage.removeItem(key)
                                storedData = null
                            }
                        }
                    } catch (error) {
                        console.error('error parsing data in localstorage clearing localstorage for ', key)
                        localStorage.removeItem(key)
                        storedData = null
                    }
                    

                    if (!storedData) {
                        await delay(3000)
                        const data = await $fetch("/api/Jikan/GetTopAnimeFilter", {
                            query: { rating, filter, limit }
                        });
                       
                        //console.log('no stored data!!!')
                        localStorage.setItem(key, JSON.stringify(data)); // Store fetched data
                        this[key] = data;
                    } else {
                        this[key] = storedData;
                        //console.warn(`Persistent data fetched: ${key}`, this[key]);
                    }
                }
                
            } catch (error) {
                console.error("Error in getAnimeDataFilter:", error);
            }
        },
        async getAnimeGenres () {
            try {
                const storedData = JSON.parse(localStorage.getItem('getAnimeGenresData'))
                try {
                    if(storedData) {
                        if(!Array.isArray(storedData)) {
                            this.getAnimeGenres = null
                            localStorage.removeItem('getAnimeGenresData')
                        }
                        //console.log('genres: ', storedData)
                    }   
                } catch (error) {
                    this.getAnimeGenres = null
                    localStorage.removeItem('getAnimeGenresData')
                }
                if(!storedData) {
                    const data = await $fetch('/api/Jikan/GetAnimeGenres')
                    this.getAnimeGenresData = data
                    localStorage.setItem("getAnimeGenresData",JSON.stringify(data)) 
                    //console.log('genre get data: ', this.getAnimeGenresData)
                }
                else {
                    this.getAnimeGenresData = storedData
                    localStorage.setItem("getAnimeGenresData",JSON.stringify(storedData)) 
                    //console.log('genre persistant data: ', this.getAnimeGenresData)
                }

            } catch (error) {
                this.getAnimeGenres = null
                localStorage.removeItem('getAnimeGenresData')
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
                 const storedData = JSON.parse(localStorage.getItem('getScheduleData'))
                if(!storedData) {
                    const data = await $fetch('/api/Jikan/GetSchedules', {
                        params: {"filter" : daySelected}
                    })
                    this.getScheduleData = data
                    localStorage.setItem('getScheduleData',JSON.stringify(data))
                }   
                if(storedData) {
                    if(!Array.isArray(storedData)) {
                        this.getScheduleData = null
                        localStorage.removeItem('getScheduleData')
                    }
                    else {
                        this.getScheduleData = storedData
                        localStorage.setItem('getScheduleData',JSON.stringify(storedData))
                    }
                }
            } catch (error) {
                console.error(error)
                this.getScheduleData = null
                localStorage.removeItem('getScheduleData')
            }
        },

        async getAnimeSearch() {
            try {
                if(import.meta.client) {
                    const storedData = JSON.parse(localStorage.getItem('getSearchAnime')) || null

                    try {
                        if(storedData) {
                            if(Array.isArray(storedData)) {
                                this.getSearchAnime = null;
                                localStorage.removeItem('getSearchAnime')
                            }
                        }   
                    } catch (error) {
                        this.getSearchAnime = null;
                        localStorage.removeItem('getSearchAnime')
                        console.error('unable to get fetch data: ', error)
                    }

                    if(!storedData) {
                        const { data, error } = $fetch('api/Jikan/GetSearchAnime');
                        if(error) throw new Error(error)
                        localStorage.setItem('getSearchAnime', JSON.stringify(data));
                        this.getSearchAnime = data
                    }
                    else{
                       this.getAnimeSearch = storedData;
                       localStorage.setItem('getSearchAnime',JSON.stringify(storedData));
                    }


                }
            } catch (error) {
                console.error(error)
                this.getSearchAnime = null;
                localStorage.removeItem('getSearchAnime')
            }
        }
    }

})