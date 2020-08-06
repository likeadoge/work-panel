<template>
  <a-modal v-model="visible" :width="1080" :height="640" title="任务" :footer="null">
    <flex-row class="modal-body">
      <flex-fixed class="modal-panel" style="margin-right:0;width:660px;overflow:auto">
        <a-input
          type="textarea"
          class="input-name"
          :auto-size="{minRows: 1}"
          v-model="name"
          style="resize: none"
        ></a-input>

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
            <div class="input-item-title">工时</div>
            <div class="input-item-content">
              <circle-hour-btn :hour="info.hour" @change="n=>updateInfo('hour',n)" />
            </div>
          </div>
        </div>
        <div class="input-line">
          <detail-edit-line-content :desc="info.desc" @change="(...args)=>saveDesc(...args)" />
        </div>
        <div class="input-line">
          <div class="input-item">
            <div class="input-item-title">附件</div>
          </div>
        </div>
      </flex-fixed>
      <flex-fill class="modal-panel" style="padding:0">
        <flex-col style="height:100%">
          <flex-fixed
            style="color:rgb(19,194,194);height:48px;line-height:60px;border-bottom:1px solid rgb(233,233,233);padding-left:32px"
          >反馈</flex-fixed>
          <flex-fill style="overflow:auto;padding-top:24px">
            <comment-item v-for="v in comments" :key="v" :msg="v"></comment-item>
          </flex-fill>
          <flex-fixed>
            <comment-input />
          </flex-fixed>
        </flex-col>
      </flex-fill>
    </flex-row>
  </a-modal>
</template>

<script>
import moment from "moment";

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

const CircleHourBtn = {
  props: ["hour"],
  template: `  
    <div>
    <a-popover v-model="userVisible" trigger="click">
      <a-form-model slot="content" style="width:120px">
        <a-form-model-item label="工时" :label-col="{span :8}" :wrapper-col="{span :16}">
          <a-input v-model="workhour" />
        </a-form-model-item>
      </a-form-model>
        <a-button
          :ghost="true"
          type="primary"
          shape="circle"
          icon="schedule"
          class="ava-btn"
        />
    </a-popover>

    {{hour?hour:''}}
    </div>
    `,
  data: () => ({
    userVisible: false,
  }),
  computed: {
    workhour: {
      get() {
        return this.hour;
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

const DetailEditLineContent = {
  props: ["desc"],
  template: `
    <div class="input-item" style="width:100%">
      <div class="input-item-title">
        描述 
        <a-button type="link" size="small" @click="()=>edit()" v-show="status==='display'">
          编辑
        </a-button></div>
      <div class="input-item-content">
        <p class="detail-display" v-show="status==='display'">{{desc}}</p>
        <a-input
          v-show="status==='edit'"
          type="textarea"
          :auto-size="{minRows: 1}"
          v-model="text"
          style="resize: none;width:100%;margin:8px 0"
        ></a-input>
        <div v-show="status==='edit'">
          <async-button type="primary" @click="cb=>cb(save())">保存</async-button>
          <a-button type="link" @click="()=>cancel()">取消</a-button>
        </div>
      </div>  
    </div> 
    `,
  data: () => ({
    status: "display",
    text: "",
  }),
  methods: {
    edit() {
      this.status = "edit";
      this.text = this.desc;
    },
    save() {
      return new Promise((res, rej) => {
        this.$emit("change", this.text, { res, rej });
      }).then(() => (this.status = "display"));
    },
    cancel() {
      this.text = "";
      this.status = "display";
    },
  },
};

const CommentItem = {
  props: ["msg"],
  template: `
    <flex-row class="comment-item">
      <flex-fixed style="margin-right:12px">

        <a-avatar
        class="ava-btn"
        :style="{ 
          backgroundColor: 'rgb(19,194,194)', 
        }">
        {{msg.user.realname[0]}}{{msg.user.realname[1]?msg.user.realname[1]:""}}
        </a-avatar>
      
      </flex-fixed>
      <flex-fill>
      <div style="padding: 4px 0;">
        <b>{{msg.user.realname}}</b> 
        <span style="padding-left:4px;font-size:12px;color:rgb(171,171,171)">{{msg.date.format("MMMDo hh:mm")}}</span>
        <a-button size="small" style="float:right" type="link"  icon="delete"/>
      </div>
      <p>{{msg.content}}</p>
      
      </flex-fill>
    </flex-row>
  `,
};

const CommentInput = {
  template: `
    <div style="padding:16px" @click.stop >
      <div 
        v-show="status=='display'"
        @click="toInputMode" 
        style="background:rgb(239,239,239);height:44px;line-height:44px;border-radius:6px;padding-left:24px">
        评论内容，文字上限 500 字
      </div>     
      <div v-show="status=='input'"> 
        <a-input style="margin-bottom:16px" type="textarea" :rows="4" v-model="text" ref="ta" placeholder="评论内容，文字上限 500 字"/>
        <a-button  type="primary">发送</a-button><a-button type="link">取消</a-button>
      </div>
    </div>
  `,
  data: () => ({
    status: "display", // 'display' | 'input'
    text: "",
  }),
  methods: {
    toInputMode() {
      this.status = "input";
      this.$nextTick().then(()=>{
        this.$refs.ta.focus()
      })
      document.body.onclick = () => {
        this.toDisplayMode();
        document.body.onclick = null;
      };
    },
    toDisplayMode() {
      this.status = "display";
    },
  },
};

export const outer = {
  open: "OPEN",
};

export default {
  components: {
    CircleTimeBtn,
    CircleMemberBtn,
    DetailEditLineContent,
    CommentItem,
    CircleHourBtn,
    CommentInput,
  },
  props: ["userList"],
  //   computed
  data: () => ({
    name: "项",
    keyWord: "",
    visible: false,
    info: {
      beginTime: null,
      endTime: null,
      desc: "dafkfjdakddfk",
      member: [],
      hour: "",
    },
    comments: [
      {
        content: "水边测试一哈",
        date: new moment(),
        user: {
          realname: "周旆宾",
          id: "",
        },
      },
      {
        content: "我也水边测试一哈",
        date: new moment(),
        user: {
          realname: "周旆宾",
          id: "",
        },
      },
      {
        content: "再测试一哈",
        date: new moment(),
        user: {
          realname: "周旆宾",
          id: "",
        },
      },
    ],
  }),
  methods: {
    updateInfo(filed, value) {
      this.info[filed] = value;
    },
    saveDesc(text, { res }) {
      this.updateInfo("desc", text);
      res();
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

.comment-item {
  padding: 0 24px;
}
</style>