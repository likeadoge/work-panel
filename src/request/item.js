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
    return res.filter(item => item.id != "20200730115701h4usoh301stosqv9he")
}).catch((err) => {
    console.log(err)
})

export const getTemplateList = () => get('/task/project/getTemplate', {}).then((res) => {
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
export const Editproject = ({
        id,
        name,
        templateId,
        orgId,
        beginTime,
        endTime,
        describe
    }) => post('/task/project/edit', {
        id,
        name,
        templateId,
        orgId,
        beginTime,
        endTime,
        describe
    }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
    // 模板重命名
export const EditTemplate = ({ id, name }) => post('/task/project/edit', { id: id, name: name }).then((res) => {
        return res
    }).catch((err) => {
        return err
    })
    // 项目保存为模板
export const saveTemplate = ({ id, name }) => post('/task/template/saveProjectToTemplate', { projectId: id, templateName: name }).then((res) => {
    return res
}).catch((err) => {
    return err
})

// 模板应用为项目
export const applyTemplate = ({ projectName, templateId }) => post('/task/template/applyTemplateToProject', { projectName: projectName, templateId: templateId }).then((res) => {
    return res
}).catch((err) => {
    return err
})