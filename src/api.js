import axios from "axios";

export default axios.create({
  baseURL: "https://mascot.academictechnexus.com",
  timeout: 20000
});
