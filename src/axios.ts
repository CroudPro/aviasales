import axios from 'axios'

const instance = axios.create({
    baseURL:"https://front-test.beta.aviasales.ru/"
})
export default instance