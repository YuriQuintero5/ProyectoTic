// https://vuex.vuejs.org/en/actions.html
import axios from "axios";
import { restApi } from "../plugins/axios";
import SecureLS from "secure-ls";

let ls = new SecureLS();
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "access-token": ls.get("userInfo").token,
};
/* The login action(function) first param is the vuex commit destructured object, 
second is userData which is passed from where-ever you call that action.
You then create a promise in the "login"'s return which is where we put the code
that we will use to trigger mutations.
*/

async function login({ commit }, userData) {
  // one day ill implement snackbars with the auth state or use it in a component or footer
  commit("auth_request");

  let response = await restApi
    .post("login", userData)
    .then((response) => {
      // we use the data we get back in the response object after the promise succeeds
      //you can change the data object props to match whatever your sever sends
      console.log(response);
      const typeResponse = response.data.type;
      if (typeResponse == "error") {
        console.log("login error");
        commit("auth_error");
        ls.remove("userInfo");
        return response;
      }

      const token = response.data.data.token.access_token;
      const username = response.data.data.userName;
      const userFistName = response.data.data.person.firstName;
      const userLastName = response.data.data.person.lastName;
      const role = response.data.data.role.roleName;

      // storing jwt in localStorage. https cookie is safer place to store
      ls.set("userInfo", {
        user: `${userFistName} ${userLastName}`,
        username: username,
        token: token,
        role: role,
      }); // using secure-ls to encrypt local storage
      axios.defaults.headers.common["access-token"] = token;
      // calling the mutation "auth_success" to change/update state.properties to the new values passed along in the second param
      commit("auth_success", { token, username });
      return response.data;
    })
    .catch((err) => {
      console.log(`login error ${err}`);
      commit("auth_error");
      ls.remove("token");
    });

  return response;
}

async function createPerson({ commit }, userData) {
  let response = await restApi
    .post("person", userData, { headers: headers })
    .then((response) => {
      console.log(response);
      commit('create_person')
    })
    .catch((err) => {
      console.log(`create person error ${err}`);
      commit('create_person_error')
    });

  return response;
}

async function getPerson({ commit }, id) {
  let params = { identityDocument: id };

  let response = await restApi
    .get("person", { params, headers: headers })
    .then((response) => response.data)
    .catch((err) => {
      console.log(`get person error ${err}`);
      commit('get_person_error')
    });

  return response;
}

async function updatePerson({ commit }, userData) {
  let response = await restApi
    .put(`person/${userData.id}`, userData.model, { headers: headers })
    .then((response) => response.data)
    .catch((err) => {
      console.log(`update person error ${err}`);
      commit('update_person_error')
    });

  return response;
}

async function getAllMachines({ commit }, params) {
	const role = ls.get('userInfo').role
	let uri = 'machine';
	if (role === 'Técnico' || role === 'Asesor comercial') {
		if (params != 'Default') {
			uri = `machine/?status=${params}`
		}
	}

  let response = await restApi
    .get(uri, { headers: headers })
    .then((response) => response.data)
    .catch((err) => {
      console.log(`get machine error ${err}`);
      commit('get_all_machines_error')
    });

  return response;
}

//#region Equipo
async function createMachine({ commit }, userData) {
  console.log (userData)
  let response = await restApi
    .post("machine", userData, { headers: headers })
    .then((response) => response.data)
    .catch((err) => {
      console.log(`error creando equipo. ${err}`);
      commit('create_machine_error')
    });

  return response;
}

async function getMachine({ commit }, id) {
  console.log(id);
  let params = { serial: id };
  let response = await restApi
    .get("machine", { params, headers: headers })
    .then((response) => response.data)
    .catch((err) => {
      console.log(`error consultando equipo ${err}`);
      commit('get_machine_error')
    });

  return response;
}

async function updateMachine({ commit }, userData) {
  let response = await restApi
    .put(`machine/${userData.id}`, userData, { headers: headers })
    .then((response) => response.data)
    .catch((err) => {
      console.log(`Error actualizando el equipo. ${err}`);
      commit('update_machine_error')
    });

  return response;
}

async function getMachineById({ commit }, id) {
	let response = await restApi
		.get(`machine/${id}`, { headers: headers })
		.then((response) => response.data)
		.catch((err) => {
			console.log(`get machine error ${err}`);
			commit('get_machine_by_id_error')
		});
  
	return response;
}

async function createReview({ commit }, userData) {
	let response = await restApi
		.put(`machine/review/${userData.id}`, userData.model, { headers: headers })
		.then((response) => response.data)
		.catch((err) => {
			console.log(`create review error ${err}`);
			commit('create_review_error')
		});
  
	return response;
}

async function createFail({ commit }, userData) {
	let response = await restApi
		.put(`machine/fail/${userData.id}`, userData.model, { headers: headers })
		.then((response) => response.data)
		.catch((err) => {
			console.log(`create fail error ${err}`);
			commit('create_fail_error')
		});
  
	return response;
}

async function createAssigment({ commit }, userData) {
	let response = await restApi
		.put(`person/machine/${userData.id}`, userData.model, { headers: headers })
		.then((response) => response.data)
		.catch((err) => {
			console.log(`create assigment error ${err}`);
			commit('create_assigment_error')
		});
  
	return response;
}

export default {
  login,
  createPerson,
  getPerson,
  updatePerson,
  getAllMachines,
  createMachine,
  getMachine,
  updateMachine,
  getMachineById,
  createReview,
  createFail,
  createAssigment,
  logout({ commit }) {
    return new Promise((resolve, reject) => {
      commit("logout");
      ls.remove("userInfo");
      delete restApi.defaults.headers.common["access-token"];
      resolve()
        //catches any errors and passed them to the promise for you to do something with
        .catch((error) => reject(error));
    });
  },
};
