<template>
  <div class="queries">
    <saved-queries></saved-queries>
    <results-table></results-table>
  </div>
</template>

<script>
// @ is an alias to /src
import SavedQueries from '../components/SavedQueries.vue'
import ResultsTable from '@/components/ResultsTable'

export default {
  name: 'Home',
  components: {
    SavedQueries,
    ResultsTable
  }
}
</script>