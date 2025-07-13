<template>
  <div id="main" class="p-4 md:p-8 lg:p-12">
    <div v-if="loading" class="text-center text-lg font-bold h-screen flex items-center justify-center">
      <span class="loading loading-spinner text-primary"></span>
    </div>
    <div v-else>
      <!-- Main Container -->
      <div class="flex flex-col lg:flex-row gap-6">
        <!-- Left Section -->
        <div class="left lg:basis-[75%] flex flex-col gap-6">
          <!-- Anime Info -->
          <div class="anime-info flex flex-col md:flex-row gap-6 bg-gray-800 p-6 rounded-lg shadow-lg">
            <!-- Anime Image -->
            <figure class="anime-info-image w-full md:basis-[40%] flex-shrink-0">
              <img
                :src="getAnimeById?.images.webp?.image_url ?? ''"
                alt="Anime Image"
                class="w-full h-auto rounded-lg object-cover"
              />
            </figure>
            <!-- Anime Content -->
            <div class="anime-info-content flex flex-col gap-4">
              <!-- Breadcrumbs -->
              <span class="breadcrumbs text-sm text-gray-400 flex gap-2">
                <NuxtLink to="/" class="hover:underline text-yellow-500">Home</NuxtLink>
                <span>/</span>
                <span>{{ getAnimeById?.type || '' }}</span>
                <span>/</span>
                <span>{{ $route.name }}</span>
              </span>
              <!-- Title -->
              <h1 class="text-2xl md:text-4xl font-bold text-white">{{ getAnimeById?.title || 'Error' }}</h1>
              <!-- Meta Info -->
              <div class="left-meta flex flex-wrap gap-2 text-sm text-gray-300">
                <span class="bg-gray-700 px-2 py-1 rounded">{{ getAnimeById.rating || 'N/A' }}</span>
                <span class="bg-gray-700 px-2 py-1 rounded">HD</span>
                <span class="bg-gray-700 px-2 py-1 rounded">2</span>
                <span class="bg-gray-700 px-2 py-1 rounded">TV</span>
                <span class="bg-gray-700 px-2 py-1 rounded">24m</span>
              </div>
              <!-- Buttons -->
              <div class="button__container flex gap-4 mt-4">
                <button class="btn bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg shadow">
                  Watch Now
                </button>
                <button class="btn bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow">
                  Add To List
                </button>
              </div>
              <!-- Synopsis -->
              <div class="synopsis text-gray-300 text-sm mt-4">
                {{ getAnimeById?.synopsis || 'No synopsis available.' }}
              </div>
            </div>
          </div>
        </div>

        <!-- Right Section -->
        <div class="right lg:basis-[25%] bg-gray-900 p-6 rounded-lg shadow-lg">
          <div class="meta-info flex flex-col gap-4 text-sm text-gray-300">
            <div class="meta-lang">
              <strong class="text-yellow-500">Japanese Title:</strong> {{ getAnimeById.title_japanese || 'N/A' }}
            </div>
            <div class="meta-aired">
              <strong class="text-yellow-500">Aired:</strong> {{ getAnimeById.aired?.string || 'N/A' }}
            </div>
            <div class="meta-premiered">
              <strong class="text-yellow-500">Premiered:</strong> Spring 2025
            </div>
            <div class="meta-status">
              <strong class="text-yellow-500">Status:</strong> {{ getAnimeById?.status || 'N/A' }}
            </div>
            <div class="meta-score">
              <strong class="text-yellow-500">MAL Score:</strong> {{ getAnimeById?.score || 'N/A' }}
            </div>
            <div class="meta-genre">
              <strong class="text-yellow-500">Genres:</strong>
              <span v-for="(genre, index) in getAnimeById.genres" :key="index">
                {{ genre.name }}<span v-if="index < getAnimeById.genres.length - 1">, </span>
              </span>
            </div>
            <div class="meta-studio">
              <strong class="text-yellow-500">Studios:</strong>
              <span v-for="(studio, index) in getAnimeById.studios" :key="index">
                {{ studio.name }}<span v-if="index < getAnimeById.studios.length - 1">, </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useMyWatchAnimeStore } from '~/store/AnimeDetails';

const WatchStore = useMyWatchAnimeStore();
const { getAnimeById } = storeToRefs(WatchStore);
const loading = ref(true);

onMounted(async () => {
  const { anime_id } = useRoute().params;
  console.log('route: ', useRoute().params);
  if (anime_id) {
    WatchStore.getAnime_id(anime_id);
    await WatchStore.fetchGetAnimeById();
    if (getAnimeById.value) {
      console.log('Anime Data:', getAnimeById.value);
    } else {
      console.error('No anime data found.');
    }
    // Check if the anime data is loaded
    loading.value = false;
  } else {
    console.error('Anime ID is missing in the route query.');
    loading.value = false;
  }
});
</script>

<style>
/* Add margin to the left of each metadata card */
.meta-info > div {
  margin-bottom: 1rem; /* Adds spacing between metadata items */
  margin-left: 1rem; /* Adds left margin to each metadata item */
}

/* Add a gray background to the right card */
.right {
  background-color: #111827; /* Light gray background */
  padding: 1rem; /* Add padding inside the card */
  border-radius: 8px; /* Optional: Add rounded corners */
}
.breadcrumbs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.left-meta {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}
.left-meta span {
  background-color: #111827;
  padding: 0.5rem;
  border-radius: 4px;
}

.button_container {
  display: flex;
  gap: 1rem;
}
.synopsis {
  margin-top: 1rem;
  font-size: 0.9rem;
  color: #555;
}
</style>