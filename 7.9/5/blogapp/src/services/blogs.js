import axios from 'axios'
const baseUrl = '/api/blogs'
/*
before building and deploying to herokum or also if proxy is set
*/

//const baseUrl = 'http://localhost:3001/api/blogs'
//for running on home server with concurrently subdependency


let token = null
const setToken = newToken => {  token = `bearer ${newToken}`}


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}



const remove = async anobject => {


  const id=anobject.id

  const response = await axios.delete(`${baseUrl}/${id}`,
    {
      headers: { Authorization: token },
      data: anobject
      //,params: {id: id}

    })
  return response.data
}




const create = async newObject => {
  const config = {    headers: { Authorization: token },  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, newObject) => {
  const response = await axios.put(`${ baseUrl }/${id}`, newObject)
  return response.data
}

const updatecomments = async (id, newObject) => {
  const response = await axios.post(`${ baseUrl }/${id}/comments`, newObject)
  return response.data
}


export default { getAll, create, update, setToken,remove,updatecomments }