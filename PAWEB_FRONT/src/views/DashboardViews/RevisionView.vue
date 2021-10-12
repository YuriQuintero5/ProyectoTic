<template>
  <v-container>
    <header>
			<span
				class="text-h3 text-uppercase d-flex text-center"
				style="color: #ffc107"
				>Gestión de Revision de Equipos</span
			>
            <p>
				En esta sección puede crear, consultar o actualizar las revisiones de los equipos.
			</p>
		</header>
    <v-card flat color="secondary" class="elevation-0" :tile="true">
    <v-form>
    <v-container>    
        <v-row wrap>
          <v-col xs12 md6>
                <div class="mb-6">Fecha de Revision: </div>
                <v-menu
                ref="menu"
                v-model="revision.reviewDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                min-width="auto"
                >
                <template v-slot:activator="{ on, attrs }">
                <v-text-field
                    v-model="date"
                    label="Año-Mes-Dia"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                ></v-text-field>
                </template>
                <v-date-picker
                    v-model="date"
                    :active-picker.sync="activePicker"
                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                    min="1950-01-01"
                    @change="save"
                ></v-date-picker>
                </v-menu>
          </v-col>
          <v-col xs12 md6>
              <v-text-field
                v-model="revision.serial"
                label="Serial"
                v-on:keyup.enter="get"
              />
          </v-col>
        </v-row>
        <v-row wrap>
            <v-col xs12 md6>
              <v-text-field
                v-model="revision.c"
                label="Motivo del estado"
              />
            </v-col>
            <v-col xs12 md6>
              <v-text-field
                v-model="revision.diagnostic"
                label="Diagnostico"
              />
            </v-col>
        </v-row>

        <v-row wrap>
             <v-col xs12 md6>
              <v-text-field
                v-model="revision.accesories"
                label="Accesorios"
              />
            </v-col>
            <v-col xs12 md6>
              <v-text-field
                v-model="revision.peripherals"
                label="Perifericos que lo acompañan"
              />
            </v-col>
        </v-row>

        <v-col xs12 md4>
              <v-select
                :items="items"
                label="Status"
                v-model="revision.status"
                outline
              ></v-select>
        </v-col>

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
    name: "RevisionForm",
    data() {
    return {
            timeout: 2000,
            btnGuargar: "Guardar",
            snackbar: false,
                revision: {
                    reviewDate: "",
                    serial:"",
                    c: "",
                    diagnostic: "",
                    accessories: "",
                    peripherals: "",
                    status: "",
            },
                items: ["almacen", "cuarentena", "Revision", "Dado de baja"],
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
                .dispatch("createReview", this.revision)
                .then(() => {
                this.message = "Guardado exitoso!";
                this.snackbar = true;
                this.revision = {
                    reviewDate: "",
                    serial:"",
                    c: "",
                    diagnostic: "",
                    accessories: "",
                    peripherals: "",
                    status: "",
                };
                })
                .catch((err) => {
                console.log(err);
                this.message = "Ocurrio un error al intentar guardar el equipo!";
                this.snackbar = true;
                });
            },
            get() {
            let id = this.revision.serial;
            this.$store
                .dispatch("getReview", id)
                .then((response) => {
                this.revision.reviewDate = response.data[0].reviewDate;
                this.revision.serial = response.data[0].serial;
                this.revision.c = response.data[0].c;
                this.revision.diagnostic = response.data[0].diagnostic;
                this.revision.accessories = response.data[0].accessories;
                this.revision.peripherals = response.data[0].peripherals;
                this.revision.status = response.data[0].status;
                this.revision.id = response.data[0]._id;
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
                .dispatch("updateReview", this.revision)
                .then((response) => {
                console.log(response);
                this.message = "Actualización exitosa!";
                this.snackbar = true;
                this.revision = {
                    reviewDate: "",
                    serial:"",
                    c: "",
                    diagnostic: "",
                    accessories: "",
                    peripherals: "",
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