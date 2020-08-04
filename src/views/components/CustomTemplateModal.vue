<template>
  <a-modal :visible="visibleTemplate" title="保存为项目模板" @cancel="()=> (this.visibleTemplate = false)" :width="800" centered>
    <a-form-model
      :model="form"
      :rules="rules"
      ref="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
      <a-form-model-item label="项目模板名称" ref="name" prop="name">
        <a-input v-model="form.name" placeholder="请输入项目模板名称" />
      </a-form-model-item>
      
    </a-form-model>
    <template slot="footer">
      <a-button @click="()=> (this.visibleTemplate = false)">取消</a-button>
      <a-button type="primary" :loading="loading" @click="onSubmit">确定</a-button>
    </template>
  </a-modal>
</template>

<script>
export default {
  data: () => ({
    visibleTemplate: false,
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    form: {
      name: ""
    },
    rules: {
      name: [{ required: true, message: "请输入项目模板名称", trigger: "change" }]
    }
  }),
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {          
          // alert("submit!");
          console.log(this.form.name)
          this.$emit('exeTemplate', this.form.name)
          this.visibleTemplate = false
          this.$refs.form.resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
<style scoped>
</style>