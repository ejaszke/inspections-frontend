import axios from 'axios'
const { get, post, put, delete: destroy, patch } = axios;
export { get, post, put, destroy, patch }

const token = localStorage.getItem('session');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
