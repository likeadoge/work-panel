import { post } from '@/request/http'
import Vue from 'vue'

export const login = ({ username, password }) => post('/sys/login', { username, password })
    .then(({ token, userInfo }) => {
        Vue.ls.set('ACCESS_TOKEN', token)
        return { userInfo,token }
    })


export const register = ({ username, password }) => post('/sys/user/register', {
    username, password
})