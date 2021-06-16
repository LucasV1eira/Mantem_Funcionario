import Vue from 'vue'
import axios from 'axios'

//Vue.prototype.$axios = axios

const api_employed = axios.create({ baseURL: 'https://apiretaguarda.azurewebsites.net/api' })
Vue.prototype.$api = api_employed

export { axios, api_employed }