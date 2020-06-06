import axios from 'axios';

// const url = 'http://localhost:5000/api';
const url = 'https://pocketsup.herokuapp.com/api';
const tokenKey = 'privateUserToken';

const getToken = () => {
    return localStorage.getItem(tokenKey);
}
const config = {
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getToken()
    },
}
export const getData = (resource) => {
 
        return axios.get(`${url}/${resource}`, config);
}
    

export const postData = ({ resource, data }) => {
    return axios.post(`${url}/${resource}`, data, config);   
}


