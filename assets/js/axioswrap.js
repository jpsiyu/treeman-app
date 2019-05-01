import axios from 'axios'
import qs from 'qs'

const apiUrl = "http://127.0.0.1:20000"

const get = (path) => {
    return axios.get(apiUrl + path, getOptions())
        .catch(handlePromissError)
}

const put = (path, data) => {
    return axios.put(apiUrl + path, qs.stringify(data), getOptions())
        .catch(handlePromissError)
}

const post = (path, data) => {
    return axios.post(apiUrl + path, qs.stringify(data), getOptions())
        .catch(handlePromissError)
}

const getOptions = () => {
    if (!window.$nuxt) return {}
    const options = {
        headers: {
            Authorization: window.$nuxt.$store.state.tokenStr
        }
    }
    return options
}

const handlePromissError = (err) => {
    return
    const res = err.response
    if(!res) {
        console.log("no response from server")
        return
    }
    switch (res.status) {
        case 401:
            window.$nuxt.$router.push("/login")
            break
    }
}

export default {
    get,
    put,
    post
}
