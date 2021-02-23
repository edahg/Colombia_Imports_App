<template>
  <div class="suppliers">
    <suppliers-list></suppliers-list>
  </div>
</template>

<script>
// @ is an alias to /src
import SuppliersList from '../components/SuppliersList.vue'

export default {
  name: 'Home',
  components: {
    SuppliersList,
  }
}
</script>