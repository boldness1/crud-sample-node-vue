import axios from 'axios'
// import store from '../store';

const api_key = "testapikey1234testapikey";

const Api = {

    init(baseURL) {
        axios.defaults.baseURL = baseURL;
        this.setHeader();
    },

    setHeader() {
        // axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
        axios.defaults.headers.common["API_KEY"] = api_key;
        axios.defaults.headers.common["APP-CLIENT"] = 'WEB-CLIENT';
        // axios.defaults.headers.common["Content-Type"] = 'application/json';
    },
    setToken(token) {
        axios.defaults.headers.common["ACCESS_TOKEN"] = token;

    },

    removeHeader() {
        axios.defaults.headers.common = {}
    },

    get(resource) {
        return axios.get(resource)
    },

     post(resource, data) {
        return axios.post(resource, data)
    },

    patch(resource, data) {
        try {
            return axios.patch(resource, data)
        }catch (error){
            return error
        }

    },

    put(resource, data) {

        return axios.put(resource, data)
    },


}

export default Api
