<template>
  
    <v-app id="inspire">
      <div v-if="login">
      <v-app-bar app color="white" flat>
        <v-container class="py-0 fill-height">
          <!-- <v-avatar class="mr-10" color="grey darken-1" size="32"></v-avatar> -->

          <v-btn v-for="[link, route] in links" :key="link" :to="route" text>
            {{ link }}
          </v-btn>
          <v-btn align-self="left" @click="login=false">
            SALIR
          </v-btn>
          <v-spacer></v-spacer>
        </v-container>
      </v-app-bar>

      <v-main class="grey lighten-3">
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>      
  </div>  
  <div v-else>
    <div class="container">
      <h1>Importaciones Colombia desde Julio/2020 a Septiembre/2020</h1>
      <p></p>
      <p>En esta aplicación se pueden consultar las importaciones de Colombia por subpartida arancelaria,
        proveedor o importador, en el periodo comprendido entre Julio de 2020 y Septiembre de 2020
      </p>
    </div>
  <v-row justify="center">
     <v-card>
        <v-card-title>
          <span class="headline">Ingresar</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Nombre de usuario"
                  v-model="user.username"
                  required                  
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Contraseña"
                  type="password"
                  v-model="user.password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="signin()"
          >
            Ingresar
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="registerUser()"
          >
            Registrar
          </v-btn>
        </v-card-actions>
      </v-card>
  </v-row>
  </div>
  </v-app>
</template>
  
<script>
import swal from "sweetalert"
import axios from "axios"
export default {
  data: () => ({
    links: [
      ["Consultar Importaciones", "/"],
      ["Consultas Guardadas", "/about"],
      ["Lista Proveedores", "/providers"],
    ],
    user: { 
                username: "",
                password: ""
            },
    login: true,
    userId: undefined,
  }),
  methods: {
    async registerUser(){
      try{
        let response = await axios.post("http://localhost:3000/api/register", this.user)
        console.log(response)

        if (response.status == 200) {
            swal("Exitoso", "Usuario registrado correctamente", "success")
            this.$router.push("/")
        }
      } catch (err){
          swal("Error", "datos incorrectos", "error")
          console.log(err.response)
      }
    },
    async signin(){
      try{
        let response = await axios.post("http://localhost:3000/api/signin", this.user)
        console.log(response)
        this.userId = response.data.userId
        if (this.userId) {
            swal("Exitoso", "login exitoso", "success")
            this.login = true;
        }
      } catch (err){
          swal("Error", "datos incorrectos", "error")
          console.log(err.response)
      }
    }
  }
};
</script>