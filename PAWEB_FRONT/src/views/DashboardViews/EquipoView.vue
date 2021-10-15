<template>
  <v-container>
    <header>
			<span
				class="text-h3 text-uppercase d-flex text-center"
				style="color: #ffc107"
				>Gestión de Equipos</span
			>
			<p>
				En esta sección puede crear, consultar o actualizar un tercero.
			</p>
		</header>
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
          <v-btn depressed @click="manage('guardar')">Guardar</v-btn>&nbsp;
          <v-btn depressed @click="manage('modificar')">Modificar</v-btn>&nbsp;
          <v-btn depressed @click="manage('consultar')">Consultar</v-btn>&nbsp;
          <v-btn depressed @click="manage('eliminar')">Eliminar</v-btn>
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
      items: ["Almacén", "Cuarentena"],
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
        case "eliminar":
          this.delete();
          break;
        default:
          this.get();
          break;
      }
    },
    create() {
      this.equipo.active = "true";
      const today = new Date();
      this.equipo.orderDate =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1).toString().padStart(2, "0") +
        "-" +
        today.getDate().toString().padStart(2, "0");
      this.$store
        .dispatch("createMachine", this.equipo)
        .then(() => {
          this.message = "Guardado exitoso!";
          this.snackbar = true;
          this.equipo = {
            orderDate:"",
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
          this.equipo.orderDate = response.data[0].orderDate;
          this.equipo.machineName = response.data[0].machineName;
          this.equipo.machineName = response.data[0].machineName;
          this.equipo.description = response.data[0].description;
          this.equipo.brand = response.data[0].brand;
          this.equipo.accessories = response.data[0].accessories;
          this.equipo.peripherals = response.data[0].peripherals;
          this.equipo.manufacturer = response.data[0].manufacturer;
          this.equipo.active = response.data[0].active;
          this.equipo.status = response.data[0].status;
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
        .dispatch("updateMachine", this.equipo)
        .then((response) => {
          console.log(response);
          this.message = "Actualización exitosa!";
          this.snackbar = true;
          this.equipo = {
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
          };
          this.btnModificar = "Modificar";
        })
        .catch((err) => {
          console.log(err);
          this.message = "Error al actualizar el Equipo!";
          this.snackbar = true;
        });
    },
    delete() {
      this.$store
        .dispatch("deleteMachine", this.equipo.id)
        .then((response) => {
          console.log(response);
          this.message = "Eliminación exitosa!";
          this.snackbar = true;
          this.equipo = {
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
          };
        })
        .catch((err) => {
          console.log(err);
          this.message = "Error al eliminar el Equipo!";
          this.snackbar = true;
        });
    },
  },
  computed: {
    ...mapGetters(["getAvatar"]),
  },
};
</script>