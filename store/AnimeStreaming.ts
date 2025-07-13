import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'

export const useMyAnimeStreamingStore = defineStore('myAnimeStreamingStore', {
  state: () => ({
    videoStreamingID: typeof window !== 'undefined' ? useStorage('videoStreamingID', '') : '',
    VideoStreamingData: typeof window !== 'undefined' ? useStorage('videoStreamingData', {}) : {}
  }),
  actions: {
    setVideoStreamingID(id: string) {
      this.videoStreamingID = id
    },
    clearVideoStreamingID() {
      this.videoStreamingID = ''
    },
    fetchVideoStreamingID() {
      // This function can be used to fetch the video streaming ID from an API or other source
      // For now, it just returns the current ID
      return this.videoStreamingID
    },
    setVideoStreamingData() {
      if (import.meta.client) {
        this.VideoStreamingData = localStorage.getItem('videoStreamingData') ? JSON.parse(localStorage.getItem('videoStreamingData') || '[]') : []
        try {
          //check if the data is an array of objects
          if (Array.isArray(this.VideoStreamingData) && this.VideoStreamingData.length > 0) {
            this.VideoStreamingData = {}
            localStorage.removeItem('videoStreamingData')
          }
        } catch (error) {
          cobsole.error('Error parsing videoStreamingData from localStorage:', error) 
          this.VideoStreamingData = {}
          localStorage.removeItem('videoStreamingData')
        }
        try {
          if(this.VideoStreamingData && Object.keys(this.VideoStreamingData).length > 0) {
            this.VideoStreamingData = localStorage.getItem('videoStreamingData') ? JSON.parse(localStorage.getItem('videoStreamingData') || '{}') : {}
          }
        } catch (error) {
          console.error('Error setting videoStreamingData:', error)
          this.VideoStreamingData = {}
          localStorage.removeItem('videoStreamingData')
        }
      }
    },
  }
})


