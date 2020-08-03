// import ph from "@/utils/placeholder";
import uuid from "@/utils/uuid";
import * as http from './http'


const newRow = () => ({ rowId: uuid(), sort: rows.length })
const newCol = () => ({ colId: uuid() })

let rows = []
let cols = []
// let cards = []
// let title = ph()

rows.push(newRow()); rows.push(newRow()); rows.push(newRow()); rows.push(newRow());
cols.push(newCol()); cols.push(newCol()); cols.push(newCol()); cols.push(newCol());

export const getBoradDetail = (panelId) => {
    // console.log(id)
    // console.log({
    //     title, cols, rows: rows.sort((a, b) => a.sort - b.sort), cards
    // })
    // return Promise.resolve({
    //     title, cols, rows: rows.sort((a, b) => a.sort - b.sort), cards
    // })
    return http.get('/task/panel/getPanelInfo', { panelId }).then(({ panelColumns, lanes, cardInfos, panel, project }) => ({
        cols: panelColumns.map(({
            id, name, sort
        }) => ({ colId: id, name, sort })).sort((a, b) => a.sort - b.sort),
        rows: lanes.map(({
            id, sort
        }) => ({ rowId: id, sort })).sort((a, b) => a.sort - b.sort),
        cards: cardInfos.map(({ columnId, laneId, name, sort }) => ({
            rowId: laneId, colId: columnId, content: name, sort
        })),
        panel: panel,
        title: panel.name,
        templateName: project.template
    }))
}

export const addBoardRow = (panelId) => {
    // console.log(id)
    // rows.push(newRow())
    // return Promise.resolve({})

    return http.post('/task/lane/create', { panelId })
}


export const deleteBoardRow = (id) => {
    // rows = rows.filter(v => v.rowId !== rowid).sort((a, b) => a.sort - b.sort).map((v, i) => Object.assign({}, v, {
    //     sort: i
    // }))
    // return Promise.resolve({})
    return http.get('/task/lane/delete', { id })
}

export const sortBoardRows = (rows) => {
    // console.log(rows)
    // rows = _rows.map((v, i) => Object.assign({}, v, { sort: i }))
    // return Promise.resolve({})

    return http.post('/task/lane/drag', rows.map((v,sort)=>({
        sort,
        id:v.rowId
    })))
}




export const addCard = (panelId, {
    rowId, colId, info, sort
}) => {
    // cards.push({
    //     rowId,
    //     colId,
    //     sort,
    //     content: info.content || "",
    // });
    // return Promise.resolve({})

    return http.post('/task/card/create', {
        panelId,
        columnId: colId,
        laneId: rowId,
        name: info.content,
        sort: sort
    })
}