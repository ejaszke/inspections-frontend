
import axios from 'axios';
const token = localStorage.getItem('session');
axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
