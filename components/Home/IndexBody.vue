<template>
  <div>
    <!-- hero section -->
    <div v-if="animeDataHeroCards.length <= 0" class="skeleton w-full max-h-[550px] h-[550px] transition"></div>
    <div v-else class="carousel w-full max-h-[550px] h-[550px] transition">
      <div :id="`slide${index + 1}`" v-for="(animeCards, index) in animeDataHeroCards" :key="index" class="carousel-item w-full">
        <div
          class="hero relative bg-cover overflow-hidden">
          <img class="absolute right-0 width-400" src="https://placehold.co/1000x600" />
          <div class="absolute inset-0 bg-gradient-to-r from-black via-transparent to-transparent shadow-[inset_600px_0px_50px_rgba(0,0,0,0.7)]"></div>
          <div class="hero-overlay bg-opacity-60"></div>
          <div class="hero-content text-neutral-content justify-self-start ml-8">
            <div class="max-w-md">
              <h3>#{{ animeCards.rank }} SpotLight</h3>
              <h1 class="mb-5 text-5xl font-bold">{{ animeCards.title_english}}</h1>
              <span class="flex gap-4 inline-block"><h4 class="media-type">{{ animeCards.type }}</h4><h4 class="episiode-length">{{animeCards.duration.split(' ')[0]}}m</h4><h4 class="premiered">{{ animeCards.aired.from}}</h4></span>
              <p class="mt-5">
                {{ animeCards.synopsis.substring(0,160) }}
                ...
              </p>
              <div class="flex gap-3 mt-5">
                <button class="btn btn-primary round">Watch now</button>
                <button class="btn btn-primary">Details ></button>
              </div>
            </div>
          </div>
          <div class="absolute right-5 top-1/2 flex">
            <a :href="`#slide${index <= 0 ? Math.abs((index -1) * 4)  : (index + 1) - 1 }`" class="btn btn-circle">❮</a>
            <a :href="`#slide${(index + 1) >= 4 ? 1 : index + 2}`" class="btn btn-circle">❯</a>
          </div>
        </div>
      </div>
    </div>

    <!-- Trending Cards -->
    
     <div  class="m-4 overflow-hidden"> 
      <h3 class="title text-2xl text-bold mb-4 font-bold">Trending</h3>
      <div class="carousel overflow-x-auto flex flex-nowrap">
        <div v-if="animeDataChunk.length <= 0" class="skeleton h-64 w-auto m-6"></div>
        <div 
          v-else
          :id="`slidcards${animeDataChunkIndex + 1}`" 
          v-for="(slides, animeDataChunkIndex) in animeDataChunk" 
          :key="animeDataChunkIndex"
          class="flex flex-shrink-1 min-w-full gap-6 justify-between m-4 p-6" 
          >

            <button 
              v-for="(slide, index) in slides" 
              :key="slide.mal_id"
              class="card card-side bg-base-100 shadow-xl w-[calc(100%/7)] hover:scale-125 transition " 
            >

              <figure class="basis-[90%] flex-shrink-0 flex items-center justify-center">
                <img :src="slide.images.jpg.image_url" alt="" class="w-auto h-64 object-contain">
              </figure>

              <div class="card-body basis-[10%] flex items-center justify-center p-0 flex-shrink relative">
                <p class="whitespace-nowrap rotate-[-90deg] text-lg font-bold leading-none absolute mt-auto text-white">{{ slide.title.length <= 10 ? slide.title : slide.title.substring(0,20) + ' ...'}}</p>
                <h5 class="absolute bottom-0 font-bold text-lg text-yellow-600">0{{ (index + 1) }}</h5>
              </div>
              
            </button> 

            <div class="flex flex-col gap-4 justify-center">

              <a :href="`#slidcards${animeDataChunkIndex <= 0 ? Math.abs((animeDataChunkIndex -1) * 6)  : (animeDataChunkIndex + 1) - 1 }`" class="btn flex-1">❮</a>
              <a :href="`#slidcards${(animeDataChunkIndex + 1) >= 6 ? 1 : animeDataChunkIndex + 2}`" class="btn flex-1">❯</a>

            </div>

        </div>

      </div>

      <!-- share site section links/buttons -->
      <div class="m-4 flex gap-8">
        <img class="w-16 rounded-full cover" src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMTJydzE1ZWE2YmpqZTVuYXN3czltbHV0aHZ0d2g2d2J0MWU3ZzBleSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ayMW3eqvuP00o/giphy.gif" />
        <div class="subTitle">
          <span class="color-yellow-500">Share Site</span>
          <p>To Your Friends</p>
        </div>
        <div>
          <button class="btn btn-wide w-32 h-auto rounded-full mr-2"><img class="contain w-5" src="../../public/arrow-share.svg" /><span>share</span></button>
          <button class="btn btn-wide w-16 h-auto rounded-full bg-black-500 mr-2"><img class="contain w-5" src="../../public/x-icon.svg" /></button>
          <button class="btn btn-wide w-16 h-auto rounded-full bg-blue-500 mr-2"><img class="contain w-5" src="../../public/facebook-icon.svg" /></button>
          <button class="btn btn-wide w-16 h-auto rounded-full bg-orange-500 mr-2"><img class="contain w-5" src="../../public/reddit-icon.svg" /></button>
          <button class="btn btn-wide w-16 h-auto rounded-full"><img class="contain w-5" src="../../public/arrow-share.svg" /></button>
        </div>
       
      </div>
     </div>

    <!-- Comments/Reviews -->
    <div  class="overflow-hidden">
      <div class="flex justify-between p-4">
        <h3 class="title text-2xl text-bold">Recent Reviews</h3>
        <button class="btn">See more ></button>
      </div>
      <div v-if="animeDataChunkReview.length <= 0" class="skeleton h-64 w-auto m-6"></div>
      <div v-else class="carousel overflow-hidden">
        <div :id="`reviewCard${(index + 1)}`" class="flex flex-nowrap gap-4 w-[100vw] justify-between p-4" v-for="(cards, index) in animeDataChunkReview" :key="index">
          <div class="card bg-base-100 shadow-xl w-[calc(100vw/6)] " v-for="(slide, reviewIndex) in cards" :key="slide.mal_id">
            <div v-if="!isReviewCardsLoading" class="flex w-52 flex-col gap-4">
            <div class="skeleton h-32 w-full"></div>
            <div class="skeleton h-4 w-28"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-full"></div>
          </div>
          <div v-else>

            <figure class="flex items-center">
              <img class="w-16 rounded-full mr-6" :src="slide.user.images.webp.image_url? slide.user.images.webp.image_url : 'https://placehold.co/600x400'"/>
              <div class="container">{{ slide.user.username  }}</div>
            </figure>
            <div class="card-body">
              {{ slide.review <= 150 ? slide.review : slide.review.substring(0,150) }}
            </div>
            </div>

          </div>
          <div class="flex flex-col gap-4 justify-center">
            <button :href="`#reviewCard${index <= 0 ? Math.abs((index -1) * 6)  : (index + 1) - 1 }`" class="btn flex-1">❮</button>
            <button :href="`#reviewCard${(index + 1) >= 6 ? 1 : index + 2}`" class="btn flex-1">❯</button>
          </div>

          </div>
        </div>

     </div>
    </div>

    <!-- tables with 5 headers with 5 rows and 4 cols -->
    <div class="p-4">
      <div>
        <div class="row justify-between flex">
          <div class="col w-[calc(100%/4)]">
            <h2 class="title font-bold text-lg text-yellow-600">Top Airing </h2>
            <div class="data card card-side" v-for="(TopAiringAnime, index) in refGetTopAnimeByAiringData" :key="TopAiringAnime.mal_id">
              <figure class="w-[50px]"><img :src="TopAiringAnime.images.webp.image_url"/></figure>
              <div class="card-body">
                <h3 class="title">{{ TopAiringAnime.title }}</h3>
              <div class="subMeta flex items-center">
                <h4>{{ TopAiringAnime.rating }}</h4>
                <h4 class="ml-2 p-1"> <div class="relative inline-block h-[100%] align-middle"><span class="dot absolute top-0 bottom-0"></span></div> <span class="type ml-2">{{ TopAiringAnime.type }}</span></h4>
              </div>
              </div>

            </div>
          </div>
          <div class="col w-[calc(100%/4)]">
            <h2 class="title font-bold text-lg text-yellow-600">Most Popular </h2>
            <div class="data card card-side" v-for="(TopAiringAnime, index) in refGetAnimeByPopular" :key="TopAiringAnime.mal_id">
              <figure class="w-[50px]"><img :src="TopAiringAnime.images.webp.image_url"/></figure>
              <div class="card-body">
                <h3 class="title">{{ TopAiringAnime.title }}</h3>
                <div class="subMeta flex items-center">
                  <h4>{{ TopAiringAnime.rating }}</h4>
                  <h4 class="ml-2 p-1"> <div class="relative inline-block h-[100%] align-middle"><span class="dot absolute top-0 bottom-0"></span></div> <span class="type ml-2">{{ TopAiringAnime.type }}</span></h4>
                </div>

              </div>
            </div>
          </div>
          <div class="col w-[calc(100%/4)]">
            <h2 class="title font-bold text-lg text-yellow-600">Most Favorite </h2>
            <div class="data card card-side" v-for="(TopAiringAnime, index) in refGetAnimeByFavorite" :key="TopAiringAnime.mal_id">
              <figure class="w-[50px]"><img :src="TopAiringAnime.images.webp.image_url"/></figure>
              <div class="card-body">
                <h3 class="title">{{ TopAiringAnime.title }}</h3>
                <div class="subMeta flex items-center">
                  <h4>{{ TopAiringAnime.rating }}</h4>
                  <h4 class="ml-2 p-1"> <div class="relative inline-block h-[100%] align-middle"><span class="dot absolute top-0 bottom-0"></span></div> <span class="type ml-2">{{ TopAiringAnime.type }}</span></h4>
                </div>

              </div>
            </div>
          </div>
          <div class="col w-[calc(100%/4)]">
            <h2 class="title font-bold text-lg text-yellow-600"> Upcoming </h2>
            <div class="flex flex-col gap-12 w-[100%] h-[calc(100%/5)]" v-if="refAnimeByUpcoming.length <= 0">
              <div v-for="(skeleton, index ) in 3" :key="index" class="flex w-full flex-col gap-4 basis-[calc(100%/5)]">
                <div class="skeleton h-32 w-full"></div>
                <div class="skeleton h-4 w-28"></div>
                <div class="skeleton h-4 w-full"></div>
                <div class="skeleton h-4 w-full"></div>
              </div>
            </div>

            <div v-else v-for="(TopAiringAnime, index) in refAnimeByUpcoming" :key="TopAiringAnime.mal_id">
              <div class="card card-side" >
                <figure class="w-[50px]"><img :src="TopAiringAnime.images.webp.image_url"/></figure>
                <div class="card-body">
                  <h3 class="title">{{ TopAiringAnime.title }}</h3>
                  <div class="subMeta flex items-center">
                    <h4>{{ TopAiringAnime.rating }}</h4>
                    <h4 class="ml-2 p-1"> <div class="relative inline-block h-[100%] align-middle"><span class="dot absolute top-0 bottom-0"></span></div> <span class="type ml-2">{{ TopAiringAnime.type }}</span></h4>
                  </div>

                </div>
              </div>

            </div>
            
          </div>

        </div>
      </div>
     </div>

    <div class="flex">
      <div class="flex-item-left basis-[70%] p-2">
        <div>
          <div class="flex justify-between p-4">
            <h3 class="title text-2xl text-bold">Recent Episodes</h3>
            <button class="btn">See more ></button>
          </div>
          <div class="flex flex-wrap gap-4 justify-around">
            <div class="card bg-base-100 shadow-xl w-[15%]" v-for="(getRecentAnime, index) in getRecentWatchAnimeData" :key="getRecentAnime.entry.mal_id">
              <figure class="h-[100%]"><img class="h-[100%]" :src="getRecentAnime.entry.images.webp.image_url"/></figure>
              <div class="card-body p-5">
                <h3 class="title">{{ getRecentAnime.entry.title.length >= 15 ? getRecentAnime.entry.title.substring(0,15) : getRecentAnime.entry.title}} ...</h3>
                <div class="subMeta flex items-center">
                  <span class="text-xs">{{ getRecentAnime.region_locked === true? "Region Locked" : "Region Unlocked"}}</span>
                </div>
                <button class="btn button">Watch</button>
              </div>
            </div>
          </div>

        </div>

      </div>
      <div class="flex-item-right basis-[30%] p-2">
        <div>
          <div class="genres flex p-4">
            <h3 class="title text-2xl text-bold">Genres</h3>
          </div>
          <div class="flex flex-wrap gap-4">
            <div class="basis-[calc(100%/4)] p-4 bg-sky-600 text-center" v-for="genre in getAnimeGenresData" :key="genre.mal_id">{{ genre.name.length >= 8? genre.name.substring(0,8) + '...' :  genre.name}}</div>
          </div>
        </div>

      </div>
    </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useJikenStore } from '~/store/store';
  const jikenStore = useJikenStore()
  const animeDataHeroCards = ref([])
  const refAnimeByUpcoming = ref([])
  //const refGetAnimeByUpcoming = ref([])
  const refGetTopAnimeByAiringData = ref([])
  const refGetAnimeByPopular = ref([])
  const refGetAnimeByFavorite = ref([])
  ref
  // loading refs
  const heroLoading = ref(false)
  const isTrendingCardsLoading = ref(false)
  const isReviewCardsLoading = ref(false)

  const {
    GetTopAnimeData,
    getTopAnimeByPopData,
    recentAnimeReviews,
    getRecentWatchAnimeData,
    getAnimeGenresData,
  } = storeToRefs(jikenStore)
  /*------------------------------------------------- */
  /*-------------- Life Cycles Functions ------------ */
  /*------------------------------------------------- */
  onMounted(async () => {
  try {
    
    await jikenStore.GetTopAnime().finally((response) =>{ heroLoading.value = true; console.log('Done!!!: ', heroLoading.value)});
    await jikenStore.GetTopAnimeByPopularity();
    await jikenStore.getRecentAnimeReviews().finally(() => {console.log('review finished loading'); isReviewCardsLoading.value = true});
    await jikenStore.getRecentWatchAnime()
    await jikenStore.getAnimeGenres()

    // Ensure the ref exists before passing it
      await DataChunk(animeDataHeroCards,null,null, 4)
      await DataChunk(refAnimeByUpcoming, 'pg13', 'upcoming', 5)
      await DataChunk(refGetTopAnimeByAiringData,'pg13', 'airing', 5)
      await DataChunk(refGetAnimeByPopular, 'pg13', 'bypopularity', 5)
      await DataChunk(refGetAnimeByFavorite,'pg13', 'favorite', 5)
    
      console.log('on mounted animeDataHeroCards: ', animeDataHeroCards.value.target);
      console.log('on mounted refAnimeByUpcoming: ', refAnimeByUpcoming.value.length);
      console.log('on mounted refGetTopAnimeByAiringData: ', refGetTopAnimeByAiringData.value);
      console.log('on mounted refGetAnimeByPopular: ', refGetAnimeByPopular.value);
      console.log('on mounted refGetAnimeByFavorite: ', refGetAnimeByFavorite.value);
      console.log('getRecentWatchAnime: ', getRecentWatchAnimeData.value)
      console.log('getAnimeGenresData: ', getAnimeGenresData.value)
  } catch (error) {
    console.error(error);
  }
});

  /*------------------------------------------------- */
  /*-------------- Computed Properties -------------- */
  /*------------------------------------------------- */
  const animeDataChunk = computed(() => {
  let chunks = [];
  const chunkSize = 6;
  for (let i = 0; i < getTopAnimeByPopData.value.length; i += chunkSize) {
      chunks.push(getTopAnimeByPopData.value.slice(i, i + chunkSize));
    }
    return chunks; // ✅ Make sure to return the computed result
  });

  const animeDataChunkReview = computed(() => {
    let dataChunkReview = []
    const chunkSize = 5
    for(let x = 0; x <= recentAnimeReviews.value.length; x += 5) {
      dataChunkReview.push(recentAnimeReviews.value.slice(x, x+chunkSize ))
    }
    //console.log(dataChunkReview)
    return dataChunkReview
  })
  /*------------------------------------------------- */
  /*------------------ Functions -------------------- */
  /*------------------------------------------------- */
  /**
   * function will perform calculations and 
   * @param <endpoint>
   * @param <number of data>
   * @param <store ref>
   */
  const DataChunk = async (animeDataRef, rating, filter, limit) => {
      console.log('rating:', rating);
      console.log('filter:', filter);
      console.log('limit: ', limit)
      const { data, error } = await jikenStore.getAnimeDataFilter(rating, filter, limit);
      console.log('data: ', data)
      console.log('error: ', error)
      if (!data) {
        console.error('Unable to get data');
        return;
      }
      // Ensure ref exists before modifying it
      if (!animeDataRef) {
        console.error('animeDataRef is undefined');
        return;
      }

      if(animeDataRef.value.length >= 5){
        // Assign only the first 5 results
        animeDataRef.value = data.slice(0, 5);
      }
      else {
        animeDataRef.value = data
      }
  };


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
</style>