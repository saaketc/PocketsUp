import axios from 'axios';
import jwtDecode from 'jwt-decode';
// const url = 'http://localhost:5000/api/auth';
const url = 'https://pocketsup.herokuapp.com/api/auth';


export const tokenKey = 'privateUserToken';

// const getToken = () => {
//     return localStorage.getItem(tokenKey);
// }
// const config = {
//     headers: {
//         'Content-Type': 'application/json',
//         'x-auth-token': getToken()
//     }
// }
// api calling func to register a user 
export const registerUser = (user) => {

    return axios.post(`${url}/signup`, user);
     

}
// to login a user
export const loginUser =  (credential) => {
    return axios.post(`${url}/login`, credential);
    
    
}
export const getCurrentUser = () => {
    try {
        const user = jwtDecode(localStorage.getItem(tokenKey));
        return user;
    }
    catch (ex) {
        return null;
    }
}
export const logout = () => {
    localStorage.removeItem(tokenKey);
}


