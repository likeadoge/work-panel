import Vue from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'


export const msgError = (msg) => {
    if(msg) message.error(msg, 3)
    return Promise.reject(msg)
};

// 创建 axios 实例
const service = Promise.resolve(null).then(() => {
    return axios.create({
        baseURL: 'http://39.101.132.217:9999/task-boot/',
        timeout: -1,
    })
})

// request interceptor
service.then(v => {
    v.interceptors.request.use((request) => {
        const token = Vue.ls.get("ACCESS_TOKEN")
        if (token) {
            request.headers['X-Access-Token'] = token // 让每个请求携带自定义 token 请根据实际情况自行修改
        }
        return request
    }, (error) => {
        console.error(error)
        return Promise.reject('请求逻辑错误')
    })

    v.interceptors.response.use((response) => {
        return response.data
    }, (error) => {
        console.error(error)
        return Promise.reject('无法连接到服务器')
    })
})



const send = (config) => {
    return Promise.resolve()
        .then(() => service)
        .then(s => s(config))
        .then(e => {
            if (e.success) return e.result
            if (e.code === 401) {
                // store?.then(store => {
                //     store.default.commit('userInfo/removeUserInfo')
                // })
                // return new Promise(resolve => {
                //     tokenCache.push(() => {
                //         resolve()
                //     })
                // }).then(() => send(config))
            }
            else throw e.message
        })
}


export const del = Object.assign((url, parameter) => send({
    url: url,
    method: 'delete',
    params: parameter
}, true).catch(msgError), {
    withoutError: (url, parameter) => send({
        url: url,
        method: 'delete',
        params: parameter
    }, true)
})

export const post = Object.assign(
    (url, parameter) => send({
        url: url,
        method: 'post',
        data: parameter
    }, false).catch(msgError),
    {
        withoutError: (url, parameter) => send({
            url: url,
            method: 'post',
            data: parameter
        }, false)
    })

export const get = Object.assign((url, parameter) => send({
    url: url,
    method: 'get',
    params: parameter
}, true).catch(msgError), {
    withoutError: (url, parameter) => send({
        url: url,
        method: 'get',
        params: parameter
    }, true)
})

export const put = Object.assign((url, parameter) => send({
    url: url,
    method: 'put',
    data: parameter
}, true).catch(msgError), {
    withoutError: (url, parameter) => send({
        url: url,
        method: 'put',
        data: parameter
    }, true)
})
