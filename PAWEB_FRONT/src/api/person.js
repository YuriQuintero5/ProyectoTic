import axios from "axios";
import auth from "./auth";
const config = require("./config.json");

/**
 * Retorna la url de consumo del api
 * @param {String} resource
 * @returns {String}
 */
const url = (resource = "") => {
  return config.host + resource;
};

/**
 * Crear un tercero
 * @param {JSON} body
 * @returns {JSON}
 */
const create = body =>
  axios
    .post(url(config.person.route), body, { headers: auth.headers() })
    .then(response => response.data);

/**
 * Editar tercero
 * @param {JSON} body
 * @returns {JSON}
 */
const edit = (id, body) =>
  axios
    .put(url(config.person.route + `/${id}`), body, { headers: auth.headers() })
    .then(response => response.data);

/**
 * Asignar un equipo a un tercero
 * @param {String} id
 * @param {JSON} body
 * @returns {JSON}
 */
const addMachineById = (id, body) =>
  axios
    .put(url(config.person.machine + `/${id}`), body, {
      headers: auth.headers()
    })
    .then(response => response.data);

/**
 *
 * @param {String} id
 * @returns {JSON}
 */
const getById = id =>
  axios
    .get(url(config.person.route + `/${id}`), { headers: auth.headers() })
    .then(response => response.data);

/**
 * Crea un usuario
 * @param { JSON } params
 * @returns { JSON }
 */
const getAll = params =>
  axios
    .get(url(config.person.route), { params, headers: auth.headers() })
    .then(response => response.data);

export default {
  getAll,
  getById,
  create,
  edit,
  addMachineById
};
