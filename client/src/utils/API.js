import axios from "axios";
const unirest = require("unirest");

export default {
  register: function (user) {
    return axios.post("/api/register", user);
  },
  login: function (user) {
    return axios.post("/api/login", user);
  },
  isAuthorized: function () {
    return axios.get("/api/authorized");
  },
  logout: function () {
    return axios.get("/api/logout");
  },
  availableUN: function (username) {
    return axios.get("/api/user/?username=" + username);
  },
  skyScanner: function (url) {
    return unirest.get(url)
    .header("X-RapidAPI-Host", "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com")
    .header("X-RapidAPI-Key", "5f49839056msh0904f5e8160aafap1c21f4jsn934d1f26815d")
  }
  //search user
};