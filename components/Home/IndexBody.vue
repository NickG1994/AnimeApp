<template>
  <div id="main">
    <!-- hero section -->
    <div v-if="!animeDataHeroCards || animeDataHeroCards.length == 0" class="skeleton w-full max-h-[550px] h-[550px] transition bg-accent2">
    </div>
    <div v-else class="relative bg-dark text-background">
      <div class="carousel w-full max-h-[550px] h-[550px] transition relative">
      <div :id="`heroSlide${index + 1}`" v-for="(animeCards, index) in animeDataHeroCards" :key="index" class="carousel-item w-full">
        <div class="hero relative bg-cover overflow-hidden object-fill">
          <img class="absolute right-0 w-screen" :src="animeCards.images.jpg?.large_image_url ?? 'https://placehold.co/200x400'" />
          <div class="absolute inset-0 bg-gradient-to-r from-dark via-transparent to-transparent shadow-[inset_600px_0px_50px_rgba(0,0,0,1)]"></div>
          <div class="hero-overlay bg-opacity-60"></div>
          <div class="hero-content text-background justify-self-start ml-8">
            <div class="max-w-md">
              <h3 class="text-accent1 font-bold">#{{ animeCards?.rank || 0 }} SpotLight</h3>
              <h1 class="mb-5 text-5xl font-bold text-primary">{{ animeCards?.title_english || 'error' }}</h1>
              <p class="mt-5 text-secondary">
                {{ animeCards.synopsis.substring(0, 120) }}...
              </p>
              <div class="flex gap-3 mt-5">
                <button class="btn bg-primary text-background hover:bg-hover" @click="watchNowRoute(animeCards.mal_id)">Watch now</button>
                <button class="btn bg-secondary text-background hover:bg-hover" @click="watchRoute(animeCards.mal_id, animeCards.title_english, animeCards)">Details ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      <!-- button -->
      <div class="absolute right-5 lg:top-1/2 bottom-[10%] flex flex-col gap-4">
        <button class="btn btn-circle bg-primary text-background hover:bg-hover" @click="prev('heroSlide', animeDataHeroCards.length)">❮</button>
        <button class="btn btn-circle bg-primary text-background hover:bg-hover" @click="next('heroSlide', animeDataHeroCards.length)">❯</button>
      </div>
    </div>

    <!-- Trending Cards -->
    <div class="p-4 mb-4 bg-dark text-background">
      <h3 class="title text-2xl font-bold mb-4 text-primary">Trending</h3>
      <div class="flex justify-between gap-4 p-6">
        <div class="carousel w-full flex justify-around pt-8 pb-8">
          <div v-if="!animeDataChunk || animeDataChunk.length === 0" class="flex justify-between gap-6 flex-shrink-1 m-4 p-8">
            <div v-for="(skeleton, index) in chunkSize" :key="index" class="flex w-52 flex-col gap-4">
              <div class="skeleton h-32 w-full bg-accent2"></div>
              <div class="skeleton h-4 w-28 bg-accent1"></div>
              <div class="skeleton h-4 w-full bg-accent1"></div>
              <div class="skeleton h-4 w-full bg-accent1"></div>
            </div>
          </div>
          <div v-else :id="`trendingCard${animeDataChunkIndex + 1}`" v-for="(slides, animeDataChunkIndex) in animeDataChunk" :key="animeDataChunkIndex" 
          class="carousel-item min-w-full justify-around">                      
            <button 
              v-for="(slide, index) in slides" 
              :key="slide.mal_id" 
              class="card card-side flex justify-between w-auto bg-base-100 shadow-xl hover:scale-125 transition" 
              @click="watchRoute(slide.mal_id, slide.title, slide)"
            >
              <figure class="basis-[90%] flex-shrink-0 flex items-center justify-center">
                <img :src="slide.images.jpg.image_url" alt="" class="w-auto h-64 ">
              </figure>
              <div class="card-body basis-[10%] flex items-center justify-center p-0 flex-shrink relative bg-base-100">
                <p class="whitespace-nowrap rotate-[-90deg] text-lg font-bold leading-none absolute mt-auto text-primary">
                  {{ slide.title.length <= 10 ? slide.title : slide.title.substring(0, 20) + ' ...' }}
                </p>
                <h5 class="absolute bottom-0 font-bold text-lg text-accent1">0{{ (index + 1) }}</h5>
              </div>
            </button>
          </div>
        </div>
        <div class="flex flex-col gap-4 justify-center">
          <button class="btn flex-1 bg-primary text-background hover:bg-hover" @click="prev('trendingCard', animeDataChunk.length)">❮</button>
          <button class="btn flex-1 bg-primary text-background hover:bg-hover" @click="next('trendingCard', animeDataChunk.length)">❯</button>
        </div>
      </div>
    </div>

    <!-- share site section links/buttons -->
    <div class="m-6 mt-24 flex flex-col md:flex-row md:items-center gap-8">
      <div class="flex items-center gap-4">
        <!-- Share Site Image -->
        <img
          class="w-16 h-16 sm:w-auto rounded-full object-cover mx-auto md:mx-0"
          src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTJydzE1ZWE2YmpqZTVuYXN3czltbHV0aHZ0d2g2d2J0MWU3ZzBleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ayMW3eqvuP00o/giphy.gif"
          alt="Share Site"
        />

        <!-- Share Site Text -->
        <div class="text-center md:text-left">
          <span class="text-yellow-500 text-lg font-bold">Share Site</span>
          <p class="text-gray-500">To Your Friends</p>
        </div>
      </div>


      <!-- Share Buttons -->
      <div class="flex flex-wrap justify-center md:justify-start gap-4">
        <button class="btn btn-wide w-32 h-auto rounded-full flex items-center gap-2">
          <img class="w-5" src="../../public/arrow-share.svg" alt="Share Icon" />
          <span>Share</span>
        </button>
        <button class="btn btn-wide w-16 h-auto rounded-full bg-black-500 flex items-center justify-center">
          <img class="w-5" src="../../public/x-icon.svg" alt="Close Icon" />
        </button>
        <button class="btn btn-wide w-16 h-auto rounded-full bg-blue-500 flex items-center justify-center">
          <img class="w-5" src="../../public/facebook-icon.svg" alt="Facebook Icon" />
        </button>
        <button class="btn btn-wide w-16 h-auto rounded-full bg-orange-500 flex items-center justify-center">
          <img class="w-5" src="../../public/reddit-icon.svg" alt="Reddit Icon" />
        </button>
        <button class="btn btn-wide w-16 h-auto rounded-full flex items-center justify-center">
          <img class="w-5" src="../../public/arrow-share.svg" alt="Share Icon" />
        </button>
      </div>
    </div>

    <!-- Comments/Reviews -->
    <div  class="overflow-hidden bg-gray-900 p-4">
      <div class="flex justify-between mb-12">
        <h3 class="title text-2xl font-bold text-accent1">Recent Reviews</h3>
        <button class="btn bg-accent2 text-dark hover:bg-primary">See more ></button>
      </div>

      <div class="flex justify-between gap-4 p-6">
        <div v-if="animeDataChunkReview" class="carousel flex gap-4">
          <div 
            :id="`reviewCard${(index + 1)}`" 
            ref="courselCard" 
            class="flex gap-4 w-[100%] justify-around" 
            v-for="(cards, index) in animeDataChunkReview" :key="index">
              <div class="card bg-dark text-background shadow-xl w-[100vw]" v-for="(slide, reviewIndex) in cards" :key="slide.mal_id">
                <div v-if="animeDataChunkReview?.length <= 0" class="flex w-52 flex-col gap-4">
                  <div class="skeleton h-32 w-full bg-accent2"></div>
                  <div class="skeleton h-4 w-28 bg-accent1"></div>
                  <div class="skeleton h-4 w-full bg-accent1"></div>
                  <div class="skeleton h-4 w-full bg-accent1"></div>
                </div>
                <div v-else class="carousel-item flex flex-col">
                  <figure class="flex items-center">
                    <img class="w-16 h-16 rounded-full mr-6 border-2 border-accent2" 
                    :src="slide.user.images.webp?.image_url? 
                    slide.user.images.webp?.image_url 
                    : 'https://placehold.co/600x400'" />
                    <div class="container text-accent1">{{ slide.user?.username  }}</div>
                  </figure>
                  <div class="card-body">
                    <p class="text-secondary">
                      {{ slide?.review <= 150 ? slide?.review : slide.review?.substring(0,150) }}
                    </p>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div class="flex flex-col gap-4 justify-center basis-[5%]">
        <button class="btn flex-1 bg-primary text-background hover:bg-hover" @click="prev('reviewCard', animeDataChunkReview.length)">❮</button>
        <button class="btn flex-1 bg-primary text-background hover:bg-hover" @click="next('reviewCard', animeDataChunkReview.length)">❯</button>
        </div>
      </div>
    </div>

    <div  class="overflow-hidden p-12">
      <!-- tables with 5 headers with 5 rows and 4 cols -->
        <div class="justify-between flex sm:flex-wrap flex-shrink-1 flex-grow-1 max-sm:flex-col gap-2">
        <!-- TOP AIRING -->
        <div class="col">

          <h2 class="title font-bold text-lg text-yellow-600"> Top Airing </h2>
          <div class="flex flex-col gap-12 w-[100%] h-[calc(100%/5)] mt-4" v-if="!getTopAnimeByAiringData || getTopAnimeByAiringData.length === 0">
            <div v-for="(skeleton, index ) in 5" :key="index" class="flex w-[100%] gap-6">
              <div class="skeleton w-[60px] h-[90px] w-full basis-[30%]"></div>
              <div class="basis-[70%]">
                <div class="skeleton h-2 w-28 mt-4"></div>
                <div class="skeleton h-2 w-full mt-4"></div>
                <div class="skeleton h-2 w-full mt-4"></div>
              </div>
            </div>
          </div>             
          <div v-else class="data card card-side border-b rounded-none" v-for="(TopAiringAnime, index) in getTopAnimeByAiringData" :key="TopAiringAnime.mal_id">
            <figure class="w-[60px]"><img :src="TopAiringAnime.images.webp?.image_url"/></figure>
            <div class="card-body">
              <a @click="watchRoute(TopAiringAnime.mal_id, TopAiringAnime.english_title, TopAiringAnime)" class="title link">{{ TopAiringAnime?.title.length >= 21 ? `${TopAiringAnime?.title.substring(0,21)} ...` : TopAiringAnime.title  }}</a>
              <div class="subMeta flex items-center">
                <h4>{{ TopAiringAnime?.rating.length >= 10 ? TopAiringAnime?.rating.split(' ')[0] : TopAiringAnime?.rating }}</h4>
                <h4 class="ml-2 p-1"> <div class="relative inline-block h-[100%] align-middle"><span class="dot absolute top-0 bottom-0"></span></div> <span class="type ml-2">{{ TopAiringAnime?.type }}</span></h4>
              </div>
            </div>
          </div>              

        </div>
        <!-- MOST POPULAR -->
        <div class="col ">
          <h2 class="title font-bold text-lg text-yellow-600">Most Popular</h2>
          <div v-if="!getAnimeByPopularData || getAnimeByPopularData.length <= 0" class="flex flex-col gap-12 w-[100%] h-[calc(100%/5)] mt-4">
            <div v-for="(skeleton, index ) in 5" :key="index" class="flex w-[100%] gap-6">
              <div class="skeleton w-[60px] h-[90px] w-full basis-[30%]"></div>
              <div class="basis-[70%]">
                <div class="skeleton h-2 w-28 mt-4"></div>
                <div class="skeleton h-2 w-full mt-4"></div>
                <div class="skeleton h-2 w-full mt-4"></div>
              </div>
            </div>
          </div>
          <div v-else class="data card card-side border-b rounded-none" v-for="(TopPopAnime, index) in getAnimeByPopularData" :key="TopPopAnime.mal_id">
              <figure class="w-[70px]"><img :src="TopPopAnime.images.webp.image_url"/></figure>
              <div class="card-body">
                <a class="title link" @click="watchRoute(TopPopAnime.mal_id, TopPopAnime.english_title, TopPopAnime)">{{ TopPopAnime.title.length >= 21 ? `${TopPopAnime.title.substring(0,21)} ...` : TopPopAnime.title }}</a>
                <div class="subMeta flex items-center">
                  <h4>{{ TopPopAnime.rating.length >= 10 ? TopPopAnime.rating.split(' ')[0] : TopPopAnime.rating }}</h4>
                  <h4 class="ml-2 p-1"> <div class="relative inline-block h-[100%] align-middle"><span class="dot absolute top-0 bottom-0"></span></div> <span class="type ml-2">{{ TopPopAnime.type }}</span></h4>
                </div>

              </div>
          </div>
        </div>
        <!-- MOST FAVORITE -->
        <div class="col">
          <h2 class="title font-bold text-lg text-yellow-600">Most Favorite </h2>
          <div class="flex flex-col gap-12 w-[100%] h-[calc(100%/5)] mt-4" v-if="!getAnimeByFavoriteData || getAnimeByFavoriteData.length === 0">
              <div v-for="(skeleton, index ) in 5" :key="index" class="flex w-[100%] gap-6">
                <div class="skeleton w-[60px] h-[90px] w-full basis-[30%]"></div>
                <div class="basis-[70%]">
                  <div class="skeleton h-2 w-28 mt-4"></div>
                  <div class="skeleton h-2 w-full mt-4"></div>
                  <div class="skeleton h-2 w-full mt-4"></div>
                </div>

              </div>
          </div>
          <div v-else class="data card card-side border-b rounded-none" v-for="(TopFavoriteAnime, index) in getAnimeByFavoriteData" :key="TopFavoriteAnime.mal_id">
              <figure class="w-[70px]"><img :src="TopFavoriteAnime.images.webp.image_url"/></figure>
              <div class="card-body">
                <a @click="watchRoute(TopFavoriteAnime.mal_id, TopFavoriteAnime.english_title, TopFavoriteAnime)" class="title link">{{ TopFavoriteAnime.title.length >= 21 ? `${TopFavoriteAnime.title.substring(0,21)} ...` : TopFavoriteAnime.title }}</a>
                <div class="subMeta flex items-center">
                  <h4>{{ TopFavoriteAnime.rating.length >= 10 ? TopFavoriteAnime.rating.split(' ')[0] : TopFavoriteAnime.rating  }}</h4>
                  <h4 class="ml-2 p-1"> <div class="relative inline-block h-[100%] align-middle"><span class="dot absolute top-0 bottom-0"></span></div> <span class="type ml-2">{{ TopFavoriteAnime.type }}</span></h4>
                </div>

              </div>
          </div>
        </div>
        <!-- UPCOMING ANIME -->
        <div class="col">
          <h2 class="title font-bold text-lg text-yellow-600"> Upcoming </h2>
          <div class="flex flex-col gap-12 w-[100%] h-[calc(100%/5)] mt-4" v-if="!getAnimeByUpcomingData || getAnimeByUpcomingData.length === 0">
            <div v-for="(skeleton, index ) in 5" :key="index" class="flex w-[100%] gap-6">
                <div class="skeleton w-[60px] h-[90px] w-full basis-[30%]"></div>
                <div class="basis-[70%]">
                  <div class="skeleton h-2 w-28 mt-4"></div>
                  <div class="skeleton h-2 w-full mt-4"></div>
                  <div class="skeleton h-2 w-full mt-4"></div>
                </div>

            </div>
          </div>
          <div v-else class="data card card-side border-b rounded-none" v-for="(AnimeByUpcoming, index) in getAnimeByUpcomingData" :key="AnimeByUpcoming.mal_id">
            <figure class="w-[70px]"><img :src="AnimeByUpcoming.images.webp.image_url"/></figure>
            <div class="card-body">
              <a class="title link" @click="watchRoute(AnimeByUpcoming.mal_id, AnimeByUpcoming.title, AnimeByUpcoming)">{{ AnimeByUpcoming.title.length >= 21 ? `${AnimeByUpcoming.title.substring(0,21)} ...` : AnimeByUpcoming.title }}</a>
              <div class="subMeta flex items-center">
                <h4>{{ AnimeByUpcoming.rating.length >= 10 ? AnimeByUpcoming.rating.split(' ')[0] : AnimeByUpcoming.rating }}</h4>
                <h4 class="ml-2 p-1"> <div class="relative inline-block h-[100%] align-middle"><span class="dot absolute top-0 bottom-0"></span></div> <span class="type ml-2">{{ AnimeByUpcoming.type }}</span></h4>
              </div>
            </div>
          </div>
        </div>
        </div>

      <!-- flex left basis-70% - right basis-30  -->
      <div class="flex max-sm:flex-col mt-12">
      <!-- left -->
      <div class="flex-item-left basis-[75%]">
        <div>

          <div class="flex justify-between">
            <h3 class="title text-2xl font-bold text-primary">Recent Episodes</h3>
            <button class="btn bg-secondary text-background hover:bg-hover">See more ></button>
          </div>
          <div v-if="refRecentEpisodesLoading" class="flex flex-wrap gap-4 justify-around p-4">
            <div class="card bg-base-100 shadow-xl basis-[calc(100%/7)]" v-for="(getRecentAnime, index) in getRecentWatchAnimeData" :key="getRecentAnime.entry.mal_id">
              <figure class="h-[100%]"><div class="skeleton h-32 w-full bg-accent2"></div></figure>
              <div class="card-body p-5">
                <div class="skeleton h-4 w-16 bg-accent1"></div>
                <div class="subMeta flex items-center">
                  <div class="skeleton h-4 w-full bg-accent1"></div>
                </div>
                <div class="skeleton h-4 w-full bg-accent1"></div>
              </div>
            </div>
          </div>
          <div v-else class="flex flex-wrap gap-4 justify-around p-4">
            <div class="card bg-base-100 shadow-xl basis-[calc(100%/7)]" v-for="(getRecentAnime, index) in getRecentWatchAnimeData" :key="getRecentAnime.entry.mal_id">
              <figure class="h-[100%]"><img class="h-[100%]" :src="getRecentAnime.entry.images.webp.image_url" /></figure>
              <div class="card-body p-5">
                <h3 class="title text-primary">{{ getRecentAnime.entry.title.length >= 12 ? getRecentAnime.entry.title.substring(0, 12) : getRecentAnime.entry.title }} ...</h3>
                <div class="subMeta flex items-center">
                  <span class="text-xs text-secondary">{{ getRecentAnime.region_locked === true ? "Region Locked" : "Region Unlocked" }}</span>
                </div>
                <button @click="watchRoute(getRecentAnime.entry.mal_id, getRecentAnime.entry.title, getRecentAnime)" class="btn bg-primary text-background hover:bg-hover">Watch</button>
              </div>
            </div>
          </div>

        </div>
        
        <div class="container">
          <div class="flex justify-between p-4">
            <h3 class="title text-2xl text-bold">Schedules</h3>
            <button class="btn">See more Schedules ></button>
          </div>
          <div class="container grow p-5">
            <div class="container flex max-sm:flex-wrap gap-4 justify-around mb-6" >
              <button class="btn button basis-auto " @click="e => selectDay(e)" v-for="(day, index) in days" :key="index" :value="day.dayValue">{{ day.title }}</button>
            </div>

            <div v-if="!getScheduleData || getScheduleData.length === 0" class="flex flex-col gap-6 justify-around">
              <button class="hover:bg-600-green hover:cursor-pointer item flex-nowrap flex gap-4 border-b rounded-none p-4" v-for="(ScheduleData,index) in getScheduleData" :key="ScheduleData.mal_id">
                <div id="schedule-flex-left" class="flex flex-col gap-4">
                  <div class="skeleton h-4 w-28"></div>
                  <div class="skeleton h-4 w-full"></div>
                  <div class="skeleton h-4 w-full"></div>
                </div>
                <div id="schedule-flex-right" class="flex justify-between w-full flex-row">
                  <span class="flex gap-4 flex-col inline-block">                
                    <div class="skeleton h-4 w-28"></div>
                    <div class="skeleton h-4 w-full"></div>
                    <div class="skeleton h-4 w-full"></div>
                  </span> 
                  <span class="flex gap-4 flex-col">
                    <div class="skeleton h-4 w-28"></div>
                    <div class="skeleton h-4 w-full"></div>
                    <div class="skeleton h-4 w-full"></div>
                  </span>
                </div>
              </button>
            </div>
            <!-- schedule table -->
            <table v-else class="flex flex-col gap-4 justify-around">
              <tr class="hover:bg-600-green hover:cursor-pointer item flex-nowrap flex gap-4 even:bg-black-900 p-2" v-for="(ScheduleData,index) in getScheduleData" :key="ScheduleData.mal_id">
                <td id="schedule-flex-left">
                  {{ ScheduleData.broadcast.string }}
                </td>
                <td id="schedule-flex-right" class="flex justify-between w-full">
                  <span class="inline-block">{{ ScheduleData.title }}</span> <span class="inline-block">{{ ScheduleData.broadcast.time }}</span>
                </td>
              </tr>
            </table>

          </div>

        </div>

      </div>
      <!-- right -->
      <div class="flex-item-right basis-[25%]">
        <div>
          <div class="genres flex p-4">
            <h3 class="title text-2xl text-bold">Genres</h3>
          </div>

          <div v-if="refGenreLoading" class="flex flex-wrap gap-2 justify-around bg-gray-900 rounded-xl">
            <h5 v-if="refGenreLoading" class=" p-4 text-center flex-wrap nth-[3n+1]:bg-600-blue" 
              v-for="genre in getAnimeGenresData" :key="genre.mal_id">
              {{ genre.name.length >= 8? genre.name.substring(0,8) + '...' :  genre.name}}
            </h5>
          </div>
        </div>
      </div>

      </div>
  
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue';
import { useJikenStore } from '~/store/store';
import { useWindowSize } from '@vueuse/core';
import { useMyWatchAnimeStore } from '~/store/AnimeDetails';

const { width } = useWindowSize();
const chunkSize = ref(4); // Default chunk size

const jikenStore = useJikenStore();
const refSelectedDay = ref('monday');

// Loading refs
const heroLoading = ref(false);
const isTrendingCardsLoading = ref(false);
const isReviewCardsLoading = ref(false);
const refScheduleLoading = ref(false);
const refRecentEpisodesLoading = ref(false);
const refGenreLoading = ref(false);

const courselCard = ref([]);

const {
  getTopAnimeByPopData,
  recentAnimeReviews,
  getRecentWatchAnimeData,
  getAnimeGenresData,
  animeDataHeroCards,
  getScheduleData,
  getAnimeByUpcomingData,
  getTopAnimeByAiringData,
  getAnimeByPopularData,
  getAnimeByFavoriteData,
} = storeToRefs(jikenStore);

const WatchStore = useMyWatchAnimeStore();
const { selectedWatch } = storeToRefs(WatchStore);

const days = [
  { id: 1, title: 'Monday', dayValue: 'monday' },
  { id: 2, title: 'Tuesday', dayValue: 'tuesday' },
  { id: 3, title: 'Wednesday', dayValue: 'wednesday' },
  { id: 4, title: 'Thursday', dayValue: 'thursday' },
  { id: 5, title: 'Friday', dayValue: 'friday' },
];

/*------------------------------------------------- */
/*-------------- Retry Logic Function ------------- */
/*------------------------------------------------- */
const fetchWithRetry = async (
  fetchFunction: () => Promise<any>,
  retries: number = 3,
  delay: number = 1000
): Promise<any> => {
  let attempt = 0;

  while (attempt < retries) {
    try {
      // Attempt to fetch data
      return await fetchFunction();
    } catch (error) {
      attempt++;
      console.error(`Attempt ${attempt} failed:`, error.message);

      if (attempt >= retries) {
        throw new Error(`Failed to fetch data after ${retries} attempts.`);
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
};

/*------------------------------------------------- */
/*------------------ Functions -------------------- */
/*------------------------------------------------- */
const DataChunk = async (rating: string | null, filter: string | null, limit: number) => {
  try {
    const data = await fetchWithRetry(
      async () => await jikenStore.getAnimeDataFilter(rating, filter, limit),
      3, // Number of retries
      1000 // Delay between retries in milliseconds
    );
    console.log(`Data fetched for filter "${filter}":`, data);
  } catch (error) {
    console.error(`Failed to fetch data for filter "${filter}":`, error.message);
  }
};

const selectDay = (event?: Event) => {
  if (!event) throw new Error('event is not defined in selectDay Function');
  event.stopPropagation();
  refSelectedDay.value = (event.target as HTMLButtonElement).value;
};

const animeDataChunkUpdate = () => {
  chunkSize.value = width.value >= 1300 ? 5 : width.value >= 768 ? 2 : 1;
};

const watchRoute = async (id: string, title: string, getRecentAnime: any) => {

  console.log('id: ', id, 'title:', title, 'getRecentAnime:', getRecentAnime);
  try {
    if (import.meta.client) {
    selectedWatch.value = getRecentAnime;

    // Set the anime ID in the store
    WatchStore.getAnime_id(id);

    // Fetch the anime data before navigating
    await WatchStore.fetchGetAnimeById();      
    }

    // Navigate to the anime details page with params
    navigateTo({
      path: `/anime/${id}`,
    });

  } catch (error) {
    console.error('Error in watchRoute:', error);
  }
};

const watchNowRoute = async (id: number) => {
  try {
    // Fetch the anime data before navigating
    //await WatchStore.fetchGetAnimeById();

    // Navigate to the anime details page with params
    navigateTo({
      path: `/watch/${id}`,
    })

  }
  catch {
    console.error('Error in watchNowRoute:', error);
  }
}

const currIndex = ref<Record<string, number>>({
  reviewCard: 1, // Initialize for review slider
  trending: 1,   // Initialize for trending slider
  hero: 1,       // Initialize for hero slider
});

// Function to scroll to a specific card
const goToCard = async (index: number, sliderId: string, maxIndex: number) => {
  // Wrap the index to stay within bounds
  if (index > maxIndex) {
    index = 1; // Wrap to the first card
  } else if (index < 1) {
    index = maxIndex; // Wrap to the last card
  }

  // Update the current index for the slider
  currIndex.value[sliderId] = index;

  // Scroll to the target card
  await nextTick();
  const el = document.getElementById(`${sliderId}${index}`);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
  } else {
    console.error(`Element with ID ${sliderId}${index} not found.`);
  }
};

// Function to navigate to the next card
const next = (sliderId: string, maxIndex: number) => {
  const currentIndex = currIndex.value[sliderId] || 1; // Default to 1 if undefined
  goToCard(currentIndex + 1, sliderId, maxIndex);
};

// Function to navigate to the previous card
const prev = (sliderId: string, maxIndex: number) => {
  const currentIndex = currIndex.value[sliderId] || 1; // Default to 1 if undefined
  goToCard(currentIndex - 1, sliderId, maxIndex);
};

/*------------------------------------------------- */
/*-------------- Life Cycles Functions ------------ */
/*------------------------------------------------- */
onMounted(async () => {
  try {
    await jikenStore.GetTopAnimeByPopularity();
  } catch (error) {
    console.error('Error fetching top anime by popularity:', error.message);
  }

  try {
    await jikenStore.getRecentAnimeReviews();
    isReviewCardsLoading.value = true;
  } catch (error) {
    console.error('Error fetching recent anime reviews:', error.message);
  }

  try {
    await jikenStore.getRecentWatchAnime();
  } catch (error) {
    console.error('Error fetching recent watch anime:', error.message);
  }

  try {
    await jikenStore.getAnimeGenres().then(() => {
      refGenreLoading.value = true;
    }).catch((error) => {
      refGenreLoading.value = false;
      console.error('Error fetching anime genres:', error.message);
    });
  } catch (error) {
    console.error('Error fetching anime genres:', error.message);
  }

  // Fetch each dataset individually
  try {
    await DataChunk(null, null, 4);
    console.log('Fetched general data chunk');
  } catch (error) {
    console.error('Error fetching general data chunk:', error.message);
  }

  try {
    await DataChunk('pg13', 'upcoming', 5);
  } catch (error) {
    console.error('Error fetching upcoming anime:', error.message);
  }

  try {
    await DataChunk('pg13', 'airing', 5);
  } catch (error) {
    console.error('Error fetching airing anime:', error.message);
  }

  try {
    await DataChunk('pg13', 'bypopularity', 5);
  } catch (error) {
    console.error('Error fetching anime by popularity:', error.message);
  }

  try {
    await DataChunk('pg13', 'favorite', 5);
  } catch (error) {
    console.error('Error fetching favorite anime:', error.message);
  }

  try {
    await jikenStore.getSchedules('monday');
    refScheduleLoading.value = true;
  } catch (error) {
    refScheduleLoading.value = false;
    console.error('Error fetching schedules:', error.message);
  }
});

/*------------------------------------------------- */
/*--------------- COMPUTED PROPERTIES ------------- */
/*------------------------------------------------- */
const createChunks = (data: any[], size: number) => {
  if (size <= 0) throw new Error(`chunkSize not initialized: ${size}`);
  const chunks = [];
  for (let i = 0; i < data.length; i += size) {
    chunks.push(data.slice(i, i + size));
  }
  return chunks;
};

const animeDataChunk = computed(() => createChunks(getTopAnimeByPopData.value, chunkSize.value));
const animeDataChunkReview = computed(() => createChunks(recentAnimeReviews.value, chunkSize.value));


/*------------------------------------------------- */
/*---------------- WATCH FUNCTIONS ---------------- */
/*------------------------------------------------- */
watch(refSelectedDay, async () => {
  await jikenStore.getSchedules(refSelectedDay.value);
});
watch(width, animeDataChunkUpdate, { immediate: true });
</script>

<style>
  .type {
    display: inline-block;
  }
  .dot {
    border: 1px solid red;
    margin: auto 0;
    border-radius: 50%;
    width: 5px;
    height: 5px;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 0.5s ease;
  }
  .list-enter-from,
  .list-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
</style>