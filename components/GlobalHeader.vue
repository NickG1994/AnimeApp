<template>
  <div class="w-full bg-dark text-background">
    <div class="navbar flex justify-between h-[77px] px-4 md:px-8 lg:px-12">
      <!-- Drawer for Mobile and Tablet -->
      <div class="flex-none">
        <div class="drawer">
          <input id="my-drawer" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content">
            <label for="my-drawer" class="btn btn-square btn-ghost drawer-button lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                class="inline-block h-5 w-5 stroke-current text-background">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>
          <div class="drawer-side z-40">
            <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
            <ul class="menu bg-secondary text-background min-h-full w-80 p-4">
              <!-- Sidebar content here -->
              <li>
                <NuxtLink to="/" class="hover:text-hover">Home</NuxtLink>
              </li>
              <li><a class="hover:text-hover">Sidebar Item 2</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Logo -->
      <div class="hidden lg:flex">
        <NuxtLink to="/" class="w-[220px] h-[120px] flex items-center justify-center">
          <img
            class="object-contain w-full h-full"
            src="~/assets/TakuTvLogo.png"
            alt="TakuTv Logo"
          />
        </NuxtLink>
      </div>

      <!-- Search Bar -->
      <div class="flex-grow md:flex md:justify-center lg:justify-start hidden md:block">
        <label class="input input-bordered flex items-center gap-2 w-full md:w-2/3 lg:w-1/2 bg-accent1 text-dark rounded-lg">
          <input type="text" class="grow bg-transparent placeholder-secondary" placeholder="Search" />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            class="h-4 w-4 opacity-70 text-dark">
            <path
              fill-rule="evenodd"
              d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
              clip-rule="evenodd" />
          </svg>
        </label>
      </div>

      <!-- Profile/Menu Button -->
      <div class="flex-none">
        <button class="btn btn-square btn-ghost hover:bg-hover">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            class="inline-block h-5 w-5 stroke-current text-background">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 1-2 0 1 1 0 012 0z"></path>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
</script>

<style scoped>
</style>