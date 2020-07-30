
// 创建 axios 实例
const service = Promise.resolve(null).then(() => {
    return axios.create({
        baseURL: 'http://39.101.132.217:8090/idata-boot'
    })
})

// request interceptor
service.then(v => {
    v.interceptors.request.use((request) => {

        if (process.type === 'renderer') {
            const s = import('@/store/render')
            return s.then((store) => {
                const token = store.default.state.userInfo.token
                if (token) {
                    request.headers['X-Access-Token'] = token
                }
                return request
            })
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



const tokenCache = []


const store = process.type === 'renderer' ? import('@/store/render') : null


store?.then(store => {
    store.events.onTokenChange.push(token => {
        if (!token) return
        while (tokenCache.length > 0) {
            tokenCache.pop()?.()
        }
    })
})

const send = (config, needToken) => {

    return new Promise((resolve) => {

        // 判断是否有 token
        if (store) {
            store.then(store => {
                if (needToken && !store.default.state.userInfo.token) {
                    tokenCache.push(() => {
                        resolve()
                    })
                } else {
                    resolve()
                }
            })
        } else {
            resolve()
        }
    })
        .then(() => service)
        .then(s => s(config))
        .then((e) => Promise.resolve(e)
            .then(e => {
                if (e.success) return e.result
                if (e.code === 401) {
                    store?.then(store => {
                        store.default.commit('userInfo/removeUserInfo')
                    })
                    return new Promise(resolve => {
                        tokenCache.push(() => {
                            resolve()
                        })
                    }).then(() => send(config, needToken))
                }
                else throw e.message
            }))
}


export const del = Object.assign((url, parameter) => send({
    url: url,
    method: 'delete',
    params: parameter
}, true).catch(msgError), {
    withoutToken: (url, parameter) => send({
        url: url,
        method: 'delete',
        params: parameter
    }, false),
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
        withoutToken: (url, parameter) => send({
            url: url,
            method: 'post',
            data: parameter
        }, false),
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
    withoutToken: (url, parameter) => send({
        url: url,
        method: 'get',
        params: parameter
    }, false),
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
    withoutToken: (url, parameter) => send({
        url: url,
        method: 'put',
        data: parameter
    }, false),
    withoutError: (url, parameter) => send({
        url: url,
        method: 'put',
        data: parameter
    }, true)
})
