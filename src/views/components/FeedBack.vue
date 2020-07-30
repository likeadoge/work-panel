<template>
  <a-card title="反馈" bordered="false" class="test"> 
    <div style="height: 300px;">

    </div>
    <a-card class="test">
      <div style="background-color: #fff; box-shadow: 2px 2px 5px -2px rgba(0,0,0,.2);">
        <a-input v-show="!visible" @click="handleFeedback" style="border-style: none;" placeholder="提交反馈" id="commit" >
        </a-input>
        <a-input v-show="visible" @click="handleFeedback" style="border-style: none;" placeholder="提交反馈" id="commit" >
        </a-input>
      </div>
    </a-card>    
  </a-card>
</template>

<script>

export default {
  data() {
    return {
      visible: false,
    }
  },
  methods: {
    handleFeedback() {
        // this.visible = true
        console.log("提交反馈")
    }
  },
}

</script>
<style scoped>
.test >>> .ant-card-body {
  padding: 0px;
}
</style>