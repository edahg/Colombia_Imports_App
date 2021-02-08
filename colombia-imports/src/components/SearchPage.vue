<template>
  <div>
    <v-row>
      <v-col cols="2">
        <v-sheet rounded="lg">
          <h3>Seleccionar fecha inicial</h3>
          <v-select
            :items="years"
            label="Año"
            item-text="years"
            item-value="years"
            v-model="startYear"
            dense
            outlined
          ></v-select>
          <v-select
            :items="months"
            label="Mes"
            item-text="months"
            item-value="months"
            v-model="startMonth"
            dense
            outlined
          ></v-select>
          <h3>Seleccionar fecha final</h3>
          <v-select
            :items="years"
            label="Año"
            item-text="years"
            item-value="years"
            v-model="endYear"
            dense
            outlined
          ></v-select>
          <v-select
            :items="months"
            label="Mes"
            item-text="months"
            item-value="months"
            v-model="endMonth"
            dense
            outlined
          ></v-select>
        </v-sheet>
      </v-col>
      <v-col>
        <v-sheet min-height="70vh" rounded="lg">
          <v-tabs
            fixed-tabs
            background-color="indigo"
            dark
            v-model="searchType"
            @change="hideTable()"
          >
            <v-tab v-for="searchtype in searchTypes" :key="searchtype" text>
              {{ searchtype }}
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
            <v-btn rounded color="primary" dark @click.native="search()">
              Buscar
            </v-btn>
          </div>
          <p></p>
          <div v-if="showTable">
            <v-data-table
              :headers="this.headers"
              :items="this.results"
              :items-per-page="10"
              class="elevation-1"
            ></v-data-table>
            <template>
              <v-row justify="center">
                <v-dialog v-model="dialog" persistent max-width="600px">
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn color="primary" dark v-bind="attrs" v-on="on">
                      Guardar Consulta
                    </v-btn>
                  </template>
                  <v-card>
                    <v-card-title>
                      <span class="headline">Guardar Consulta</span>
                    </v-card-title>
                    <v-card-text>
                      <v-container>
                        <v-row>
                          <v-text-field
                            v-model="queryName"
                            label="Nombre"
                            required
                          ></v-text-field>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="dialog = false">
                        Cancelar
                      </v-btn>
                      <v-btn color="blue darken-1" text @click="saveQuery()">
                        Guardar
                      </v-btn>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-row>
            </template>
          </div>
          <p v-if="showMessage">La consulta no arrojó resultados</p>

          <!--  -->
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  data() {
    return {
      searchTypes: [
        "Busqueda Por Partida",
        "Busqueda Por Proveedor",
        "Busqueda Por Importador",
      ],
      headers: [],
      headers_: [],
      years: undefined,
      months: undefined,
      searchInput: "",
      startYear: undefined,
      startMonth: undefined,
      endYear: undefined,
      endMonth: undefined,
      showTable: false,
      results: undefined,
      searchType: undefined,
      showMessage: false,
      dialog: false,
      queryName: "",
      query: [],
    };
  },
  created() {
    this.getYears();
    this.getMonths();
  },

  methods: {
    hideTable() {
      this.showTable = false;
      this.showMessage = false;
    },

    getYears() {
      axios
        .get("http://localhost:3000/api/get-years/")
        .then((response) => {
          this.years = response.data;
        })
        .catch((err) => console.error(err));
    },
    getMonths() {
      axios
        .get("http://localhost:3000/api/get-months/")
        .then((response) => {
          this.months = response.data;
          //console.log(response.data)
        })
        .catch((err) => console.error(err));
    },
    search() {
      this.query = {
        searchInput: this.searchInput,
        syear: this.startYear,
        smonth: this.startMonth,
        fyear: this.endYear,
        fmonth: this.endMonth,
      };
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
              this.headers_ = Object.keys(this.results[0]);
              this.headers_.forEach((elem) =>
                this.headers.push({ text: elem, value: elem })
              );
              this.showTable = true;
              this.showMessage = false;
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
              this.headers_ = Object.keys(this.results[0]);
              this.headers_.forEach((elem) =>
                this.headers.push({ text: elem, value: elem })
              );
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
    async saveQuery() {
      try {
        const queryData = {name: this.queryName, userId: 1, 
          searchType: this.searchType, searchInput: this.searchInput,
          startYear: this.startYear, endYear: this.endYear, 
          startMonth: this.startMonth, endMonth: this.startMonth}
        let response = await axios.post(
          "http://localhost:3000/api/savequeries",
          queryData,
        );
        console.log(response);

        if (response.status == 200) {
          swal(
            "Exitoso",
            `Consulta ${this.queryName} guardada correctamente`,
            "success"
          );
        }
      } catch (err) {
        swal("Error", "datos incorrectos", "error");
        console.log(err.response);
      }
    },
  },
};
</script>