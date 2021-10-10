import axios from "axios";
const config = require("./config.json");
const SESSION = "session";

/**
 * Almacena en el localStorage del navegador la variable de sesion
 * @param {String} value
 * @param {String} key
 */
const saveLocalStorage = (value, key = SESSION) => {
  window.localStorage.setItem(key, JSON.stringify(value));
};

/**
 * Retorna el token almacenado en el local storage en la clave session
 * @returns {String}
 */
const getToken = () => {
  try {
    const session = window.localStorage.getItem(SESSION);
    // console.log(session);
    if (session) {
      return JSON.parse(session).data.token.access_token;
    }
  } catch (error) {
    return null;
  }
};

/**
 * Retorna el nombre del rol del usuario logueado
 * @returns {String}
 */
const getRoleName = () => {
  try {
    const session = window.localStorage.getItem(SESSION);
    if (session) {
      return JSON.parse(session).data.role.roleName;
    }
  } catch (error) {
    return null;
  }
};

/**
 * Retorna el objeto session
 * @returns {Object}
 */
const getSession = () => {
  try {
    const session = window.localStorage.getItem(SESSION);
    if (session) {
      return session;
    }
  } catch (error) {
    return null;
  }
};

/**
 * Retorna la url de consumo del api
 * @param {String} resource
 * @returns {String}
 */
const url = (resource = "") => {
  return config.host + resource;
};

const headers = () => {
  return {
    Accept: "application/json",
    "Content-Type": "application/json",
    "access-token": getToken()
  };
};

const headersLogin = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

/**
 * Consulta el api de autenticación
 * @param { JSON } body
 * @returns { JSON }
 */
const login = body =>
  axios
    .post(url(config.user.login), body, { headers: headersLogin })
    .then(response => {
      saveLocalStorage(response.data);
      return response.data;
    });

export default {
  login,
  saveLocalStorage,
  getToken,
  getRoleName,
  getSession,
  headers
};
