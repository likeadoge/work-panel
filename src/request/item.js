import { post, get } from '@/request/http'
// import { from } from 'core-js/fn/array'
// import { format } from 'core-js/fn/date'
// import Vue from 'vue'

export const addProject = ({
    name,
    templateId,
    orgId,
    beginTime,
    endTime,
    describe
}) => post('/task/project/add', {
    name,
    templateId,
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
    // 获取模板列表
export const getTemplate = () => get('/task/project/getTemplate', {}).then((res) => {
    return res
}).catch((err) => {
    console.log(err)
})


export const getBoard = (id) => get('/task/panel/get', { projectId: id }).then((res) => {
    return res
})

export const createBoard = ({ name, projectId }) => post('/task/panel/create', { name, projectId: projectId })


// 项目归档
export const Libraryproject = (id) => get('/task/project/archive', { id: id }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
    // 项目删除
export const Deleteproject = (id) => get('/task/project/delete', { id: id }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
    // 项目还原
export const Returnproject = (id) => get('/task/project/reserve', { id: id }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
    // 编辑项目
export const Editproject = (id) => post('/task/project/edit', { id: id }).then((res) => {
    return res
}).catch((err) => {
    return err
})

// 项目保存为模板
export const saveTemplate = ({ projectId, templateName }) => post('/task/template/saveProjectToTemplate', { projectId: projectId, templateName: templateName }).then((res) => {
    return res
}).catch((err) => {
    return err
})