import { post, get } from '@/request/http'
// import { from } from 'core-js/fn/array'
// import { format } from 'core-js/fn/date'
// import Vue from 'vue'

export const addProject = ({
    name,
    template,
    orgId,
    beginTime,
    endTime,
    describe
}) => post('/task/project/add', {
    name,
    template,
    orgId,
    beginTime,
    endTime,
    describe
})

export const getProject = (status) => get('/task/project/get', { status: status }).then((res) => {
    return res
})

export const getDepart = () => get('/sys/sysDepart/queryList', {}).then((res) => {
    return res
})

export const getTemplate = () => get('/task/project/getTemplate', {}).then((res) => {
    return res
}).catch((err) => {
    console.log(err)
})


export const getBoard = (id) => get('/task/panel/get', { projectId: id }).then((res) => {
    return res
})

export const createBoard = ({ name, projectId }) => post('/task/panel/create', { name, projectId: projectId })

// export const getUserInfo = () => get.withoutError('/sys/userInfo', {})