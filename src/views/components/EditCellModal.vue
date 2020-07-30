<template>
  <a-modal :visible="visibleCell" title="任务" @cancel="()=> (this.visibleCell = false)" :width="800" :footer="false">
    <a-form-model
      :model="form"
      :rules="rules"
      ref="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
    >
    
    <a-row :gutter="4">
      <a-col :span="16">
        <a-card title="新建任务">
          <a-button type="default" shape="circle">
            <a-icon type="plus"></a-icon>
          </a-button>
          <a-button type="default" shape="circle" style="margin-left: 8px;">
            <a-icon type="user"></a-icon>
          </a-button>
          <a-button type="default" shape="circle" style="margin-left: 8px;">
            <a-icon type="user"></a-icon>
          </a-button>
          <a-button type="default" shape="circle" style="margin-left: 8px;">
            <a-icon type="user"></a-icon>
          </a-button>
          <div style="margin-top: 24px;"/>
          <a-input type="area" :rows="4"></a-input>
        </a-card>
      </a-col>
      <a-col :span="8">
        <feed-back />
      </a-col>
    </a-row>
      
    </a-form-model>
    <template slot="footer">
      <a-button @click="()=> (this.visibleCell = false)">取消</a-button>
      <a-button type="primary" :loading="loading" @click="onSubmit">确定</a-button>
    </template>
  </a-modal>
</template>

<script>
import FeedBack from "./FeedBack"
export default {
  components: {
    FeedBack,
  },
  data: () => ({
    visibleCell: false,
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    form: {
      name: "",
      project: ""
    },
    rules: {
      name: [{ required: true, message: "请输入模板名称", trigger: "change" }]
    }
  }),
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          alert("submit!");
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