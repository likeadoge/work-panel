<template>
  <a-modal
    :visible="visibleProject"
    :title="title"
    @cancel="exit(form)"
    @ok="onSubmit"
    cancelText="取消"
    okText="确定"
    :width="700"
    centered
  >
    <a-form-model
      :model="form"
      :rules="rules"
      ref="form"
      :label-col="labelCol"
      :wrapper-col="wrapperCol"
      >
      <a-form-model-item label="项目名称" ref="name" prop="name">
        <a-input v-model="form.name" placeholder="请填写项目名称" />
      </a-form-model-item>
      <a-form-model-item label="项目模板" ref="templateId" prop="templateId">
        <a-select v-model="form.templateId"  placeholder="请选择项目模板">
          <a-select-option v-for="(v,i) in templatelist" :key="i" :value="v.id" >{{v.name}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="所属部门" >
        <a-select v-model="form.orgId" v-for="(v,i) in depart" :key="i">
          <a-select-option :value="v.id">{{v.departName}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="起止时间">
        <!-- <a-range-picker style="width: 100%;"
      :ranges="{ '今天': [moment(), moment()], '本月': [moment(), moment().endOf('month')] }"
      @change="onChange"
        />-->
        <a-range-picker
          :show-time="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm:ss"
          :placeholder="['开始日期', '结束日期']"
          style="width: 100%;"
          @change="onChange"
        />
      </a-form-model-item>
      <a-form-model-item label="项目描述">
        <a-input v-model="form.describe" type="textarea" />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import moment from "moment";
import * as item from "../../request/item";
export default {
  data: () => ({
    visibleProject: false,
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    depart: [],
    templatelist: [],
    title: '新建项目',
    form: {
      name: "",
      templateId: undefined,
      orgId: "202006231411511XNVRDKRPAC3SF5OP1",
      beginTime: "",
      endTime: "",
      describe: ""
    },
    rules: {
      name: [{ required: true, message: "请输入项目名称", trigger: "change" }],
      templateId: [
        { required: true, message: "请选择项目模板", trigger: "change" }
      ]
    }
  }),
  methods: {
    moment,
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('addProject', this.form)
          this.visibleProject = false
          this.$refs.form.resetFields();
          resetForm(form)
        } else {
          console.log("error submit!!");
          return false;
        }
        this.visibleProject = false
      });
    }, 
    exit(form){
      this.visibleProject = false
      this.$refs.form.resetFields();
      resetForm(form)
      console.log(this.form)
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onChange(date, dateString) {
      // console.log(date, dateString);
      this.form.beginTime = dateString[0];
      this.form.endTime = dateString[1];
      // console.log(this.form.date1)
    },
    onOk(value) {
      console.log("onOk: ", value);
    },
    loadCustomTemplate(){
      item.getTemplateList().then((res) => {
        this.templatelist = res
      })
    },
    edit(id, name, templateId, orgId, beginTime, endTime, describe){
      this.form = {name, templateId, orgId, beginTime, endTime, describe}
      
    },
    loadDepart(){
      item.getDepart().then(res => {
      this.depart = res;
    });
    }
  }
};
</script>
<style scoped>
</style>