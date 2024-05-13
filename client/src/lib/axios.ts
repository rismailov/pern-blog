import Axios, { AxiosResponse } from 'axios'

const axios = Axios.create({
    baseURL: 'http://localhost:4000/api/v1',
    // withXSRFToken: true,
    // withCredentials: true,
    // headers: {
    //     'X-Requested-With': 'XMLHttpRequest',
    //     Accept: 'application/json',
    // },
})

axios.interceptors.response.use(
    async (response: AxiosResponse) => response.data,
)

export default axios
