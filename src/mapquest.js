import axios from 'axios';

const mapquestAPI = (endpoint, extraParams = {}) => {
  const apiKey = rNUBvav2dEGGss4WVvHK64tVGGygn3zB;
      
  searchParams = {
    key: apiKey,
    ...extraParams,
  }
  
  return axios({
    method: "GET",
    url: "http://www.mapquestapi.com/" + endpoint,
    dataResponse: "json",
    // set the params 
    params: params
  }
}

export default mapquestAPI;