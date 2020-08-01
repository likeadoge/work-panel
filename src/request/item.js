import { post, get } from '@/request/http'
// import { from } from 'core-js/fn/array'
// import { format } from 'core-js/fn/date'
// import Vue from 'vue'

export const addProject = ({
    id,
    name,
    template,
    orgld,
    beginTime,
    endTime,
    describe
}) => post('/task/project/add', {
    id,
    name,
    template,
    orgld,
    beginTime,
    endTime,
    describe
})

export const getProject = () => get('/task/project/get', { status: 1 }).then((res) => {
    return res
})

export const getDepart = () => get('/sys/sysDepart/queryList', {}).then((res) => {
    return res
})

// export const getUserInfo = () => get.withoutError('/sys/userInfo', {})