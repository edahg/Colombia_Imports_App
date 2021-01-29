<template>
<div>
    <v-row>
          <v-col cols="2">
            <v-sheet rounded="lg">
              <h3>Seleccionar fecha inicial</h3>
              <v-select :items="years" label="Año" item-text="years" 
                item-value="years" v-model="startYear" dense outlined></v-select>
              <v-select :items="months" label="Mes" item-text="months" 
                item-value="months" v-model="startMonth" dense outlined></v-select>
              <h3>Seleccionar fecha final</h3>
              <v-select :items="years" label="Año" item-text="years" 
                item-value="years" v-model="endYear" dense outlined></v-select>
              <v-select :items="months" label="Mes" item-text="months" 
                item-value="months" v-model="endMonth" dense outlined></v-select>
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
                  <!-- <v-autocomplete
                    v-model="values"
                    :items="items"
                    outlined
                    dense
                    chips
                    small-chips
                    label="Outlined"
                    multiple
                    search-input.sync="searchInput"
                  >
                  </v-autocomplete> -->

                  <v-text-field
                    v-model="searchInput"
                    label=""
                    outlined
                    clearable
                  ></v-text-field>

                </v-col>
              </v-row>

                <div class="text-center">
                  <v-btn rounded color="primary" dark @click.native="search()"> Buscar </v-btn>
                </div>

              <div v-if="showTable">
                  <v-data-table
                    :headers="headers"
                    :items="desserts"
                    :items-per-page="10"
                    class="elevation-1"
                  ></v-data-table>
                  <pre>
                      {{this.searchInput}}
                      {{this.results}}
                  </pre>
              </div>        

              <!--  -->
            </v-sheet>
          </v-col>
        </v-row>
</div>
</template>

<script>
import axios from 'axios'

export default {  
  data(){   
    return {
      searchTypes: ["Busqueda Por Partida", "Busqueda Por Proveedor", "Busqueda Por Importador"],
      headers: ['nit', 'importador'],
      years: undefined,
      months: undefined,
      searchInput: "",
      startYear: undefined,
      startMonth: undefined,
      endYear: undefined,
      endMonth: undefined,
      showTable: false,
      results: undefined,
      }     
  },
  created() {
    this.getYears();
    this.getMonths();
  },

  methods: {
    getYears(){ 
      axios.get('http://localhost:3000/api/get-years/')
        .then(response => {
          this.years=response.data;
      }).catch(err => console.error(err));
    },
    getMonths(){ 
      axios.get('http://localhost:3000/api/get-months/')
        .then(response => {
          this.months=response.data;
          //console.log(response.data)
      }).catch(err => console.error(err));
    },
    search(){
      this.showTable = true;
      axios.get('http://localhost:3000/api/query-by-hscode/',
       {params: {searchInput: this.searchInput}})
        .then(response => {
          this.results=response.data;
          //console.log(response.data)
      }).catch(err => console.error(err));
    }
  }
};
</script>