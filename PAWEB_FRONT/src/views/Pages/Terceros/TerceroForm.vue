<template>
  <card>
    <b-row align-v="center" slot="header" >
      <b-col cols="8">
        <h3 class="mb-0">Crear tercero </h3>
      </b-col>
    </b-row>

    <b-form @submit.prevent="updateProfile">
      <h6 class="heading-small text-muted mb-4">Información del tercero</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col lg="6">
            <base-input
              label="Tipo de identificación"
            >
            <b-form-select v-model="tercero.identityType" :options="options"></b-form-select>
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="number"
              label="Numero de identificación"
              placeholder="0000000000"
              v-model="tercero.identityDocument"
              v-on:keyup.enter="get"
            >
            </base-input>
          </b-col>
        </b-row>
        <b-row >
          <b-col lg="6">
            <base-input
              type="text"
              label="Nombre"
              placeholder="John"
              v-model="tercero.firstName"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="text"
              label="Apellidos"
              placeholder="Doe"
              v-model="tercero.lastName"
            >
            </base-input>
          </b-col>
        </b-row>
        <b-row >
          <b-col lg="6">
            <base-input
              type="number"
              label="Telefono"
              placeholder="0000000"
              v-model="tercero.phone"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="text"
              label="Ciudad"
              placeholder="Nowhere"
              v-model="tercero.city"
            >
            </base-input>
          </b-col>
        </b-row>
        <b-row >
          <b-col md="12">
            <base-input
              type="text"
              label="Dirección"
              placeholder="Street Avenie"
              v-model="tercero.address"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
      <br/>
      <a href="#!" class="btn btn-info" @click="manage">{{ btnText }}</a>
    </b-form>
  </card>
</template>
<script>
import api from "../../../api/index";
export default {
  data() {
    return {
      response: {},
      btnText: 'Registrar',
      tercero: {
        identityType: null,
        identityDocument: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        city: '',
        roleName: 'Cliente',
        id: ''
      },
      options: [
          { value: null, text: 'Seleccione una opción' },
          { value: 'CC', text: 'Cedula de ciudadania' },
          { value: 'CE', text: 'Cedula de extrajeria' },
          { value: 'TI', text: 'Tarjeta de identidad'}
        ]
    };
  },
  methods: {
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.tercero));
    },
    manage() {
      if (this.btnText == 'Registrar') {
        this.create();
      } else {
        this.update();
      }
    },
    create() {
      api.person
        .create(this.tercero)
        .then((response) => {
          this.response = response;
          window.alert('Guardado exitoso!')
          this.tercero = {
            identityType: null,
            identityDocument: '',
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            city: '',
            roleName: 'Cliente',
            id: ''
          }
        })
        .catch((err) => this.handleError(err));
    },
    get() {
      let params = { identityDocument: this.tercero.identityDocument };

      api.person
        .getAll(params)
        .then((response) => {
          this.tercero.identityType = response.data[0].identityType;
          this.tercero.firstName = response.data[0].firstName;
          this.tercero.lastName = response.data[0].lastName;
          this.tercero.phone = response.data[0].phone;
          this.tercero.city = response.data[0].city;
          this.tercero.address = response.data[0].address;
          this.tercero.id = response.data[0]._id;
          this.btnText = 'Actualizar';
        })
        .catch((err) => window.alert("Tercero no encontrado"));
    },
    update() {
      const id = this.tercero.id;

      api.person
        .edit(id, this.tercero)
        .then((response) => {
          this.response = response;
          window.alert('Actualización exitosa!')
          this.tercero = {
            identityType: null,
            identityDocument: '',
            firstName: '',
            lastName: '',
            address: '',
            phone: '',
            city: '',
            roleName: 'Cliente',
            id: ''
          }
        })
        .catch((err) => this.handleError(err));
    },
    handleError(err) {
      this.response = {};
      console.error(err);
      window.alert(err);
    },
  }
};
</script>
<style></style>
