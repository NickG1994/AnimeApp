import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'


export const useMyWatchAnimeStore = defineStore('myWatchAnimeStore',{
  state: () => ({
    selectedWatch: typeof window !== 'undefined'? useStorage('selectedWatch', []) : [],
    getAnimeById: typeof window !== 'undefined' ? useStorage('getAnimeById', []) : [],
    mal_id: typeof window !== 'undefined' ? useStorage('mal_id', '' ): ''
   }),
  actions: {
    async fetchGetAnimeById() {
      try {
        if (import.meta.client) {
          const savedData = JSON.parse(localStorage.getItem('getAnimeById') || 'null');
          const savedMalId = JSON.parse(localStorage.getItem('mal_id') || 'null');
          // Clear stale data if mal_id has changed
          if (savedMalId !== this.mal_id) {
            console.log('Clearing stale data for mal_id:', savedMalId);
            localStorage.removeItem('getAnimeById');
          }

          if (savedData && savedData.mal_id === this.mal_id) {
            this.getAnimeById = savedData;
          } else {
            const {data} = await $fetch('/api/Jikan/GetAnimeById', {
              params: { anime_id: this.mal_id },
            });

            this.getAnimeById = data;
            localStorage.setItem('getAnimeById', JSON.stringify(data));
            localStorage.setItem('mal_id', JSON.stringify(this.mal_id)); // Save the current mal_id
          }
        }
      } catch (error) {
        console.error('Error fetching anime by ID:', error);
        this.getAnimeById = null;
        localStorage.removeItem('getAnimeById');
      }
    },
    getAnime_id(getAnime_id: string) {
      try {
        if (import.meta.client) {
          this.mal_id = getAnime_id; // Update the store's mal_id
          localStorage.setItem('mal_id', JSON.stringify(getAnime_id)); // Save to localStorage
        }
      } catch (error) {
        console.error('Error setting anime ID:', error);
        this.mal_id = ''; // Reset mal_id on error
        localStorage.removeItem('mal_id'); // Clear localStorage on error
      }
    }
  }
})
