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
          <div class="panel card" v-for="v in list" :key="v.cardId">{{v.content}}</div>
        </draggable>
      </flex-fill>

      <flex-fixed>
        <div style class="add-btn" v-if="!isAddingCard">
          <a-button type="link" icon="plus" @click="changeStatus('add')">添加新的卡片</a-button>
          <!-- <a-button type="link" icon="plus" @click="log">console.log</a-button> -->
        </div>

        <div v-if="isAddingCard" style class="input panel card">
          <a-textarea placeholder="Basic usage" v-model="addCardInfo.content" :rows="4" />

          <div style="margin-top:12px">
            <a-avatar
              v-for="(v) in addCardInfo.user"
              :key="v.uid"
              size="small"
              :style="{ 
                backgroundColor: 'rgb(19,194,194)', 
                verticalAlign: '-7px', 
                marginRight:'6px',
              }"
            >{{v.realname[0]}}</a-avatar>
            
            <a-avatar
              v-if="addCardInfo.hour"
              size="small"
              :style="{ 
                backgroundColor: 'rgb(56,194,238)', 
                verticalAlign: '-7px', 
                marginRight:'6px',
              }"
            >{{addCardInfo.hour}}</a-avatar>

            <div v-if="addCardInfo.time" class="date-tag_add">{{
              addCardInfo.time.format('MM,月,DD,日').split(',').map(v=>Number(v)?Number(v):v).join('')    
            }}</div>
          </div>
          <div class="detail-btn-cntr">
            <!-- 执行人按钮 -->

            <a-popover v-model="userVisible" trigger="click">
              <template slot="content">
                <a-input
                  placeholder="搜索"
                  v-model="userSearch"
                  style="display:inline-block;width:168px;margin:0 0 12px 0 "
                />
                <a-menu
                  :v-model="userKeys"
                  style="margin: 0 -16px;width:200px;height:120px;overflow:auto"
                >
                  <a-menu-item v-for="(v) in userSelectList" @click="userSelect(v)" :key="v.uid">
                    <a-avatar
                      size="small"
                      style="position:relative"
                      :style="{ 
                    backgroundColor: 'rgb(19,194,194)', 
                    verticalAlign: '-7px', 
                    marginRight:'4px',
                  }"
                    >{{v.realname[0]}}</a-avatar>
                    {{v.realname}}
                    <icon-font
                      type="check"
                      v-show="v.selected"
                      style="float:right;margin: 12px 10px;"
                    />
                  </a-menu-item>
                </a-menu>
              </template>

              <a-button
                size="small"
                :ghost="true"
                type="primary"
                shape="circle"
                icon="user"
                class="detail-btn"
              />
            </a-popover>

            <!-- 截至时间按钮 -->
            <a-date-picker
              v-model="addCardInfo.time"
              show-time
              :style="{minWidth:0}"
              placeholder="截至日期"
            >
              <a-button
                size="small"
                :ghost="true"
                type="primary"
                shape="circle"
                icon="history"
                class="detail-btn"
              />
            </a-date-picker>

            <!-- 工时按钮 -->
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

    userSearch: "",
    userList: [
      { realname: "胡彦", uid: uuid() },
      { realname: "焦珍瑞", uid: uuid() },
      { realname: "蒙云岚", uid: uuid() },
      { realname: "毓姝美", uid: uuid() },
      { realname: "兆恨蝶", uid: uuid() },
    ],
    addCardInfo: {
      content: ph(),
      time: "",
      hour: 0,
      user: [],
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
    userKeys() {
      return [];
    },
    userSelectList() {
      const keyWord = this.userSearch.toLocaleLowerCase().trim();
      return this.userList
        .filter(({ realname }) =>
          keyWord ? realname.toLocaleLowerCase().indexOf(keyWord) >= 0 : true
        )
        .map((v) =>
          Object.assign({}, v, {
            selected: this.addCardInfo.user.find((s) => s.uid === v.uid)
              ? true
              : false,
          })
        );
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
    log() {
      console.log(this.list);
    },
    userSelect(v) {
      const selected = this.addCardInfo.user.find((s) => s.uid === v.uid)
        ? true
        : false;
      if (selected)
        this.addCardInfo.user = this.addCardInfo.user.filter(
          (s) => s.uid !== v.uid
        );
      else
        this.addCardInfo.user = this.addCardInfo.user.concat([
          Object.assign({}, v),
        ]);
    },
    hourInput() {},
    changeStatus(str) {
      if (str === "add") {
        this.isAddingCard = true;
        this.userSearch = "";
        this.addCardInfo = {
          content: ph(20, 100),
          time: "",
          hour: 0,
          user: [],
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
  overflow: hidden;
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

.date-tag_add {
  display: inline-block;
  background: rgb(235, 235, 235);
  font-size: 12px;
  line-height: 24px;
  padding: 0 8px;
  border-radius: 12px;
}
</style>