<template>
  <div class="home">
    <SearchPage></SearchPage>
  </div>
</template>

<script>
// @ is an alias to /src
import SearchPage from '@/components/SearchPage.vue'

export default {
  name: 'Home',
  components: {
    SearchPage
  }
}
</script>
