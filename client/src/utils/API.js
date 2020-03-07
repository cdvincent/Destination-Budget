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
    .header("X-RapidAPI-Key", process.env.REACT_APP_API_KEY)
  },
  addTrip: function (trip) {
    return axios.post("/api/trips", trip);
  },
  getTrips: function (username) {
    return axios.get("/api/trips/" + username);
  },
  deleteTrip: function (id) {
    return axios.delete("/api/trips/" + id);
  },
  addBudget: function (budget) {
    return axios.post("/api/budget", budget);
  },
  getBudget: function (username) {
    return axios.get("/api/budget/" + username)
  },
  deleteBudget: function (username) {
    return axios.delete("/api/budget/" + username);
  }
};