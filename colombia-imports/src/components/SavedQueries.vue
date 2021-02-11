<template>
  <v-card
    max-width="400"
    class="mx-auto"
  >    
        <v-col
          v-for="(item, i) in items"
          :key="i"
          cols="12"
        >
          <v-card
            :color="blue"
            light
          >
            <div class="d-flex flex-no-wrap justify-space-between">
              <div>
                <v-card-title
                  class="headline"
                  v-text="item.name"
                ></v-card-title>

                <v-card-subtitle v-text="searchTypes[item.search_type]"></v-card-subtitle>

                <v-card-actions>
                  <v-btn>
                    EDITAR
                  </v-btn>
                  <v-btn>
                    MOSTRAR
                  </v-btn>
                </v-card-actions>
              </div>

              <v-avatar
                class="ma-3"
                size="125"
                tile
              >
                <v-img :src="item.src"></v-img>
              </v-avatar>
            </div>
          </v-card>
        </v-col>
  </v-card>
</template>

<script>
import axios from "axios"

  export default {
    data: () => ({
      searchTypes: [
        "Busqueda Por Partida",
        "Busqueda Por Proveedor",
        "Busqueda Por Importador",
      ],
      items: [],
    }),

    created() {
    this.getQueries();
    },

    methods: {
      getQueries(){
          axios.get("http://localhost:3000/api/get-queries/")
          .then((response) => {
          this.items = response.data;
        })
        .catch((err) => console.error(err));
      }
  }
  }
</script>