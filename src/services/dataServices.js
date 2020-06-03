import axios from 'axios';

const url = 'http://localhost:5000/api';

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
export const getData = (resource, params=null) => {
 
        return axios.get(`${url}/${resource}`, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': getToken()
            },
            params:params
        });
}
    

export const postData = ({ resource, data }) => {
    return axios.post(`${url}/${resource}`, data, config);   
}


