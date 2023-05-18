import axios from 'axios';

const instance = axios.create({
  baseURL:'http://localhost:3002', // "https://project-closet-proxy.herokuapp.com/https://638c69f23acec768294dac57--project-closet.netlify.app", // 'http://localhost:3002',
});
export default instance;
