import ph from "@/utils/placeholder";
import uuid from "@/utils/uuid";


const newRow = () => ({ rowId: uuid(), sort: rows.length })
const newCol = () => ({ colId: uuid() })

let rows = []
let cols = []
let cards = []
let title = ph()

rows.push(newRow()); rows.push(newRow()); rows.push(newRow()); rows.push(newRow());
cols.push(newCol()); cols.push(newCol()); cols.push(newCol()); cols.push(newCol());

export const getBoradDetail = (id) => {
    console.log(id)
    console.log({
        title, cols, rows: rows.sort((a, b) => a.sort - b.sort), cards
    })
    return Promise.resolve({
        title, cols, rows: rows.sort((a, b) => a.sort - b.sort), cards
    })
}

export const addBoardRow = (id) => {
    console.log(id)
    rows.push(newRow())
    return Promise.resolve({})
}

export const sortBoardRows = (_rows) => {
    rows = _rows.map((v, i) => Object.assign({}, v, { sort: i }))
    return Promise.resolve({})
}


export const deleteBoardRow = (rowid) => {
    rows = rows.filter(v=>v.rowId!==rowid).sort((a, b) => a.sort - b.sort).map((v,i)=>Object.assign({},v,{
        sort:i
    }))
    return Promise.resolve({})
}