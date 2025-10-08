import axios from 'axios';
const baseUrl = `http://localhost:3001/persons`;

const getAll = () => {
  return axios.get(baseUrl).then(initailData => initailData.data)
}
 
const create = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

export default {getAll, create}