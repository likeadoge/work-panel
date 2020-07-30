<template>
  <div>
    <div class="panel card">
      <draggable
        v-model="list"
        :element="'div'"
        :ghostClass="'work-card-ghost'"
        :group="{name:'card'}"
        style="padding-bottom:16px"
      >
        <div class="item border-card" v-for="(v,i) in items" :key="i">{{v.content}}</div>
      </draggable>
      <div style="margin-top:-16px" v-if="!isAddingCard">
        <a-button type="link" icon="plus" @click="changeStatus('add')">添加新的卡片</a-button>
      </div>

      <div v-if="isAddingCard" style="overflow:hidden">
        <a-textarea placeholder="Basic usage" v-model="addCardInfo.content" :rows="4" />
        <div style="padding:8px 0 0 0;float:right">
          <a-popover v-model="userVisible" trigger="click">
            <a-menu
              @select="userSelect"
              :v-model="userKeys"
              slot="content"
              style="margin: -12px -16px;width:120px"
            >
              <a-menu-item v-for="(v) in userList" :key="v.uid">{{v.name}}</a-menu-item>
            </a-menu>
            <a-button
              size="small"
              :ghost="true"
              type="primary"
              shape="circle"
              icon="user"
              style="margin-right:12px"
            />
          </a-popover>

          <a-range-picker v-model="addCardInfo.time">
            <a-button
              size="small"
              :ghost="true"
              type="primary"
              shape="circle"
              icon="history"
              style="margin-right:12px"
            />
          </a-range-picker>
          <a-popover v-model="hourVisible" trigger="click">
            <a-form-model  slot="content" :model="addCardInfo" style="width:120px">
              <a-form-model-item label="工时"  :label-col="{span :8}" :wrapper-col="{span :16}">
                <a-input v-model="addCardInfo.hour"  />
              </a-form-model-item>
            </a-form-model>
            <a-button
              size="small"
              :ghost="true"
              type="primary"
              shape="circle"
              icon="schedule"
              style="margin-right:2px"
            />
          </a-popover>
        </div>
        <div style="padding:8px 0 0 0;float:left">
          <a-button type="primary" @click="add" :size="'small'" style="margin-right:8px;">确定</a-button>
          <a-button type="link" :size="'small'" @click="changeStatus('def')">取消</a-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import draggable from "vuedraggable";
import ph from "@/utils/placeholder";
import uuid from "@/utils/uuid";

export default {
  components: { draggable },
  props: ["rowId", "colId", "items"],
  data: () => ({
    isAddingCard: false,
    userVisible: false,
    hourVisible: false,
    userList: [
      { name: "胡彦", uid: uuid() },
      { name: "焦珍瑞", uid: uuid() },
      { name: "蒙云岚", uid: uuid() },
      { name: "毓姝美", uid: uuid() },
      { name: "兆恨蝶", uid: uuid() },
    ],
    addCardInfo: {
      content: ph(),
      time: "",
      hour: 0,
      user: null,
    },
  }),
  computed: {
    list: {
      get() {
        return this.items.map((v) => v).sort((a, b) => a.sort - b.sort);
      },
      set(items) {
        this.$emit("update", {
          rowId: this.rowId,
          colId: this.colId,
          items,
        });
      },
    },
    userKeys: {
      get() {
        return [this.addCardInfo.user?.uid].filter((v) => !!v);
      },
    },
  },
  methods: {
    add() {
      this.$emit("add", {
        info: this.addCardInfo,
        rowId: this.rowId,
        colId: this.colId,
        sort:
          this.list.length === 0 ? 0 : this.list[this.list.length - 1].sort + 1,
      });
      this.isAddingCard = false;
    },
    userSelect({ item }) {
      this.addCardInfo.user = item;
      this.userVisible = false;
    },
    hourInput() {},
    changeStatus(str) {
      if (str === "add") {
        this.isAddingCard = true;
        this.addCardInfo = {
          content: ph(20, 100),
        };
      } else {
        this.isAddingCard = false;
      }
    },
  },
};
</script>
<style scoped>
.card {
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.01);
  transition: all 0.3s ease-out;
  padding: 8px;
}

.border-card {
  border: 1px solid #dee0e3;
  border-radius: 6px;
  padding: 4px 8px;
  cursor: pointer;
  transition: all 0.3s ease-out;
}

.item {
  margin-bottom: 8px;
}

.work-card-ghost {
  opacity: 0.5;
}
</style>