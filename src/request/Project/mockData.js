import ph from "@/utils/placeholder";
import uuid from "@/utils/uuid";

export class Boards {
    rows
    cols
    cards = []
    id
    title
    constructor() {
        this.id = uuid()
        this.title = ph()
        this.rows = new Array(5).fill(0).map(() => ({ rowId: uuid() }))
        this.cols = new Array(4).fill(0).map(() => ({ colId: uuid() }))
    }
    addCard({ rowId, colId, id, info }) {
        this.cards.push({ rowId, colId, id, info })
    }
}

export class Task {
    static all = new Array(6).fill(0).map(() => (new Task()))
    id
    title
    Boards = []
    constructor() {
        this.id = uuid()
        this.title = ph()
        this.Boards = new Array(6).fill(0).map(() => (new Boards()))
    }
}




