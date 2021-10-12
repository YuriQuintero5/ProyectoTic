
<template>
  <v-container>
    <v-card flat color="secondary" class="elevation-0" :tile="true">
      <v-form>
        <v-container>
          <v-row wrap>
            <v-col xs12 md6>
              <v-text-field
                v-model="equipo.serial"
                label="Serial"
                v-on:keyup.enter="get"
              />
            </v-col>
            <v-col xs12 md6>
              <v-text-field
                v-model="equipo.machineName"
                label="Nombre Equipo"
              />
            </v-col>
          </v-row>
          <v-row wrap>
            <v-col xs12 md6>
              <v-text-field v-model="equipo.brand" label="Marca" />
            </v-col>
            <v-col xs12 md6>
              <v-text-field v-model="equipo.description" label="Descripcion" />
            </v-col>
          </v-row>
          <v-row wrap>
            <v-col xs12 md4>
              <v-text-field v-model="equipo.accessories" label="Accesorios" />
            </v-col>
            <v-col xs12 md4>
              <v-text-field v-model="equipo.peripherals" label="Perifericos" />
            </v-col>
          </v-row>
          <v-row wrap>
            <v-col xs12 md4>
              <v-text-field v-model="equipo.manufacturer" label="Fabricante" />
            </v-col>
            <v-col xs12 md4>
              <v-select
                :items="items"
                label="Status"
                v-model="equipo.status"
                outline
              ></v-select>
            </v-col>
          </v-row>
          <br />
          <v-btn depressed @click="manage('guardar')">Guardar</v-btn>
          <v-btn depressed @click="manage('modificar')">Modificar</v-btn>
          <v-btn depressed @click="manage('consultar')">Consultar</v-btn>
        </v-container>
      </v-form>
      <v-snackbar
        v-model="snackbar"
        :multi-line="mode === 'multi-line'"
        :timeout="timeout"
        :vertical="mode === 'vertical'"
      >
        {{ message }}
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "EquipoForm",
  data() {
    return {
      timeout: 2000,
      btnGuargar: "Guardar",
      snackbar: false,
      equipo: {
        orderDate: "",
        serial: "",
        machineName: "",
        description: "",
        brand: "",
        accessories: "",
        peripherals: "",
        manufacturer: "",
        active: "",
        status: "",
        id: "",
      },
      items: ["almacen", "cuarentena"],
      textFieldColor: "secondary",
      message: "Guardado exitoso!",
      tabBreakPoint: this.$vuetify.breakpoint.mobile ? false : true,
    };
  },
  methods: {
    manage(value) {
      switch (value) {
        case "guardar":
          this.create();
          break;
        case "modificar":
          this.update();
          break;
        default:
          this.get();
          break;
      }
    },
    create() {
      this.$store
        .dispatch("createMachine", this.equipo)
        .then(() => {
          this.message = "Guardado exitoso!";
          this.snackbar = true;
          this.equipo = {
            serial: "",
            machineName: "",
            description: "",
            brand: "",
            accessories: "",
            peripherals: "",
            manufacturer: "",
            active: "",
            status: "",
            id: "",
          };
        })
        .catch((err) => {
          console.log(err);
          this.message = "Ocurrio un error al intentar guardar el equipo!";
          this.snackbar = true;
        });
    },
    get() {
      let id = this.equipo.serial;
      this.$store
        .dispatch("getMachine", id)
        .then((response) => {
          this.equipo.identityType = response.data[0].identityType;
          this.equipo.firstName = response.data[0].firstName;
          this.equipo.lastName = response.data[0].lastName;
          this.equipo.phone = response.data[0].phone;
          this.equipo.city = response.data[0].city;
          this.equipo.address = response.data[0].address;
          this.equipo.id = response.data[0]._id;
          this.btnConsultar = "Consultar";
        })
        .catch((err) => {
          console.log(err);
          this.message = "Equipo no encontrado!";
          this.snackbar = true;
        });
    },
    update() {
      this.$store
        .dispatch("updatePerson", this.equipo)
        .then((response) => {
          console.log(response);
          this.message = "Actualización exitosa!";
          this.snackbar = true;
          this.equipo = {
            serial: "",
            machineName: "",
            description: "",
            brand: "",
            accessories: "",
            peripherals: "",
            manufacturer: "",
            active: "",
            status: "",
          };
          this.btnModificar = "Modificar";
        })
        .catch((err) => {
          console.log(err);
          this.message = "Error al actualizar el Equipo!";
          this.snackbar = true;
        });
    },
  },
  computed: {
    ...mapGetters(["getAvatar"]),
  },
};
</script>