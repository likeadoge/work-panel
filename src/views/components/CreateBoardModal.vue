<template>
  <a-modal :visible="visibleBoard" title="新建看板" @cancel="()=> (this.visibleBoard = false)" :width="800">
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
      <a-button @click="()=> (this.visibleBoard = false)">取消</a-button>
      <a-button type="primary" :loading="loading" @click="onSubmit">确定</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  data: () => ({
    visibleBoard: false,
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
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
          // console.log("新建看板")
          // console.log(this.form)
          this.$emit('childByBoard', this.form)
          this.visibleBoard = false
          this.$refs.form.resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onChange(e) {
      console.log(`checked = ${e.target.checked}`);
    },
  }
};
</script>
<style scoped>
</style>