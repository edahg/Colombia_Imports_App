<template>
  <div>
    <v-row>
      <v-col cols = "6">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
          clearable
      ></v-text-field>
      </v-col>
      <v-col cols="6">
      <v-select
            :items="groups.slice(1,4)"
            label="Agrupar"
            item-text="groups"
            item-value="groups"
            v-model="groupby"
            dense
            outlined
          ></v-select>
      </v-col>
    </v-row>
         
   
    <v-data-table
      :headers="this.headers"
      :items="this.results"
      :items-per-page="10"
      item-key = "Importador"
      class="elevation-1"
      :group-by="this.groupby"
      :search="search"
      v-model="resultsTable"
      @click:row="showDialog"      
    >
    <!-- @click:row="saveSupplier" -->
      <template v-slot:[`item.Importador`]="props">
        <v-dialog v-model="dialog1" persistent max-width="600px">
          <template v-slot:activator="{ on, attrs }">        
            <v-btn text v-bind="attrs" v-on="on">
              {{props.item.Importador}}                        
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Guardar Proveedor</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <h4>¿Desea guardar el proveedor {{props.item.Importador}}?</h4>
                </v-row>
              </v-container>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog1 = false">
                  Cancelar
              </v-btn>
              <v-btn color="blue darken-1" text @click="saveSupplier(props.item)">
                Guardar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-data-table>
    <p></p>
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
    headers : Array,
    query: Object,
  },

  data () {
    return {
      dialog: false,
      dialog1: false,
      queryName: "",
      groups: [], 
      groupby: undefined,
      search: "",
      filter: [],   
      resultsTable: [],
    };          
  },

  created () {
    this.getHeaders();
  },

  methods: {
    async getHeaders(){
      for(let i=0; i<3; i++){ 
        this.groups.push(this.headers[i].value)
      }  
        this.groups.unshift("Todos")
        this.filter = this.groups[0]
    },

    async saveSupplier(item){
      //swal("Exitoso", `${row.item.Importador}`, "success")
      try {
        const supplierData = {Importador: item.Importador, 
        Nit: item.Nit, userId: 1}
        let response = await axios.post(
          "http://localhost:3000/api/savesupplier",
          supplierData,
        );
        console.log(response);

        if (response.status == 200) {
          this.dialog = false;
          swal(
            "Exitoso",
            `Proveedor ${item.Importador} guardada correctamente`,
            "success"
          );
        }
      } catch (err) {
        swal("Error", "datos incorrectos", "error");
        console.log(err.response);
      }
    },
    async saveQuery() {
      console.log(this.query.smonth)
      try {
        const queryData = {name: this.queryName, userId: 1, 
          searchType: this.query.searchType, searchInput: this.query.searchInput,
          startYear: this.query.syear, endYear: this.query.fyear, 
          startMonth: this.query.smonth, endMonth: this.query.fmonth}
        console.log(queryData)
        let response = await axios.post(
          "http://localhost:3000/api/savequeries",
          queryData,
        );
        console.log(response);

        if (response.status == 200) {
          this.dialog = false;
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