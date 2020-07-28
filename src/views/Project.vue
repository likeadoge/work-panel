<template>
  <flex-col style="height:100%;">
    <flex-fixed></flex-fixed>

    <h1 style="margin:24px 0 0 24px">{{name}}</h1>
    <flex-fill>
      <div
        :style="{
      display:'grid',
      gridGap:'20px',
      padding:'20px',
      overflow:'auto',
      height:'100%',
      width:`${(cols.length +1) * 300 + 20}px`,
      positon:'relative',
      gridTemplateColumns:`repeat(${(cols.length +1)},280px)`
    }"
      >
        <template v-for="v in cells">
          <cell-panel
            v-if="v.type === 'panel'"
            :key="`${v.rowId}-${v.colId}`"
            :rowId="v.rowId"
            :colId="v.colId"
            :items="v.items"
            @add="({rowId,colId})=>addItem({rowId,colId})"
          />

          <row-opreater
            v-if="v.type === 'operate'"
            :key="`${v.rowId}-${v.colId}`"
            :rowId="v.rowId"
            @rowUp="({rowId})=>rowUp(rowId)"
            @rowDown="({rowId})=>rowDown(rowId)"
            @rowTop="({rowId})=>rowTop(rowId)"
            @rowBottom="({rowId})=>rowBottom(rowId)"
            @rowDelete="({rowId})=>rowDelete(rowId)"
            @rowCopy="({rowId})=>rowCopy(rowId)"
          />
        </template>
      </div>
    </flex-fill>
  </flex-col>
</template>

<script>
import ph from "@/utils/placeholder";
import uuid from "@/utils/uuid";

import RowOpreater from "./project/RowOpreater";
import CellPanel from "./project/CellPanel";

export default {
  components: {
    RowOpreater,
    CellPanel,
  },
  data: () => ({
    name: ph(),
    rows: new Array(5).fill(0).map(() => ({ rowId: uuid() })),
    cols: new Array(4).fill(0).map(() => ({ colId: uuid() })),
    list: [],
  }),
  computed: {
    cells() {
      return this.rows.flatMap(({ rowId }) =>
        this.cols
          .map(({ colId }) => ({
            rowId,
            colId,
            type: "panel",
            items: this.list.filter(
              (v) => v.rowId === rowId && v.colId === colId
            ),
          }))
          .concat([
            {
              rowId,
              colId: null,
              type: "operate",
            },
          ])
      );
    },
  },
  methods: {
    addItem({ rowId, colId }) {
      // console.info("add item", { rowId, colId });
      this.list.push({
        rowId,
        colId,
        content: ph(),
      });
    },
    rowUp(rowId) {
      this.rows = this.rows.flatMap((v,i,arr)=>{
        if((v.rowId === rowId) && arr[i-1]){
          return [v,arr[i-1]]
        }else if(arr[i+1] && arr[i+1].rowId === rowId ){
          return []
        }else{
          return [v]
        }
      })
    },
    rowDown(rowId) {
      
      this.rows = this.rows.flatMap((v,i,arr)=>{
        if((v.rowId === rowId) && arr[i+1]){
          return [arr[i+1],v]
        }else if(arr[i-1] && arr[i-1].rowId === rowId ){
          return []
        }else{
          return [v]
        }
      })
    },
    rowTop(rowId) {
      this.rows = this.rows
        .filter((v) => v.rowId === rowId)
        .concat(this.rows.filter((v) => v.rowId !== rowId));
    },
    rowBottom(rowId) {
      this.rows = this.rows
        .filter((v) => v.rowId !== rowId)
        .concat(this.rows.filter((v) => v.rowId === rowId));
    },
    rowDelete(rowId) {
      this.rows = this.rows.filter((v) => v.rowId !== rowId);
      this.list = this.list.filter((v) => v.rowId !== rowId);
    },
    rowCopy(rowId) {
      const newId = uuid();
      const item = this.rows.find((v) => v.rowId === rowId);
      if (item) {
        const newItem = Object.assign({}, item, { rowId: newId });
        this.rows = this.rows.flatMap((v) =>
          v.rowId === rowId ? [v, newItem] : [v]
        );
        this.list = this.list.concat(
          this.list
            .filter((v) => v.rowId == rowId)
            .map((v) =>
              Object.assign({}, v, {
                rowId: newId,
              })
            )
        );
      }
    },
  },
};
</script>

<style scoped>
.cell-panel {
  /* height: 30px; */
  background: #66ccff;
}

.row-operate {
  /* height: 30px; */
  /* background: #66ffcc; */
}
</style>
