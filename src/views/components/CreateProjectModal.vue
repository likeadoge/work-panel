<template>
  <a-modal
    :visible="visibleProject"
    title="新建项目"
    @cancel="()=> (this.visibleProject = false)"
    @ok="onSubmit"
    cancelText="取消"
    okText="确定"
    :width="800"
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
      <a-form-model-item label="项目模板">
        <a-select v-model="form.templateId"  placeholder="请选择项目模板">
          <a-select-option v-for="(v,i) in templatelist" :key="i" :value="v.id" >{{v.name}}</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="所属部门">
        <!-- <a-input v-model="form.orgld" placeholder="达梦数据库" disabled /> -->
        <a-select v-model="form.orgId"  placeholder="请选择所属部门" v-for="(v,i) in depart" :key="i">
          <a-select-option :value="v.id">{{v.departName}}</a-select-option>
          <!-- <a-select-option value="beijing">Zone two</a-select-option> -->
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
    form: {
      name: "",
      templateId: "",
      orgId: "",
      beginTime: "",
      endTime: "",
      describe: ""
    },
    rules: {
      name: [{ required: true, message: "请输入项目名称", trigger: "change" }],
      template: [
        { required: true, message: "请选择项目模板", trigger: "change" }
      ]
    }
  }),
  methods: {
    moment,
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          // console.log("提交");
          // console.log(this.form);
          this.$emit('addProject', this.form)
          this.visibleProject = false
          this.$refs.form.resetFields();
        } else {
          console.log("error submit!!");
          return false;
        }
        this.visibleProject = false
      });
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
      item.getTemplate().then((res) => {
        this.templatelist = res
      })
    }
  },
  mounted() {
    item.getDepart().then(res => {
      // console.log(res);
      this.depart = res;
    });
    this.loadCustomTemplate()
  }
};
</script>
<style scoped>
</style>