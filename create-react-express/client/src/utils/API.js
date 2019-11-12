import axios from "axios";

export default {

  getAllCards: function () {
    console.log("Inside get all cards API check");
    return axios.get("/api/allCards");
  }


};
