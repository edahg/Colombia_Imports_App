<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-container class="py-0 fill-height">
        <!-- <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar> -->

        <v-btn v-for="[link, route] in links" :key="link" :to=route text>
          {{ link }}
        </v-btn>

        <v-spacer></v-spacer>
      </v-container>
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <router-view></router-view>   
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    links: [
        ["Consultar Importaciones", "/"],
        ["Consultas Guardadas", "/about"],
        ["Lista Proveedores", "/providers"]
    ],
  }),
};
</script>