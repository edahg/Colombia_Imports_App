<template>
<div>
  <v-row>
    <v-col v-for="(item, i) in items" :key="i" cols="4">
      <v-card :color="blue" light>
        <div class="d-flex flex-no-wrap justify-space-between">
          <div>
            <v-card-title class="headline" v-text="item.name"></v-card-title>

            <v-card-subtitle
              v-text="searchTypes[item.search_type]"
            ></v-card-subtitle>
            <v-card-text>
              <v-row>
                <v-col cols> Término Búsqueda: {{ item.search_input }} </v-col>
                <v-col>
                  Fecha Inicial: {{ item.start_month }}-{{ item.start_year }}
                </v-col>
                <v-col>
                  Fecha Final: {{ item.end_month }}-{{ item.end_year }}
                </v-col>
              </v-row>
            </v-card-text>

            <v-card-actions>
              <v-btn> EDITAR </v-btn>
              <v-btn @click="search(i)"> MOSTRAR </v-btn>
              <v-btn> eliminar </v-btn>
            </v-card-actions>
          </div>

          <v-avatar class="ma-3" size="125" tile>
            <v-img :src="item.src"></v-img>
          </v-avatar>
        </div>
      </v-card>
    </v-col>    
  </v-row>
  <v-row v-if="showTable">
    <results-table
      :headers="this.headers"
      :results="this.results"
      :query="this.query"
    ></results-table>
  </v-row>
</div>
</template>

<script>
import axios from "axios";
import ResultsTable from './ResultsTable.vue';

export default {
  components: { ResultsTable },
  data: () => ({
    searchTypes: [
      "Busqueda Por Partida",
      "Busqueda Por Proveedor",
      "Busqueda Por Importador",
    ],
    items: [],
    showTable: false,
    query: {},
    headers: [],
    results: [],
    headers_: [],
    searchType: undefined,
  }),

  created() {
    this.getQueries();
  },

  methods: {
    getQueries() {
      axios
        .get("http://localhost:3000/api/get-queries/")
        .then((response) => {
          this.items = response.data;
        })
        .catch((err) => console.error(err));
    },

    search(i) {
      this.searchType = this.items[i].search_type,
      this.query = {
        searchType: this.items[i].search_type,
        searchInput: this.items[i].search_input,
        syear: this.items[i].start_year,
        smonth: this.items[i].start_month,
        fyear: this.items[i].end_year,
        fmonth: this.items[i].end_month,
      };
      console.log(this.query)
      if (this.searchType == 0) {
        axios
          .get("http://localhost:3000/api/query-by-hscode/", {
            params: this.query,
          })
          .then((response) => {
            this.results = response.data;
            if (this.results.length == 0) {
              this.showMessage = true;
            } else {
              this.headers = []
              this.headers_ = Object.keys(this.results[0]);
              this.headers_.forEach((elem) =>
                this.headers.push({ text: elem, value: elem })
              );
              this.showTable = true;
              this.showMessage = false;
              console.log(this.headers)
            }
          })
          .catch((err) => console.error(err));
      } else if (this.searchType == 1) {
        axios
          .get("http://localhost:3000/api/query-by-exporter/", {
            params: this.query,
          })
          .then((response) => {
            this.results = response.data;
            if (this.results.length == 0) {
              this.showMessage = true;
            } else {
              this.headers = []
              this.headers_ = Object.keys(this.results[0]);
              this.headers_.forEach((elem) =>
                this.headers.push({ text: elem, value: elem })
              );
              console.log(this.headers)
              this.showTable = true;
              this.showMessage = false;
            }
          })
          .catch((err) => console.error(err));
      } else if (this.searchType == 2) {
        axios
          .get("http://localhost:3000/api/query-by-importer/", {
            params: this.query,
          })
          .then((response) => {
            this.results = response.data;
            if (this.results.length == 0) {
              this.showMessage = true;
            } else {
              this.headers = []
              this.headers_ = Object.keys(this.results[0]);
              this.headers_.forEach((elem) =>
                this.headers.push({ text: elem, value: elem })
              );
              this.showTable = true;
              this.showMessage = false;
            }
          })
          .catch((err) => console.error(err));
      }
    },
  },
};
</script>