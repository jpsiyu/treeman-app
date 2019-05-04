import axioswrap from './axioswrap'

const getToken = (user, password) => {
  return axioswrap.get(`/pubapi/login?user=${user}&password=${password}`)
}

const genPerson = (name, age, gender) => {
  const ajaxData = { name, age, gender }
  return axioswrap.post("/api/person/gen", ajaxData)
}

const getAllPerson = () => {
  return axioswrap.get("/api/person/all")
}

const updatePerson = (id, name, age, gender) => {
  const ajaxData = { id, name, age, gender }
  return axioswrap.put("/api/person/update", ajaxData)
}

const delPerson = (id) => {
  return axioswrap.put("/api/person/del", { id })
}

const getPersonByName = (name) => {
  return axioswrap.get(`/api/person/find?name=${name}`)
}

const getPersonById = (id) => {
  return axioswrap.get(`/api/person/findbyid?id=${id}`)
}

const getRecord = (id) => {
  return axioswrap.get(`/api/record/person?id=${id}`)
}

const delRecord = (id) => {
  const ajaxData = { id };
  return axioswrap.put("/api/record/del", ajaxData)
}

const addRecord = (id, detail, comment) => {
  const ajaxData = { detail, comment, id }
  return axioswrap.post("/api/record/add", ajaxData)
}

const updateRecord = (id, detail, comment) => {
  const ajaxData = { detail, comment, id }
  return axioswrap.put("/api/record/update", ajaxData)
}

const getAllRecord = () => {
  return axioswrap.get("/api/record/all")
}

const getAllGroup = () => {
  return axioswrap.get("/api/group/all")
}

const addGroup = (name) => {
  const ajaxData = { name }
  return axioswrap.post("/api/group/add", ajaxData)
}

const delGroup = (id) => {
  return axioswrap.put("/api/group/del", { id })
}

const updateGroup = (id, members) => {
  const ajaxData = { id, members }
  return axioswrap.put("/api/group/update", ajaxData)
}


export default {
  getToken,
  genPerson,
  getAllPerson,
  delPerson,
  updatePerson,
  getPersonByName,
  getPersonById,
  getRecord,
  delRecord,
  addRecord,
  updateRecord,
  getAllRecord,
  getAllGroup,
  addGroup,
  delGroup,
  updateGroup,
}
