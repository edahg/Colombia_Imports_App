<template>
  <div>
    <v-data-table
      :headers="this.headers"
      :items="this.results"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
    <div>
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
    </div>          
  </div>
</template>

<script>
import axios from "axios";
import swal from "sweetalert";
export default {
  props: {
    results : Array,
    headers : Array
  },
  data () {
    return {
      dialog: false,
    };          
  },
  methods: {
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
    }
  }
}
</script>