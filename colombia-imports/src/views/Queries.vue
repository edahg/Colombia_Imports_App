<template>
  <div class="queries">
    <saved-queries></saved-queries>
    <results-table></results-table>
  </div>
</template>

<script>
// @ is an alias to /src
import SavedQueries from '../components/SavedQueries.vue'

export default {
  name: 'Home',
  components: {
    SavedQueries,
  }
}
</script>