<template>
  <div style="overflow: hidden;">
    <a-collapse :bordered="false">
      <a-collapse-panel>
        <template slot="header">
          <icon-font type="icon-project" style="font-size: 18px; color: #45e2e2; margin-right: 10px;" />
          <span style="font-size: 18px; color: #333;">{{title}}</span>
        </template>
        <draggable
          v-model="list"
          class="board-cntr"
          :filter="'.board-add'"
          :draggable="'.board'"
          :element="'div'"
          :ghostClass="'board-card-ghost'"
          style="padding-bottom:16px"
        >
          <div class="board border-card" v-for="v in boards" :key="v.id" style="padding: 16px 20px; border: #f2f2f2; box-shadow: 0 3px 8px 0 rgba(46,49,72,.1)">{{v.title}}</div>
          <div class="board-add border-card" style="display: flex; justify-content: center; align-items: center;">
            <icon-font type="icon-AddItem" style="font-size: 30px;"/><span style="margin-left: 8px; font-size: 20px;" @click="showBoard">添加看板</span>
          </div>
        </draggable>
      </a-collapse-panel>
    </a-collapse>
    <create-board-modal ref="board" /> 

    <!-- <div class="task-panel">
      <icon-font type="icon-project" style="font-size: 14px; color: #45e2e2;" />
      <h3>{{title}}</h3>
      <p>{{subTitle}}</p>
      <draggable
        v-model="list"
        class="board-cntr"
        :filter="'.board-add'"
        :draggable="'.board'"
        :element="'div'"
        :ghostClass="'board-card-ghost'"
        style="padding-bottom:16px"
      >
        :group="{name:'board-card'}" -->
        <!-- <div class="board border-card" v-for="v in boards" :key="v.id">{{v.title}}</div>
        <div class="board-add border-card">添加新看板</div>
      </draggable>
    </div> --> 
  </div>
</template>

<script>
import draggable from "vuedraggable";
import CreateBoardModal from "../components/CreateBoardModal"

export default {
  components: { draggable, CreateBoardModal, },
  props: ["title", "subTitle", "boards"],
  data() {
    return {
      visibleBoard: false,
    }
  },
  methods: {
    showBoard() {
      this.$refs.board.visibleBoard = true
    },
  },
  computed: {
    list: {
      get() {
        return this.boards;
      },
      set(arr) {
        this.$emit("sort", arr);
      }
    }
  }
};
</script>

<style scoped>
.ant-collapse > div{
  background-color: #fcfcfd;
}
.ant-collapse-item {
  border-bottom: none;
}
.ant-collapse-header{
  margin-bottom: 24px;  
}

.ant-collapse-content-box > div {
  border-bottom-color: #fcfcfd;
  margin-top: 8px;
}
.task-panel {
  margin: 30px;
  margin-bottom: 100px;
}
.board {
  height: 104px;
  background-color: #fcfefd;

}
.board-add {
  height: 104px;
  border-style: dashed !important;
  border-color: #ddd;
}
.board-cntr {
  display: grid;
  gap: 16px 16px;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.board-card-ghost {
  opacity: 0.5;
}
</style>


