import axios from 'axios';
const baseUrl = `http://localhost:3001/persons`;

const getAll = () => {
  return axios.get(baseUrl).then(initailData => initailData.data)
}
 
const create = (newPerson) => {
  return axios.post(baseUrl, newPerson)
}

const update = (newPerson, id) => {
  return axios.put(`${baseUrl}/${id}`, newPerson).then(res => res.data)
}

const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default {getAll, create, remove, update}