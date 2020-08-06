<template>
  <div style="overflow: hidden;">
    <!-- <a-collapse :bordered="false" defaultActiveKey="1">
      <a-collapse-panel key="1"> -->
        
    <a-collapse :bordered="false" :defaultActiveKey="id">
      <a-collapse-panel :key="id">
        <template slot="header">
          <icon-font
            type="icon-project"
            style="font-size: 18px; color: #45e2e2; margin-right: 10px;"
            />
          <span style="font-size: 18px; color: #333;">{{title}}</span>
        </template>
        <template slot="extra">
          <a-dropdown>
            <a-menu slot="overlay">
              <a-menu-item key="1" @click="saveTemplate(id, title)">保存为模板</a-menu-item>
              <a-menu-item key="2" @click="editProject">编辑</a-menu-item>
              <a-menu-item key="3" @click="handleLib">归档</a-menu-item>
              <a-menu-item key="4" @click="handleDel">删除</a-menu-item>
            </a-menu>
            <a-button type="link" @click.stop="()=>{}">
              <icon-font style="font-size: 18px; color: #333;" type="icon-more" />
            </a-button>
          </a-dropdown>
        </template>
        <!-- <div class="board border-card" v-for="v in boards" :key="v.id" style="padding: 16px 20px; border: #f2f2f2; box-shadow: 0 3px 8px 0 rgba(46,49,72,.1)">{{v.title}}</div>
          <div class="board-add border-card" style="display: flex; justify-content: center; align-items: center;">
            <icon-font type="icon-AddItem" style="font-size: 30px;"/><span style="margin-left: 8px; font-size: 20px;" @click="showBoard">添加看板</span>
          </div>-->
        
        
        <draggable
          v-model="list"
          class="board-cntr"
          :filter="'.board-add'"
          :draggable="'.board'"
          :element="'div'"
          :ghostClass="'board-card-ghost'"
          :group="{name:'board-card'}"
          style="padding-bottom:16px"
         @start="start"
          @end="end"
          >
          
          
          <!-- <div style="display: grid; grid-row-gap: 20px; grid-column-gap: 20px; grid-template-columns: repeat(auto-fill, 268px);"> -->
          <div
            class="board border-card"
            v-for="(v,i) in boardList"
            :key="v.id"
            style="padding: 16px 20px; border: #f2f2f2; box-shadow: 0 3px 8px 0 rgba(46,49,72,.1)"
            @click="openCellPanel(v.id)"            
            >{{i + 1}}.&nbsp;&nbsp;{{v.name}}
            <!-- @mouseleave="mouseleave" @mouseover="mouseover" -->
              <div  style="float: right; margin-top: 55px;">
                <a  @click="editBoard(v.id, v.name)"><icon-font style="font-size: 16px;" type="icon-edit"/></a>
                <a @click="delBoard(v.id)" style="margin-left: 4px;"><icon-font style="font-size: 16px; color: #f84040;" type="icon-delete"/></a>
              </div>
              
            </div>
          <div
            class="board-add border-card"
            style="display: flex; justify-content: center; align-items: center;"
            @click="showBoard"
            >
            <icon-font type="icon-AddItem" style="font-size: 16px;" />
            <span style="margin-left: 8px; font-size: 16px;" >添加看板</span>
          </div>
          <!-- </div>          -->
        </draggable>
      </a-collapse-panel>
    </a-collapse>
    <create-board-modal ref="board" @childByBoard="childByBoard" />
    <create-board-modal ref="editboard" @editBoardName="editBoardName"/>
    <info-delete ref="infodel" :id="id" @exeDel="exeDel" />
    <info-library ref="infolib" :id="id" @exeLib="exeLib" />
    <custom-template-modal ref="template" @exeTemplate="exeTemplate" />
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
    :group="{name:'board-card'}"-->
    <!-- <div class="board border-card" v-for="v in boards" :key="v.id">{{v.title}}</div>
        <div class="board-add border-card">添加新看板</div>
      </draggable>
    </div>-->
    <create-project-modal ref="project" @addProject="addProject"/>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import CreateBoardModal from "../components/CreateBoardModal";
import InfoDelete from "../components/InfoDelete";
import InfoLibrary from "../components/InfoLibrary"
import CustomTemplateModal from "../components/CustomTemplateModal"
import CreateProjectModal from "../components/CreateProjectModal";
import * as item from "../../request/item";

export default {
  components: { draggable, CreateBoardModal, InfoDelete, InfoLibrary, CustomTemplateModal, CreateProjectModal },
  props: ["id", "title", "subTitle", "templateId", "orgId", "beginTime", "endTime", "boards"],
  data() {
    return {
      visibleBoard: false,
      visibleDel: false,
      visibleLib: false,
      visibleTemplate: false,
      boardList: [],
      newBoard: [],
      editshow: false,
    };
  },
  methods: {
    showBoard() {
      this.$refs.board.visibleBoard = true;
    },
    loadBoard() {
      item.getBoard(this.id).then(res => {
        this.boardList = res;
      });
    },
    childByBoard(value) {
      // console.log(value)
      // this.newBoard = value
      const { name, projectId } = { name: value.name, projectId: this.id };
      // console.log(name, projectId)
      item
        .createBoard({ name, projectId })
        .then(() => {
          this.loadBoard();
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleClick(event) {
      event.stopPropagation();
    },
    handleDel(){
      // console.log("项目删除")
      this.$refs.infodel.visibleDel = true            
    },
    exeDel(id){
      // console.log(id)
      item.Deleteproject(id).then(() => {
        this.$message.success("项目成功删除！")
        this.loadBoard()
      }).catch(err => this.$message.info(err))      
    },
    handleLib(){
      console.log("项目归档")
      this.$refs.infolib.visibleLib = true
    },
    exeLib(id){
      item.Libraryproject(id).then(() => {
        // console.log(res.success)
        // if(res.success){
          this.$message.success("项目已归档，请在归档库进行查看！")
          this.$emit('loadProject')
          this.loadBoard()
        // }        
      }).catch(err => this.$message.info(err))   
    },
    saveTemplate(id, title) {
      this.$refs.template.title = "保存为模板"
      this.$refs.template.visibleTemplate = true
      this.$refs.template.edit(id, title)
    },
    exeTemplate(id, name){
      item.saveTemplate(id, name).then(()=>{
        this.$message.success("模板保存成功！")
        this.$emit('loadProject')
      }).catch(() => {this.$message.error("error")})
    },
    editProject(){
      this.$refs.project.visibleProject = true
      this.$refs.project.title = "编辑项目"
      this.$refs.project.edit(this.id, this.title, this.templateId, this.orgId, this.beginTime, this.endTime, this.subTitle)
      this.$refs.project.loadDepart()
      this.$refs.project.loadCustomTemplate()
    },
    addProject(value){
      const { name, templateId, orgId, beginTime, endTime, describe } = value;
      // console.log(value)
      const id = this.id
      // console.log(id)
      item
        .Editproject(
          {id,
          name,
          templateId,
          orgId,
          beginTime,
          endTime,
          describe}
        )
        .then(() => {
          this.$emit('loadProject')
          this.loadBoard()
        })
        .catch(msg => this.message(msg));
    },
    openCellPanel(id){
      // this.$router.push({path:'/board', query: {id: id}})
      this.$router.push({path:`/board/${id}`})
    },
    mouseleave(){
      this.editshow = false
    },
    mouseover(){
      this.editshow = true
    },
    editBoard(id, name){
      console.log("编辑看板")
      event.stopPropagation()
      this.$refs.editboard.edit(id, name, this.id)
      this.$refs.editboard.title = '编辑看板'
      this.$refs.editboard.visibleBoard = true;
    },
    delBoard(id){
      console.log("删除看板")
      event.stopPropagation()
      item.delBoard(id).then(() => {
        this.$message.success("看板已删除")
        this.loadBoard()
      })
    },
    editBoardName(id, name, projectId){
      console.log(id, name, projectId)
      item.editBoard(id, name, projectId).then(() => {
        this.$message.success("保存成功！")
        this.loadBoard();
      }).catch((msg) => {
        this.$message.error(msg)
      })
    },
    start(e){
      console.log(e.oldIndex)
    },
    end(e){
      console.log(e.newIndex)
      console.log(this.list.index)
    },
    
  },
  mounted() {
    this.loadBoard();
  },
  
  computed: {
    list: {
      get() {
        return this.boardList;
      },
      set(arr) {
        this.$emit("sort", arr);
        console.log(this.newIndex)
      }
    }
  }
};
</script>

<style scoped>
.ant-collapse > div {
  background-color: #fcfcfd;
}
.ant-collapse-item {
  border-bottom: none;
}
.ant-collapse-header {
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
.board > div{
  display: none;
}
.board:hover > div{
  display: block;
}
</style>


