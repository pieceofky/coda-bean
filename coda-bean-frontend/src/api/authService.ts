import axios from "axios";
import { LoginDto } from "../types/login.dto";
import { RegisterDto } from "../types/register.dto";

const AUTH_BACKEND_URL = 'http://localhost:8080/api/auth';

export const loginApiCall = (login: LoginDto) =>
    axios.post(AUTH_BACKEND_URL + '/login', login);

export const registerApiCall = (registerDto: RegisterDto) =>
    axios.post(AUTH_BACKEND_URL + '/register', registerDto);

export const setToken = (token: string) => {
    localStorage.setItem('token', token);
}


export const getToken = () => {
    return localStorage.getItem('token');
}

export const setLoggedInUserName = (username: string) => {
    sessionStorage.setItem('loggedInUserName', username);
}
export const getLoggedInUserName = () => {
    return sessionStorage.getItem('loggedInUserName');
}

export const isLoggedIn = () => {
    return getLoggedInUserName() !== null;
}

export const setLoggedInUserRole = (role: string) => {
    sessionStorage.setItem('loggedInUserRole', role);
}
export const getLoggedInUserRole = () => {
    return sessionStorage.getItem('loggedInUserRole');
}


export const isAdmin = () => {
    const role = getLoggedInUserRole();
    if (role) {
        return role.trim() === 'ROLE_ADMIN';
    }
    return false;
}