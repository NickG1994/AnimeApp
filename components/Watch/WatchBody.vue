<template>
  <div>

  </div>
</template>

<script lang="ts" setup>
  onMounted(( ) => {
    const query = useRoute().query
    
    console.log('query Watch: ', query)
  })

</script>

<style>

</style>