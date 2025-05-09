import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://template-onboarding-node-944896486321.us-central1.run.app/",
});

export default apiClient;
