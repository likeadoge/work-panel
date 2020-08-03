import ph from "@/utils/placeholder";
import uuid from "@/utils/uuid";


const newRow = () => ({ rowId: uuid() })
const newCol = () => ({ colId: uuid() })

const rows = new Array(5).fill(0).map(() => newRow())
const cols = new Array(4).fill(0).map(() => newCol())
const cards = []
const title = ph()


export const getBoradDetail = (id) => {
    console.log(id)
    return Promise.resolve({
        title, cols, rows, cards
    })
}

export const addBoardRow = (id) => {
    console.log(id)
    rows.push(newRow())
    return Promise.resolve({})
}