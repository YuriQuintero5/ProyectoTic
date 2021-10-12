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
 * Crea un usuario
 * @param { JSON } body
 * @returns { JSON }
 */
const create = body =>
  axios
    .post(url(config.user.route), body, { headers: auth.headers })
    .then(response => response.data);

export default {
  create
};
