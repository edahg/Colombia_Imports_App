<template>
  <div class="home">
    <SearchPage></SearchPage>
    <!-- <ResultsTable></ResultsTable> -->
  </div>
</template>

<script>
// @ is an alias to /src
import SearchPage from '@/components/SearchPage.vue'
//import ResultsTable from '@/components/ResultsTable'

export default {
  name: 'Home',
  components: {
    SearchPage,
    //ResultsTable,
  }
}
</script>
