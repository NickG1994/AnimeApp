import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useMyWatchNowStore = defineStore('myWatchNowStore',{
  state: () => ({
    getAnimeById: typeof window !== 'undefined' ? useStorage('getAnimeById', []) : [],
    mal_id: typeof window !== 'undefined' ? useStorage('mal_id', '') : '',
    watchNowVideoData: typeof window !== 'undefined' ? useStorage('watchNowVideoData', []) : [],
   }),
  actions: {
    async fetchWatchNowAnime() {
      try {
        if (import.meta.client) {
          const savedData = JSON.parse(localStorage.getItem('getAnimeById') || 'null');
          const savedMalId = JSON.parse(localStorage.getItem('mal_id') || 'null');
          // Clear stale data if mal_id has changed
          if (savedMalId !== this.mal_id) { 
            //console.log('Clearing stale data for mal_id:', savedMalId);
            localStorage.removeItem('getAnimeById');
          }

          if (savedData) {
            this.getAnimeById = savedData;
          } else {
            const {data, error} = await $fetch('/api/Jikan/GetAnimeById', {
              params: { anime_id: this.mal_id },
            });
            //console.log('Fetched data for mal_id:', this.mal_id, data);

            this.getAnimeById = data;
            localStorage.setItem('getAnimeById', JSON.stringify(data));
            localStorage.setItem('mal_id', JSON.stringify(this.mal_id)); // Save the current mal_id
          }
        }

      } catch (error) {
        console.error('Error fetching anime by ID:', error);
      }
    },
    async fetchWatchNowVideoData(mal_id: string) {
      try {
        if (!import.meta.client) return; // Ensure this runs only on the client

        console.log('Current mal_id:', this.mal_id, 'Provided mal_id:', mal_id);

        // Check if data exists in localStorage
        const savedData = JSON.parse(localStorage.getItem('watchNowVideoData') || 'null');

        // If saved data exists and matches the current mal_id, use it
        if (savedData && this.mal_id === mal_id) {
          if (!Array.isArray(savedData) && savedData.length === 0) {
            console.warn('Invalid or empty saved data. Clearing localStorage.');
            localStorage.removeItem('watchNowVideoData');
            this.watchNowVideoData = [];
            return;
          }

          console.log('Using cached watchNowVideoData:', savedData);
          this.watchNowVideoData = savedData;
          return;
        }

        // If no valid saved data, fetch fresh data from the API
        console.log('Fetching fresh watchNowVideoData for mal_id:', mal_id);
        const {data, error} = await $fetch('/api/Jikan/getAnimeVideos', {
          query: { mal_id: mal_id },
        });
        console.log('Fetched data:', data);
        if (!data || error) {
          throw new Error(`Invalid data received from API ${error}`);
        }

        // Save the fetched data to localStorage and update the state
        this.watchNowVideoData = data;
        this.setMalId(mal_id); // Update mal_id
        localStorage.setItem('watchNowVideoData', JSON.stringify(data));
        console.log('Fetched and saved watchNowVideoData:', data);
      } catch (error) {
        // Handle errors and clear invalid data
        console.error('Error fetching watchNowVideoData:', error);
        localStorage.removeItem('watchNowVideoData');
        this.watchNowVideoData = [];
      }
     },
    setMalId(mal_id: string) {  
      this.mal_id = mal_id;
      console.log('Setting mal_id:', mal_id);
      if (import.meta.client) {
        localStorage.setItem('mal_id', JSON.stringify(mal_id));
      }
    }
  }
})
