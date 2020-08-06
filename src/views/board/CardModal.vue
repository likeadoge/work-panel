<template>
  <a-modal v-model="visible" :width="1080" :height="640" title="任务" :footer="null">
    <flex-row class="modal-body">
      <flex-fixed class="modal-panel" style="margin-right:0;width:660px;overflow:auto">
        <a-input type="textarea" class="input-name" :auto-size="{minRows: 1}" v-model="name" style="resize: none"></a-input>
        <div class="input-line">
          <div class="input-item">
            <div class="input-item-title">负责人</div>
            <div class="input-item-content">
              <circle-leader-btn
                :leader="info.leader"
                :user-list="userList"
                @change="n=>updateInfo('leader',n)"
              />
            </div>
          </div>
          <div class="input-item">
            <div class="input-item-title">开始时间</div>
            <div class="input-item-content">
              <circle-time-btn :time="info.beginTime" @change="n=>updateInfo('beginTime',n)" />
            </div>
          </div>
          <div class="input-item">
            <div class="input-item-title">结束时间</div>
            <div class="input-item-content">
              <circle-time-btn :time="info.endTime" @change="n=>updateInfo('endTime',n)" />
            </div>
          </div>
        </div>

        <div class="input-line">
          <div class="input-item">
            <div class="input-item-title">参与人</div>
            <div class="input-item-content">
              <circle-member-btn
                :member="info.member"
                :user-list="userList"
                @change="n=>updateInfo('member',n)"
              />
            </div>
          </div>
        </div>

        <div class="input-line">
          <div class="input-item">
            <div class="input-item-title">实际工时</div>
            <div class="input-item-content">
              <a-avatar class="ava-btn" />
            </div>
          </div>
          <div class="input-item">
            <div class="input-item-title">估算工时</div>
            <div class="input-item-content">
              <a-avatar class="ava-btn" />
            </div>
          </div>
        </div>

        <div class="input-line">
          <div class="input-item">
            <div class="input-item-title">描述</div>
          </div>
        </div>

        <div class="input-line">
          <div class="input-item">
            <div class="input-item-title">附件</div>
          </div>
        </div>
      </flex-fixed>
      <flex-fill class="modal-panel"></flex-fill>
    </flex-row>
  </a-modal>
</template>

<script>
const CircleTimeBtn = {
  props: ["time"],
  template: `
  <div>
  <a-date-picker
    v-model="currentTime"
    show-time
    :style="{minWidth:0}"
    placeholder="开始时间"
    >
    <a-button
        :ghost="true"
        type="primary"
        shape="circle"
        icon="history"
        class="ava-btn"
    />
    </a-date-picker>
    <span v-if="!!time" style="vertical-align: middle;">
        {{ time.format('MM,月,DD,日').split(',').map(v=>Number(v)?Number(v):v).join('') }}
    </span>
  </div>`,
  computed: {
    currentTime: {
      get() {
        return this.time;
      },
      set(n) {
        this.$emit("change", n);
      },
    },
  },
};

const CircleMemberBtn = {
  props: ["userList", "member"],
  template: `  
    <div>

    <a-avatar
        v-for="(v) in member"
        :key="v.uid"
        
        @click="()=>userSelect(v)"

        class="ava-btn"
        :style="{ 
        backgroundColor: 'rgb(19,194,194)', 
        }"
    >{{v.realname[0]}}{{v.realname[1]?v.realname[1]:""}}</a-avatar>

    <a-popover v-model="userVisible" trigger="click">
        <template slot="content">
            <a-input
            placeholder="搜索"
            v-model="keyWord"
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
            :ghost="true"
            type="primary"
            shape="circle"
            icon="user"
            class="ava-btn"
        />
    </a-popover>

    </div>
    `,

  methods: {
    userSelect(v) {
      const selected = this.member.find((s) => s.uid === v.uid) ? true : false;
      if (selected)
        this.$emit(
          "change",
          this.member.filter((s) => s.uid !== v.uid)
        );
      else this.$emit("change", this.member.concat([Object.assign({}, v)]));
    },
  },
  data: () => ({
    keyWord: "",
    userVisible: false,
  }),
  computed: {
    userKeys() {
      return [];
    },
    userSelectList() {
      const keyWord = this.keyWord.toLocaleLowerCase().trim();
      return this.userList
        .filter(({ realname }) =>
          keyWord && realname
            ? realname.toLocaleLowerCase().indexOf(keyWord) >= 0
            : true
        )
        .map((v) =>
          Object.assign({}, v, {
            selected: this.member.find((s) => s.uid === v.uid) ? true : false,
          })
        );
    },
  },
};

const CircleLeaderBtn = {
  props: ["userList", "leader"],
  template: `  
    <div>

    <a-avatar
        v-if="!!leader"
        size="default"
        class="ava-btn"

        @click = "()=>userSelect(null)"

        :style="{ 
            backgroundColor: 'rgb(19,194,194)', 
        }"
    >{{leader.realname[0]}}{{leader.realname[1]?leader.realname[1]:""}}</a-avatar>

    <span v-if="!!leader" style="vertical-align: middle;">
        {{leader.realname}}
    </span>

    <a-popover v-else v-model="userVisible" trigger="click">
        <template slot="content">
            <a-input
            placeholder="搜索"
            v-model="keyWord"
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
            :ghost="true"
            type="primary"
            shape="circle"
            icon="user"
            class="ava-btn"
        />
    </a-popover>

    </div>
    `,

  methods: {
    userSelect(v) {
      this.userVisible = false;
      return this.$emit("change", v);
    },
  },
  data: () => ({
    keyWord: "",
    userVisible: false,
  }),
  computed: {
    userKeys() {
      return [];
    },
    userSelectList() {
      const keyWord = this.keyWord.toLocaleLowerCase().trim();
      return this.userList
        .filter(({ realname }) =>
          keyWord && realname
            ? realname.toLocaleLowerCase().indexOf(keyWord) >= 0
            : true
        )
        .map((v) =>
          Object.assign({}, v, {
            selected: false,
          })
        );
    },
  },
};

export const outer = {
  open: "OPEN",
};

export default {
  components: { CircleTimeBtn, CircleMemberBtn, CircleLeaderBtn },
  props: ["userList"],
  //   computed
  data: () => ({
    name: "项",
    keyWord: "",
    visible: false,
    info: {
      beginTime: null,
      endTime: null,
      leader: null,
      member: [],
    },
  }),
  methods: {
    updateInfo(filed, value) {
      this.info[filed] = value;
    },
    [outer.open](v) {
      console.log(v);
      this.visible = true;
      this.name = "项目需求调研";
    },
  },
  mounted() {},
};
</script>

<style>
.modal-body {
  height: 680px;
  width: 1080px;
  margin: -24px;
  background: rgb(239, 239, 239);
}

.modal-panel {
  margin: 20px;
  background: #fff;
  padding: 36px;
}

.input-name {
  font-size: 20px;
  font-weight: bolder;
  margin: 0 -11px 0 -11px;
  width: calc(100% + 22px);
  max-width: 1200%;
  border-color: transparent;
  margin-top: -8px !important;
}

.input-line {
  margin-top: 20px;
  overflow: hidden;
}

.input-item {
  float: left;
  min-width: 180px;
}

.input-item-title {
  line-height: 28px;
}

.ava-btn {
  margin: 3px;
  float: none;
  vertical-align: middle;
  display: inline-block;
}
</style>