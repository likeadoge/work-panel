// import ph from "@/utils/placeholder";
import uuid from "@/utils/uuid";
import * as http from './http'
import moment from 'moment';


const newRow = () => ({ rowId: uuid(), sort: rows.length })
const newCol = () => ({ colId: uuid() })

let rows = []
let cols = []
// let cards = []
// let title = ph()


const newCard = {
    toServer: (panelId, {
        rowId,
        colId,
        cardId,
        sort,
        content,
        executors,
        time,
        hour
    }) => ({
        laneId:rowId,
        columnId:colId,
        cardId,
        sort,
        panelId,
        name:content,
        execId:executors.map(v=>v.uid).join(','),
        workTime:hour,
        endTime:time?time.format('YYYY-MM-DD hh:mm:ss'):''
     }),
    toClient: ({
        cardId,
        columnId,
        laneId,
        name,
        sort,
        version,
        endTime,
        workTime,
        execName
    }) => ({
        rowId: laneId,
        colId: columnId,
        cardId,
        sort,
        version,
        executors:execName?execName.map(({id,name})=>({
            uid:id,realname:name
        })):[],
        content: name,
        hour:Number(workTime)?Number(workTime):0,
        time:endTime?moment(endTime):null
    })
}


// const _newCard = ({
//     cardId,
//     columnId,
//     laneId,
//     name,
//     // panelId,
//     sort,
//     version,
//     endTime,
// }) => ({
//     rowId: laneId,
//     colId: columnId,
//     cardId,
//     sort,
//     version,
//     content: name,
//     time:endTime?moment(endTime):null,

// })

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
        cards: cardInfos.map(v => newCard.toClient(v)),
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

    return http.post('/task/lane/drag', rows.map((v, sort) => ({
        sort,
        id: v.rowId
    })))
}

export const addCard = (panelId, card) => {

    return http.post('/task/card/create', newCard.toServer(panelId,card))
}

export const updateCards = (panelId, arr) => {
    return http.post('/task/card/drag', {
        panelId,
        cellList: arr.map(({ colId, rowId, version, items }) => ({
            columnId: colId,
            laneId: rowId,
            version: version,
            cardList: items.map(({ cardId, sort }) => ({
                cardId, sort
            }))
        })),
    })
}

export const getCellsCard = (panelId, arr) => {
    return http.post('/task/card/getCellsInfo', arr.map(({ colId, rowId }) => ({
        columnId: colId,
        laneId: rowId,
        panelId
    }))).then(arr => arr.map(({ columnId, laneId, cardInfos }) => ({
        rowId: laneId,
        colId: columnId,
        items: cardInfos.map(v => newCard.toClient(v))
    })))
}


