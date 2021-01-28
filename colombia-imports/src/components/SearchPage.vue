<template>
    <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <h3>Seleccionar fecha inicial</h3>
              <v-select :items="years" label="Año" dense outlined></v-select>
              <v-select :items="months" label="Mes" dense outlined></v-select>
              <h3>Seleccionar fecha final</h3>
              <v-select :items="items" label="Año" dense outlined></v-select>
              <v-select :items="items" label="Mes" dense outlined></v-select>
            </v-sheet>
          </v-col>

          <v-col>
            <v-sheet min-height="70vh" rounded="lg">
              <v-tabs
                fixed-tabs
                background-color="indigo"
                dark>
                <v-tab v-for="searchtype in searchTypes" :key="searchtype" text>
                  {{searchtype}}
                </v-tab>
              </v-tabs>
              <v-row align="center">
                <v-col cols="12">
                  <v-autocomplete
                    v-model="values"
                    :items="items"
                    outlined
                    dense
                    chips
                    small-chips
                    label="Outlined"
                    multiple
                  >
                  </v-autocomplete>
                </v-col>
              </v-row>

                <div class="text-center">
                  <v-btn rounded color="primary" dark @click.native="search()"> Buscar </v-btn>
                </div>

              <div>
                  <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :items-per-page="10"
                    class="elevation-1"
                  ></v-data-table>
              </div>

              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
</template>

<script>
export default {
  data: () => ({    
    searchTypes: ["Busqueda Por Partida", "Busqueda Por Proveedor", "Busqueda Por Importador"],
    headers: ['nit', 'importador'],
    //years: 
    // showTable: false
  }),
  /* methods: {
    search: async function(){
      showTable = true;
      console.log(this.showTable) 
    }
  }*/
};
</script>