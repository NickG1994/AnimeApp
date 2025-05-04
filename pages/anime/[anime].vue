<template>
  <div id="main">
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div class="max-h-[550px] h-[550px] p-12 flex gap-6">
        <div class="left basis-[75%]">
          <div class="anime-info p-12 flex gap-6">
            <figure class="anime-info-image basis-[60%]">
              <img :src="getAnimeById?.images.webp?.image_url" />
            </figure>
            <div class="anime-info-content">
              <span class="breadcrumbs">
                <NuxtLink to="/">Home</NuxtLink>
                <span>{{ getAnimeById?.type || '' }}</span>
                <span>{{ getAnimeById?.background || '' }}</span>
              </span>
              <h1 class="mb-6 text-4xl">{{ getAnimeById?.title || 'error' }}</h1>

              <span class="left-meta">
                <span>{{ getAnimeById.rating || 'error' }}</span>
                <span>HD</span>
                <span>2</span>
                <span>TV</span>
                <span>24m</span>
              </span>

              <div class="button__container">
                <button class="btn mr-4">Watch Now</button>
                <button class="btn">Add To List</button>

                <div class="synopsis">
                  {{ getAnimeById?.synopsis }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="right basis-[25%]">
          <div class="meta-info container flex flex-col gap-6 align-middle">
            <div class="meta-lang">
              Japanese title: {{ getAnimeById.title_japanese || 'error' }}
            </div>
            <div class="meta-aired">
              Aired: {{ getAnimeById.aired?.string || 'error' }}
            </div>
            <div class="meta-premiered">
              Premiered: Spring 2025
            </div>
            <div class="meta-status">
              Status: {{ getAnimeById?.status || 'error' }}
            </div>
            <div class="meta-score">
              MAL Score: {{ getAnimeById?.score || 'error' }}
            </div>
            <div class="meta-genre">
              Genres:
              <span v-for="(genre, index) in getAnimeById.genres" :key="index">
                {{ genre.name }}<span v-if="index < getAnimeById.genres.length - 1">, </span>
              </span>
            </div>
            <div class="meta-studio">
              Studios:
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
import { useMyWatchAnimeStore } from '~/store/WatchAnime';

const WatchStore = useMyWatchAnimeStore();
const { getAnimeById } = storeToRefs(WatchStore);
const loading = ref(true);

onMounted(async () => {
  const { anime_id } = useRoute().query;
  if (anime_id) {
    console.log('Anime ID:', anime_id);
    WatchStore.getAnime_id(anime_id);
    await WatchStore.fetchGetAnimeById();
    console.log('Anime Data:', getAnimeById.value);
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