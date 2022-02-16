import axios from 'axios';

// const API = 'http://46.38.245.184:3001';
const API = '';

/* GET */
const getPromise = (data) => new Promise((resolve) => {
  const url = data.url || '';
  axios.get(`${API}${url}`, { data: 'aui' }, { withCredentials: true })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      resolve(err);
    });
});

/* PUT */
const putPromise = (data) => new Promise((resolve) => {
  const dataRead = data || {};
  const url = data.url || '';
  axios.put(`${API}${url}`, dataRead, { withCredentials: true })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      resolve(err);
    });
});

/* POST */
const postPromise = (data) => new Promise((resolve) => {
  const dataRead = data || {};
  const url = data.url || '';
  axios.post(`${API}${url}`, dataRead, { withCredentials: true })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      resolve(err);
    });
});

/* DELETE */
const delPromise = (data) => new Promise((resolve) => {
  const url = data.url || '';
  axios.delete(`${API}${url}`, { withCredentials: true })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      resolve(err);
    });
});

const uploadPromise = (data) => new Promise((resolve) => {
  const formData = new FormData();
  formData.append('name', 'image');
  formData.append('file', data.file);

  const url = data.url || '';
  axios.post(`${API}${url}`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      resolve(err);
    });
});

const get = async (data) => getPromise(data);
const put = async (data) => putPromise(data);
const del = async (data) => delPromise(data);
const post = async (data) => postPromise(data);
const upload = async (data) => uploadPromise(data);

export default {
  get, put, post, del, upload
};
