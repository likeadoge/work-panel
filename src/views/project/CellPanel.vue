<template>
  <div class="cell-panel">
    <flex-col style="height:100%">
      <flex-fill>
        <draggable
          v-model="list"
          :element="'div'"
          :ghostClass="'work-card-ghost'"
          :group="{name:'card'}"
          style="padding-bottom:16px;height:100%"
        >
          <div class="panel card" v-for="(v,i) in items" :key="i">{{v.content}}</div>
        </draggable>

      </flex-fill>
      
        <flex-fixed>
          <div style class="add-btn" v-if="!isAddingCard">
            <a-button type="link" icon="plus" @click="changeStatus('add')">添加新的卡片</a-button>
          </div>

          <div v-if="isAddingCard" style="" class="input panel card">
            <a-textarea placeholder="Basic usage" v-model="addCardInfo.content" :rows="4" />
            <div class="detail-btn-cntr">
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
                  class="detail-btn"
                />
              </a-popover>

              <a-range-picker v-model="addCardInfo.time">
                <a-button
                  size="small"
                  :ghost="true"
                  type="primary"
                  shape="circle"
                  icon="history"
                  class="detail-btn"
                />
              </a-range-picker>
              <a-popover v-model="hourVisible" trigger="click">
                <a-form-model slot="content" :model="addCardInfo" style="width:120px">
                  <a-form-model-item label="工时" :label-col="{span :8}" :wrapper-col="{span :16}">
                    <a-input v-model="addCardInfo.hour" />
                  </a-form-model-item>
                </a-form-model>
                <a-button
                  size="small"
                  :ghost="true"
                  type="primary"
                  shape="circle"
                  icon="schedule"
                  class="detail-btn last"
                />
              </a-popover>
            </div>
            <div class="btn-cntr">
              <a-button type="primary" @click="add" style="margin-right:8px;">确定</a-button>
              <a-button type="link" @click="changeStatus('def')">取消</a-button>
            </div>
          </div>
        </flex-fixed>
    </flex-col>
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

<style lang="css" scoped>
.cell-panel {
  background: rgb(242, 243, 243);
  padding: 18px;
}

.card.panel {
  border-radius: 4px;
  background-color: #fff;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.01);
  transition: all 0.3s ease-out;
  padding: 18px;
  margin-bottom: 18px;
}
.card.panel.input {
  padding: 12px;
  overflow:hidden;
  margin-top: -16px;
}

.card.panel.input .detail-btn {
  margin-right: 8px;
}

.card.panel.input .btn-cntr {
  padding: 12px 0 0 0;
}
.card.panel.input .detail-btn-cntr {
  padding: 12px 0 0 0;
  float: right;
  height: 32px;
  line-height: 32px;
}

.card.panel.input .detail-btn.last {
  margin-right: 2px;
}

.add-btn {
  margin-top: -16px;
  margin-left: -16px;
}
</style>