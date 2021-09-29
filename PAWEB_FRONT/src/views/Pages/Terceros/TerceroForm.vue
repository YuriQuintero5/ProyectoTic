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
            <b-form-select v-model="selected" :options="options"></b-form-select>
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="number"
              label="Numero de identificación"
              placeholder="0000000000"
              v-model="user.identificacion"
            >
            </base-input>
          </b-col>
          <b-col md="12">
            <base-input
              type="email"
              label="Correo electronico"
              placeholder="ejemplo@email.com"
              v-model="user.email"
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
              v-model="user.nombre"
            >
            </base-input>
          </b-col>
          <b-col lg="6">
            <base-input
              type="text"
              label="Apellidos"
              placeholder="Doe"
              v-model="user.apellidos"
            >
            </base-input>
          </b-col>
        </b-row>
      </div>
      <hr class="my-4">

      <h6 class="heading-small text-muted mb-4">Información de perfil de usuario</h6>

      <div class="pl-lg-4">
        <b-row>
          <b-col md="12">
            <base-input
              label="Perfil del usuario"
            >
            <b-form-select v-model="perfilSelected" :options="perfilOptions"></b-form-select>
            </base-input>
          </b-col>
        </b-row>
      </div>
      <br/>
      <a href="#!" class="btn btn-info">Registrar</a>
    </b-form>
  </card>
</template>
<script>
export default {
  data() {
    return {
      user: {
        tipoIdentification: '',
        identificacion: '',
        nombre: '',
        apellidos: '',
        email: '',
        tipoUsuario: ''
      },
      selected: null,
      options: [
          { value: null, text: 'Seleccione una opción' },
          { value: 'CC', text: 'Cedula de ciudadania' },
          { value: 'CE', text: 'Cedula de extrajeria' },
          { value: 'TI', text: 'Tarjeta de identidad'}
        ],
      perfilSelected: null,
      perfilOptions: [
          { value: null, text: 'Seleccione una opción' },
          { value: 'AsesorComercial', text: 'Asesor comercial' },
          { value: 'CoordinadorCompras', text: 'Coordinador de compras' },
          { value: 'CoordinadorTecnico', text: 'Coordinador tecnico'}
        ]
    };
  },
  methods: {
    updateProfile() {
      alert('Your data: ' + JSON.stringify(this.user));
    }
  }
};
</script>
<style></style>
