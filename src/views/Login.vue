<template>
  <div class="bg">
    <div class="whitebg">
      <div style="display: flex; align-items:center; ">
        <img src="../assets/login_logo/bg-left.png" style="width: 96%; margin-left: 30px;" />
      </div>

      <div
        style="display: flex; flex-direction: column; justify-content: center; height: 450px; margin-left: 70px; margin-right: 80px; width: 400px;"
      >
        <!-- 登录界面 -->
        <a-form-model
          v-if="switchLogin"
          key="login"
          ref="logForm"
          :rules="rules"
          :model="form"
          style="height: 600px;"
        >
          <h3 class="welcomelogo" style="margin-top: 80px;">账号密码登录</h3>

          <a-form-model-item ref="logusername" prop="logusername">
            <a-input class="input-text" v-model="form.logusername" placeholder="请输入用户名" type="text">
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)'}"></a-icon>
            </a-input>
          </a-form-model-item>
          <a-form-model-item ref="logpassword" prop="logpassword">
            <a-input
              class="input-text"
              v-model="form.logpassword"
              autocomplete="false"
              placeholder="请输入密码"
              type="password"
              @keyup.enter="handingClickBtn"
            >
              <a-icon type="lock" slot="prefix" :style="{ color: 'rgba(0,0,0,.25)'}"></a-icon>
            </a-input>
          </a-form-model-item>

          <a-form-model-item ref="checked" prop="checked" style="margin:-10px 0;">
            <a-checkbox v-model="checked">15内自动登录</a-checkbox>
            <a
              style="font-family: SourceHanSansCN-Regular; font-size: 14px; color: #3370ff; float: right;"
            >忘记密码?</a>
          </a-form-model-item>

          <a-form-model-item>
            <async-button
              type="primary"
              ref="loginBtn"
              @click="cb=>cb(handleLogin())"
              class="login-button"
            >登录</async-button>
          </a-form-model-item>

          <div class="message-info">
            还没有账号？
            <a @click="switchReg" style="color: #27c5a5;">立即注册</a>
          </div>
        </a-form-model>

        <!-- 注册界面 -->
        <a-form-model
          v-else
          key="sign"
          ref="regForm"
          :model="regForm"
          :rules="regrules"
          style="height: 600px;"
        >
          <h3 class="welcomelogo" style="margin-top: 90px; margin-bottom: 24px;">账号注册</h3>

          <a-form-model-item has-feedback prop="regusername">
            <a-input
              class="input-text"
              ref="regusername"
              v-model="regForm.regusername"
              placeholder="请输入用户名"
              type="text"
            >
              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)'}"></a-icon>
            </a-input>
          </a-form-model-item>
          <a-form-model-item has-feedback prop="regpassword">
            <a-input
              class="input-text"
              v-model="regForm.regpassword"
              ref="regpassword"
              autocomplete="false"
              placeholder="密码长度在6位-12位之间"
              type="password"
            >
              <a-icon type="lock" slot="prefix" :style="{ color: 'rgba(0,0,0,.25)'}"></a-icon>
            </a-input>
          </a-form-model-item>
          <a-form-model-item has-feedback prop="checkpassword">
            <a-input
              class="input-text"
              v-model="regForm.checkpassword"
              autocomplete="false"
              placeholder="请再次输入密码"
              type="password"
              @keyup.enter="handingClickRegBtn"
            >
              <a-icon type="lock" slot="prefix" :style="{ color: 'rgba(0,0,0,.25)'}"></a-icon>
            </a-input>
          </a-form-model-item>

          <a-form-model-item>
            <async-button
              type="primary"
              ref="regBtn"
              @click="cb=>cb(handleRegister())"
              class="login-button"
            >注册</async-button>
          </a-form-model-item>
          <div class="message-info">
            <a @click="switchLog" style="color:#27c5a5;">返回登录</a>
          </div>
        </a-form-model>
      </div>
    </div>
  </div>
</template>

<script>
// import { client } from "../event/index.ts";
// import TitleBar from "@/components/TitleBar";
// import { mapGetters, mapMutations } from "vuex";

import * as user from "@/request/user";

export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (value.length > 5 && value.length < 12) {
          this.$refs.regForm.validateField("checkpassword");
          callback();
        } else {
          callback(new Error("密码长度必须在6至12位之间"));
        }
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != this.regForm.regpassword) {
        callback(new Error("两次输入的密码不一致，请重新输入"));
      } else {
        callback();
      }
    };

    return {
      switchLogin: true,
      checked: false,
      form: {
        logusername: "",
        logpassword: "",
      },
      rules: {
        logusername: [
          { required: true, message: "请输入用户名", trigger: "change" },
        ],
        logpassword: [
          { required: true, message: "请输入密码", trigger: "change" },
        ],
      },
      regForm: {
        regusername: "",
        regpassword: "",
        checkpassword: "",
      },
      regrules: {
        regusername: [
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请输入用户名"));
              } else {
                if (new RegExp("[\u4e00-\u9fa5]").test(value)) {
                  callback(new Error("用户名不支持中文字符"));
                } else {
                  if (value.length < 5) {
                    callback(new Error("用户名长度不能小于5位"));
                  } else {
                    new RegExp("^[a-zA-Z][a-zA-Z0-9_]{4,15}$").test(value)
                      ? callback()
                      : callback(new Error("用户名仅支持字母数字下划线"));
                  }
                }
              }
            },
            trigger: "change",
          },
        ],
        regpassword: [{ validator: validatePass, trigger: "change" }],
        checkpassword: [{ validator: validatePass2, trigger: "change" }],
      },
    };
  },

  methods: {
    handingClickRegBtn() {
      this.$refs.regBtn.click();
    },
    handleRegister() {
      return (
        this.$refs.regForm
          .validate()
          .then(() => {
            const { regusername, regpassword } = this.regForm;
            return user.testRegister({
              regusername,
              regpassword,
            });
          })
          //延迟2秒
          .then((...arg) => {
            return new Promise((res) =>
              setTimeout(() => {
                res(...arg);
              }, 500)
            );
          })
          .then(() => {
            this.$message.success("注册成功！");
            this.switchLogin = true;
            if (this.$refs.logForm) {
              this.$refs.logForm.resetFields();
            }
            this.$refs.regusername = "";
            this.$refs.regpassword = "";
            this.$refs.checkpassword = "";
            if (this.$refs.regForm) {
              this.$refs.regForm.resetFields();
            }
          })
          .catch((msg) => {
            if (msg === false) console.warn("validate error"); // fasle 为校验错误
          })
      );
    },
    handingClickBtn() {
      this.$refs.loginBtn.click();
    },
    handleLogin() {
      // const checkedBool = this.checked;
      return (
        this.$refs.logForm
          .validate()
          .then(() => {
            const checked = Number(this.checked);
            // const checkedBool = this.checked;
            const { logusername, logpassword } = this.form;
            return user.login({
              username: logusername,
              password: logpassword,
              checked,
            });
          })
          // 延迟 2 秒，测试按钮 loading
          .then((...arg) => {
            return new Promise((res) =>
              setTimeout(() => {
                res(...arg);
              }, 2000)
            );
          })
          .then(({  userInfo }) => {
            console.log(userInfo)
            this.$router.push('/')
            // this.updateUserInfo({
            //   token: token,
            //   username: userInfo.nickname,
            //   avatar: "blank",
            //   org: userInfo.depName,
            // });
            // this.shouldClearToken(!checkedBool);
          })
          .catch((msg) => {
            if (msg === false) console.warn("validate error"); // fasle 为校验错误
            if (msg) this.$message.error(msg); // 字符串为登录错误
          })
      );
    },
    switchReg() {
      this.switchLogin = false;
      this.$refs.logForm.resetFields();
    },
    switchLog() {
      this.$refs.regForm.resetFields();
      this.switchLogin = true;
    },
    // ...mapGetters("userInfo", ["isLogin"]),
    // ...mapMutations("userInfo", ["updateUserInfo", "shouldClearToken"]),
    login() {
      this.updateUserInfo({
        token: "dfasfdsa",
        username: "测试",
        avatar: "blank",
        org: "测试",
      });
    },
  },
};
</script>

<style scoped>
.welcomelogo {
  text-align: center;
  margin-top: 80px;
  margin-bottom: 42px;
  font-size: 22px;
  color: #2f313d;
}
.message-info {
  /* margin-top: 66px; */
  text-align: center;
  font-size: 14px;
  color: #8f959e;
  margin-bottom: 48px;
}
.whitebg {
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  border-radius: 10px;
  width: 800px;
}
.whitebg .opacity {
  opacity: 0.75;
}
.bg {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  /* background: #fff; */
  background: url("../assets/login_logo/login-bg.png") no-repeat;
  background-size: 100% 100%;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
.login-button {
  width: 100%;
}
.input-text {
  width: 280px;
}
</style>