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
      <a-form-model-item label="项目模板" ref="template" prop="template">
        <a-select v-model="form.template" placeholder="请选择项目模板">
          <a-select-option value="空白模板">空白模板</a-select-option>
        </a-select>
      </a-form-model-item>
      <a-form-model-item label="所属部门">
        <!-- <a-input v-model="form.orgld" placeholder="达梦数据库" disabled /> -->
        <a-select v-model="dep" v-for="(v,i) in depart" :key="i" placeholder="请选择所属部门">
          <a-select-option :value="v.departName">{{v.departName}}</a-select-option>
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
        <a-input v-model="form.descript" type="textarea" />
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
    dep: '',
    form: {
      id: "123456",
      name: "",
      template: "",
      orgld: "",
      beginTime: "",
      endTime: "",
      // date1: [],
      descript: ""
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
          console.log("提交");
          // console.log(this.id)
          this.form.orgld = this.dep
          console.log(this.form);
          const {
            id,
            name,
            template,
            orgld,
            beginTime,
            endTime,
            describe
          } = this.form;
          item
            .addProject({id, name, template, orgld, beginTime, endTime, describe })
            .then()
            .catch((msg) => this.message(msg));
        } else {
          console.log("error submit!!");
          return false;
        }
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
    }
  },
  mounted() {
    item.getDepart().then(res => {
      console.log(res);
      this.depart = res;
    });
  }
};
</script>
<style scoped>
</style>