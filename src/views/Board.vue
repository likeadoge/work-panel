<template>
  <div class="page-outer">
    <flex-col style="height:100%;positon:relative" class="page-inner">
      <flex-fixed>
        <flex-row style="magin:0;height:67px;line-height:72px;margin-bottom:0">
          <flex-fixed>
            <router-link to="/">
              <a-button type="link" icon="left" :size="'large'" />
            </router-link>
          </flex-fixed>
          <flex-fill>
            <b style="font-size: 1.5em;\">{{title}}</b>
            <span v-if="!!templateName" style="padding-left:12px;vertical-align: 2px;">
              <a-tag color="rgb(11,196,196)">{{templateName}}</a-tag>
            </span>
            <span style="padding-left:2px;vertical-align: 2px;">2020-07-24 至 2020-08-04</span>
          </flex-fill>
        </flex-row>
      </flex-fixed>

      <flex-fill :style="{

      positon:'relative',
      overflow:'auto',
      }">
        <div
          :style="{
      display:'grid',
      gridGap:'20px',
      padding:'5px 20px 20px 20px',
      width:`${(cols.length +1) * 338 + 20}px`,
      gridTemplateColumns:`repeat(${(cols.length +1)},320px)`
    }"
        >
          <template v-for="v in cells">
            <cell-panel
              v-if=" v.type === 'panel'"
              :key="`${v.rowId}-${v.colId}`"
              :rowId="v.rowId"
              :colId="v.colId"
              :items="v.items"
              :userList="allUserList"
              @add="({rowId,colId,sort,info})=>addItem({rowId,colId,sort,info})"
              @update="({rowId,colId,items})=>updateItems({rowId,colId,items})"
              @openDetail="v=>openDetail(v)"
            />

            <row-opreater
              v-if="v.type === 'operate' "
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
          <a-button @click="()=>addRow()">添加泳道</a-button>
        </div>
      </flex-fill>
    </flex-col>

    <card-modal :userList="allUserList" ref="cardModal" />
  </div>
</template>

<script>
import RowOpreater from "./board/RowOpreater";
import CellPanel from "./board/CellPanel";
import * as projectRequest from "@/request/board";
import * as userRequest from "@/request/user";
import uuid from "@/utils/uuid";
import CardModal, { outer as modalOuter } from "./board/CardModal";

export default {
  components: {
    RowOpreater,
    CellPanel,
    CardModal,
  },
  props:['id'],
  data: () => ({
    templateName: "",
    title: "",
    rows: [],
    cols: [],
    cards: [],

    allUserList: [],
  }),
  mounted() {
    this.loadDetail();
    userRequest.getUserList().then((arr) => {
      this.allUserList = arr;
      console.log(this.allUserList);
    });
  },
  computed: {
    cells() {
      return this.rows.flatMap(({ rowId }) =>
        this.cols
          .map(({ colId }) => ({
            rowId,
            colId,
            type: "panel",
            items: this.cards.filter(
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
    cellVersion({ rowId, colId }) {
      const e = this.cards.find((v) => v.rowId === rowId && v.colId === colId);
      return e ? e.version : "";
    },
    addItem({ rowId, colId, sort, info = {} }) {
      console.log(info);
      window.a = info;

      const ncard = {
        rowId,
        colId,
        sort,
        content: info.content,
        hour: info.hour || 0,
        executors: info.user || [],
        time: info.time || null,
      };
      this.cards.push(ncard);
      projectRequest.addCard(this.id, ncard).then(() => this.loadDetail());
    },
    updateItemsList(cells) {
      return projectRequest
        .updateCards(this.id, cells)
        .finally(() => this.loadCells(cells));
    },
    loadCells(cells) {
      return projectRequest
        .getCellsCard(
          this.id,
          cells.map(({ rowId, colId }) => ({ rowId, colId }))
        )
        .then((arr) => {
          arr.forEach(({ rowId, colId, items }) => {
            this.cards = this.cards
              .filter((v) => v.rowId !== rowId || v.colId !== colId)
              .concat(items);
          });
        });
    },
    updateItems({ rowId, colId, items }) {
      if (!this.$updateCache) this.$updateCache = [];
      if (this.$updateTimeout) clearTimeout(this.$updateTimeout);
      this.$updateCache.push({
        rowId,
        colId,
        version: this.cellVersion({ rowId, colId }),
        items: items.map((v, i) => Object.assign({}, v, { sort: i })),
      });

      this.$updateTimeout = setTimeout(() => {
        console.log(this.$updateCache);
        this.updateItemsList(this.$updateCache);
        this.$updateCache = [];
        this.$updateTimeout = null;
      }, 50);

      this.cards = this.cards
        .filter((v) => v.rowId !== rowId || v.colId !== colId)
        .concat(
          items.map((v, sort) => Object.assign({}, v, { colId, rowId, sort }))
        );
    },
    loadDetail() {
      return projectRequest
        .getBoradDetail(this.id)
        .then(({ title, cols, rows, cards, templateName }) => {
          this.title = title;
          this.cols = cols;
          this.rows = rows;
          this.cards = cards;
          this.templateName = templateName;
        })
        .then(() => {});
    },
    addRow() {
      projectRequest.addBoardRow(this.id).then(() => this.loadDetail());
    },
    addCol() {
      this.cols.push({ colId: uuid() });
    },
    rowUp(rowId) {
      const rows = this.rows.flatMap((v, i, arr) => {
        if (v.rowId === rowId && arr[i - 1]) {
          return [v, arr[i - 1]];
        } else if (arr[i + 1] && arr[i + 1].rowId === rowId) {
          return [];
        } else {
          return [v];
        }
      });

      projectRequest.sortBoardRows(rows).then(() => this.loadDetail());
    },
    rowDown(rowId) {
      const rows = this.rows.flatMap((v, i, arr) => {
        if (v.rowId === rowId && arr[i + 1]) {
          return [arr[i + 1], v];
        } else if (arr[i - 1] && arr[i - 1].rowId === rowId) {
          return [];
        } else {
          return [v];
        }
      });
      projectRequest.sortBoardRows(rows).then(() => this.loadDetail());
    },
    rowTop(rowId) {
      const rows = this.rows
        .filter((v) => v.rowId === rowId)
        .concat(this.rows.filter((v) => v.rowId !== rowId));

      projectRequest.sortBoardRows(rows).then(() => this.loadDetail());
    },
    rowBottom(rowId) {
      const rows = this.rows
        .filter((v) => v.rowId !== rowId)
        .concat(this.rows.filter((v) => v.rowId === rowId));

      projectRequest.sortBoardRows(rows).then(() => this.loadDetail());
    },
    rowDelete(rowId) {
      projectRequest.deleteBoardRow(rowId).then(() => this.loadDetail());
    },
    rowCopy() {
      this.loadDetail();
      // rowId
      // const newId = uuid();
      // const item = this.rows.find((v) => v.rowId === rowId);
      // if (item) {
      //   const newItem = Object.assign({}, item, { rowId: newId });
      //   this.rows = this.rows.flatMap((v) =>
      //     v.rowId === rowId ? [v, newItem] : [v]
      //   );
      //   this.cards = this.cards.concat(
      //     this.cards
      //       .filter((v) => v.rowId == rowId)
      //       .map((v) =>
      //         Object.assign({}, v, {
      //           rowId: newId,
      //         })
      //       )
      //   );
      // }
    },

    openDetail(v) {
      this.$refs.cardModal[modalOuter.open](v);
    },
  },
};

</script>

<style lang="css" scoped>
.page-outer {
  height: 100%;
  width: 100%;
  padding: 32px 48px 32px 48px;
}

.page-inner {
  height: 100%;
  width: 100%;
  background: #fff;
  overflow: auto;
}
</style>
