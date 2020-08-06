<template>
  <a-modal :visible="visibleBoard" :title="title" @cancel="cancel" :width="700">
    <a-form-model
      :model="form"
      :rules="rules"
      ref="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="看板名称" ref="name" prop="name">
        <a-input v-model="form.name" placeholder="请输入看板名称" />
      </a-form-model-item>
      <!-- <a-form-model-item label="所属项目" ref="project" prop="project">
        <a-select v-model="form.project">
          <a-select-option value="iData项目管理">iData项目管理</a-select-option>
        </a-select>
      </a-form-model-item> -->
    </a-form-model>
    <template slot="footer">
      <a-checkbox @change="onChange" style="float: left;">继续创建看板</a-checkbox>
      <a-button @click="cancel">取消</a-button>
      <a-button type="primary" @click="onSubmit">确定</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  data: () => ({
    visibleBoard: false,
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    id: '',
    projectId: '',
    checked: '',
    title: '新建看板',
    form: {
      name: "",
      project: "iData项目管理"
    },
    rules: {
      name: [{ required: true, message: "请输入看板名称", trigger: "change" }]
    }
  }),
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('childByBoard', this.form)
          this.$emit('editBoardName', {id: this.id, name: this.form.name, projectId: this.projectId})
          if(this.checked){
            this.visibleBoard = true
            this.$refs.form.resetFields();
          }else{
              this.visibleBoard = false
              this.$refs.form.resetFields();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    cancel(){
      this.visibleBoard = false
      // this.checked = false
    },
    onChange(e) {
      // console.log(`checked = ${e.target.checked}`);
      this.checked = `${e.target.checked}`
      // console.log(this.checked)
      // this.onSubmit()
      // this.$refs.form.resetFields();
    },
    edit(id, name, projectId){
      this.form.name = name
      this.id = id
      this.projectId = projectId
      // console.log(id, name, projectId)
    },
    
  }
};
</script>
<style scoped>
</style>