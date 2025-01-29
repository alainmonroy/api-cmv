import axios from 'axios';

axios.defaults.baseURL = 'https://localhost:7095/api';  
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default axios;
