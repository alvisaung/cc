import axios from "axios";
// const baseUrl = process.env.NODE_ENV == "development" ? "http://localhost:8000/api" : `https://api.cc.ninetyfivegroup.com/api`;
const baseUrl = `https://api.cc.ninetyfivegroup.com/api`;

export default axios.create({
  baseURL: baseUrl,
});
