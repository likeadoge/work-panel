import ph from "@/utils/placeholder";
import uuid from "@/utils/uuid";

export const getProjectLayout = (id) => {
    console.log(id)
    return Promise.resolve({
        name: ph(),
        rows: new Array(5).fill(0).map(() => ({ rowId: uuid() })),
        cols: new Array(4).fill(0).map(() => ({ colId: uuid() })),
    })
}