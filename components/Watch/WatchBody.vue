<template>
  <div>
    <div class="flex flex-col lg:flex-row justify-around gap-6 p-4">
      <!-- Left Card: Video Player -->
      <div class="left-card w-full lg:w-[70%]">
        <figure class="relative">
          <iframe
            v-if="watchNowVideoData.promo && watchNowVideoData.promo.length > 0"
            class="w-full h-[500px] rounded-lg shadow-lg"
            :src="watchNowVideoData?.promo[0]?.trailer.embed_url || `https://www.youtube.com/embed/${$route.params.watch_now}`"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <figcaption class="text-center text-gray-500 mt-2">Watch Now</figcaption>
        </figure>
      </div>

      <!-- Right Card: Additional Options -->
      <div class="right-card w-full lg:w-[30%] bg-gray-800 p-6 rounded-lg shadow-lg">
        <div class="right-card-header mb-4">
          <h1 class="text-2xl font-bold text-white">Episodes</h1>
        </div>
        <div class="right-card-body">
          <ul v-if="watchNowVideoData.episodes" class="list-none p-0 flex flex-wrap gap-2">
            <li
              v-for="(episode, index) in watchNowVideoData?.episodes || []"
              :key="index"
              class="btn text-white hover:text-blue-400 transition-colors cursor-pointer display-block"
              @click="fetchWatchNowVideoData(episode.id)"
            >
              {{ episode.episode.split(' ')[1] }} - {{ episode.title }}
              </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'vue-router';
import { useMyWatchNowStore } from '~/store/watchNow';
const useWatchStore = useMyWatchNowStore()

const {watchNowVideoData} = storeToRefs(useWatchStore);
const {fetchWatchNowAnime, fetchWatchNowVideoData}  = useWatchStore;

onMounted(() => {
  const { watch_now } = useRoute().params; // Use the correct parameter name
  try {
    fetchWatchNowAnime(watch_now);
  } catch (error) {
    console.error('Error selecting watch now:', error);
  }
  try {
    fetchWatchNowVideoData(watch_now);
  } catch (error) {
    console.error('Error fetching video data:', error);
  }
});
</script>

<style>

</style>