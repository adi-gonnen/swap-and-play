var STORAGE_KEY = 'loggedinUser';
import UtilService from './UtilService.js'
import axios from 'axios'
import { eventBus, EVENT_LOGIN_USER } from '../services/EventBusService.js'
axios.defaults.withCredentials = true;

const URL = process.env.NODE_ENV !== 'development'
    ? '/user'
    : 'http://localhost:3000/user'

var loggedinUser = UtilService.load(STORAGE_KEY) || null;
console.log('Logged:', loggedinUser);
if (loggedinUser) {
    eventBus.$emit(EVENT_LOGIN_USER, loggedinUser.username)

}

function createUser(userDetails) {
    // console.log(userDetails, 'newuser service front')
    return axios.post(`${URL}/signup`, userDetails)
        .then(res => {
            const user = res.data;
            _setLoggedinUser(user);
            return user;
        })

        .catch(err => err)
}


function getUser(userCreds) {
    // console.log('req@@:', userCreds);
    return axios.post(`${URL}/login`, { user: userCreds })
        .then(res => {
            // console.log('req##:', userCreds);
            const user = res.data;
            _setLoggedinUser(user);
            return user;
        })
        .catch(err => {
            console.log('errrrrrr', err)
            throw err
        })
}


function logout() {
    return axios.post(`${URL}/logout`)
        .then(res => {
            console.log('res from axios logput call',res)
            loggedinUser = null;
            UtilService.store(STORAGE_KEY, null)
            eventBus.$emit(EVENT_LOGIN_USER, null)
        });
}

function saveUser(user) {
    // console.log('upadte game in fron service', game)
    return axios.put(`${URL}/${user._id}`, user)
        .then(res => res.data)
        .catch(err => console.log('Problem talking to server', err))
}

function getLoggedinUser() {
    return loggedinUser
}

function _setLoggedinUser(user) {
    loggedinUser = user;
    UtilService.store(STORAGE_KEY, loggedinUser);
    eventBus.$emit(EVENT_LOGIN_USER, user);
}

function getUserById(userId) {
    // console.log('getUserById in game service front', userId);
    return axios.get(`${URL}/${userId}`)
        .then(res => {
            console.log('getUserById from server', res.data)
            return res.data
        })
        .catch(err => console.log('Problem talking to server', err))
}


export default {
    getUser,
    createUser,
    logout,
    getLoggedinUser,
    saveUser,
    getUserById

}


