import axios from "axios";

const api = axios.create({
  // baseURL: "https://app-quizz-backend-nodes-express-and.onrender.com",
  baseURL: "http://192.168.43.184:3000", // usa o IP da tua máquina
  timeout: 10000,
});



export default api; 