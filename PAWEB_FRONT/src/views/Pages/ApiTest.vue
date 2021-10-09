<template>
  <div class="pt-5 ml-2">
    <div class="mt-5"></div>
    <div class="row">
      <div class="col-3">
        <select class="custom-select" v-model="idApi">
          <option selected>Selecciona el API</option>
          <option value="1">Login</option>
          <option value="2">Crear usuario</option>
          <option value="3">Lista de terceros</option>
          <option value="4">Buscar tercero por Id</option>
          <option value="5">Crear tercero</option>
          <option value="6">Editar tercero</option>
          <option value="7">Asignar equipo al cliente</option>
          <option value="8">Retirar equipo del cliente</option>
          <option value="9">Lista de equipos</option>
          <option value="10">Buscar equipo por Id</option>
          <option value="11">Crear equipo</option>
          <option value="12">Editar equipo</option>
        </select>
        <div class="mt-3">
          <input
            type="text"
            class="form-control"
            id="idModel"
            placeholder="Id"
          />
        </div>
        <div class="mt-3">
          <input
            type="text"
            class="form-control"
            id="auxiliar"
            placeholder="Auxiliar"
          />
        </div>
        <button type="button" class="btn btn-primary mt-3" @click="selectApi">
          Probar
        </button>
      </div>
      <div class="col-8 w-100">
        <div class="card" style="height: 400px">
          <pre><code>
        {{ response }}
</code>
    </pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from "../../api/index";

export default {
  data() {
    return {
      modelLogin: {
        userName: "admin",
        password: "12345",
      },
      modelUser: {
        userName: "123",
        password: "123",
        role: "6142be220ef498b6971e4d7d",
        person: "6152a75832a19d2ab99eb836",
      },
      modelPerson: {
        identityType: "CC",
        identityDocument: "94325212-1",
        firstName: "Diego Fernando",
        lastName: "Orozco Quintero",
        address: "Cra 18A # 26A - 04",
        phone: "3166242600",
        city: "Palmira",
        roleName: "Cliente",
      },
      modelAddMachine: {
        entryType: "Venta",
        entryDate: "2021-08-22",
        active: true,
        machine: "",
      },
      modelDeleteMachine: {
        leaveDate: "2021-09-21",
        active: true,
        machine: "",
      },
      modelMachine: {
        orderDate: "2021-09-25",
        serial: "1234567890-3",
        machineName: "OTRO",
        description:
          "Emite a los estudiantes analizar la magnetoterapia, de forma que obtengan un mejor conocimiento de su funcionamiento y mecanismo interno",
        brand: "edibond",
        accessories: "Modelo real del instrumento de magnetoterapia",
        peripherals: "Medidor de Gauss",
        manufacturer: "edibond",
      },
      response: {},
      idApi: 0,
    };
  },
  methods: {
    getAux(type = 0) {
      let id = "";
      if (type == 0) {
        id = window.document.getElementById("idModel").value;
      } else {
        id = window.document.getElementById("auxiliar").value;
      }

      if (id == "") {
        window.alert("Falta id o información auxiliar para la consulta");
        return this.handleError(
          "Falta id o información auxiliar para la consulta"
        );
      }
      return id;
    },

    selectApi() {
      switch (Number.parseInt(this.idApi)) {
        case 1:
          this.testUserLogin();
          break;
        case 2:
          this.testUserCreate();
          break;
        case 3:
          this.testPersonGetAll();
          break;
        case 4:
          this.testPersonGetId();
          break;
        case 5:
          this.testPersonCreate();
          break;
        case 6:
          this.testPersonEdit();
          break;
        case 7:
          this.testPersonAddMachineToCustomer();
          break;
        case 8:
          this.testPersonDeleteMachineFromCustomer();
          break;
        case 9:
          this.testMachineGetAll();
          break;
        case 10:
          this.testMachineGetById();
          break;
        case 11:
          this.testMachineCreate();
          break;
        case 12:
          this.testMachineEdit();
          break;
        default:
          this.handleError("Api no definido");
          break;
      }
    },

    testUserLogin() {
      api.auth
        .login(this.modelLogin)
        .then((response) => {
          this.response = response;
        })
        .catch((err) => this.handleError(err));
    },

    testUserCreate() {
      api.user
        .create(this.modelUser)
        .then((response) => {
          this.response = response;
        })
        .catch((err) => this.handleError(err));
    },

    testPersonGetAll() {
      // Sin filtros
      let params = {};
      // Buscar por role
      params = { roleName: "Cliente" };
      // Buscar por número de identificación que contenga un número
      // params = { identityDocument: "123" };
      // Buscar por número de identificación exacta
      // params = { identityDocument: "=123" };
      // params = {};

      api.person
        .getAll(params)
        .then((response) => {
          this.response = response;
        })
        .catch((err) => this.handleError(err));
    },

    testPersonGetId() {
      const id = this.getAux();

      api.person
        .getById(id)
        .then((response) => {
          this.response = response;
        })
        .catch((err) => this.handleError(err));
    },

    testPersonCreate() {
      api.person
        .create(this.modelPerson)
        .then((response) => {
          this.response = response;
        })
        .catch((err) => this.handleError(err));
    },

    testPersonEdit() {
      const id = this.getAux();
      const model = { active: "true" };

      api.person
        .edit(id, model)
        .then((response) => {
          this.response = response;
        })
        .catch((err) => this.handleError(err));
    },

    testPersonAddMachineToCustomer() {
      const id = this.getAux();
      const idMachine = this.getAux(1);
      this.modelAddMachine.machine = idMachine;

      api.person
        .addMachineById(id, this.modelAddMachine)
        .then((response) => {
          this.response = response;
        })
        .catch((err) => this.handleError(err));
    },

    testPersonDeleteMachineFromCustomer() {
      const id = this.getAux();
      const idMachine = this.getAux(1);
      this.modelDeleteMachine.machine = idMachine;

      api.person
        .addMachineById(id, this.modelDeleteMachine)
        .then((response) => {
          this.response = response;
        })
        .catch((err) => this.handleError(err));
    },

    testMachineGetAll() {
      // Sin filtros
      let params = {};
      // Buscar por serial
      params = { serial: "1234567890" };
      // Buscar por estado
      params = { status: "Baja" };
      // Si se require más de un filtro se separa con comas, ejemplo
      params = { machineName: "A", accessories: "de" };
      params = {};

      api.machine
        .getAll(params)
        .then((response) => {
          this.response = response;
        })
        .catch((err) => this.handleError(err));
    },

    testMachineGetById() {
      const id = this.getAux();

      api.machine
        .getById(id)
        .then((response) => {
          this.response = response;
        })
        .catch((err) => this.handleError(err));
    },

    testMachineCreate() {
      api.machine
        .create(this.modelMachine)
        .then((response) => {
          this.response = response;
        })
        .catch((err) => this.handleError(err));
    },

    testMachineEdit() {
      const id = this.getAux();
      const model = {
        accessories: "MODELO: Modelo real del instrumento de magnetoterapia",
      };

      api.machine
        .edit(id, model)
        .then((response) => {
          this.response = response;
        })
        .catch((err) => this.handleError(err));
    },

    handleError(err) {
      this.response = {};
      console.error(err);
      window.alert(err);
    },
  },
};
</script>