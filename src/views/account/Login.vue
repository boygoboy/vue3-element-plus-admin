<template>
  <div id="login">
    <div class="login-box">
      <ul class="login-tab">
        <li
          :class="item.types == currentTab ? 'current' : ''"
          v-for="item in menuTypes"
          :key="item.types"
          @click="switchTab(item.types)"
        >
          {{ item.name }}
        </li>
      </ul>
      <el-form :model="form" :rules="rules" ref="loginForm">
        <el-form-item prop="username">
          <label class="label-name">用户名</label>
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item prop="password">
          <label class="label-name">密码</label>
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item prop="passwords" v-if="currentTab == 'register'">
          <label class="label-name">确认密码</label>
          <el-input v-model="form.passwords" type="password" />
        </el-form-item>
        <el-form-item prop="code">
          <label class="label-name">验证码</label>
          <el-row :gutter="6">
            <el-col :span="18">
              <el-input v-model="form.code" />
            </el-col>
            <el-col :span="2">
              <el-button
                type="primary"
                @click="handleCode"
                :disabled="code_disabled"
                :loading="code_loading"
                >{{ code_text }}</el-button
              >
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="handleRegister"
            :loading="isloading"
            type="primary"
            style="width: 100%"
            v-if="currentTab == 'register'"
            >注册</el-button
          >
          <el-button
            type="primary"
            style="width: 100%"
            v-else
            :loading="isloading"
            @click="handleLogin"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  ref,
  reactive,
  getCurrentInstance,
  onBeforeUnmount,
  toRefs,
  useTransitionState,
} from "vue";
import { useStore } from "vuex";
import {
  check_username,
  check_password,
  validate_code,
  validate_email,
  validate_password,
} from "@/utils/validate.js";
import { getCode, register, login } from "@/api/common.js";
import sha1 from "js-sha1";
export default {
  setup(props) {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    const check_passwords = (rule, value, callback) => {
      if (value !== data.form.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };
    const check_code = (rule, value, callback) => {
      if (!validate_code(value)) {
        callback(new Error("验证码格式不正确"));
      } else {
        callback();
      }
    };
    const data = reactive({
      form: {
        username: "",
        password: "",
        passwords: "",
        code: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { validator: check_username, trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { validator: check_password, trigger: "blur" },
        ],
        passwords: [
          { required: true, message: "请输入确认密码", trigger: "blur" },
          { validator: check_passwords, trigger: "blur" },
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { validator: check_code, trigger: "blur" },
        ],
      },
      currentTab: "register",
      menuTypes: [
        { types: "register", name: "注册" },
        { types: "login", name: "登录" },
      ],
      isloading: false,
      code_text: "获取验证码",
      code_loading: false,
      code_disabled: false,
      code_timer: null,
    });
    const switchTab = (type) => {
      data.currentTab = type;
    };

    const handleCode = () => {
      const username = data.form.username;
      const password = data.form.password;
      const passwords = data.form.passwords;
      if (!username || !validate_email(username)) {
        proxy.$message.warning("邮箱为空或者邮箱格式不正确");
        return false;
      }
      if (!password || !validate_password(password)) {
        proxy.$message.warning("密码为空或者密码格式不正确");
        return false;
      }
      if (data.currentTab == "register") {
        if (!passwords || password != passwords) {
          proxy.$message.warning("确认密码为空或者密码格式不正确");
          return false;
        }
      }

      console.log("获取验证码");
      const formdata = {
        username,
        module: data.currentTab,
      };
      getCode(formdata).then((res) => {
        console.log(res);
        proxy.$message.success(res.message);
        countdown();
      });
    };

    // 处理验证码获取倒计时
    const countdown = (time) => {
      let second = time || 60;
      data.code_loading = true;
      data.code_disabled = true;
      data.code_text = `${second}s后重新获取`;
      if (data.code_timer) {
        clearInterval(data.code_timer);
      }
      data.code_timer = setInterval(() => {
        second--;
        if (second > 0) {
          data.code_text = `${second}s后重新获取`;
        } else {
          clearInterval(data.code_timer);
          data.code_text = `获取验证码`;
          data.code_loading = false;
          data.code_disabled = false;
        }
      }, 1000);
    };

    const handleLogin = () => {
      data.isloading = true;
      proxy.$refs.loginForm.validate((valid) => {
        if (valid) {
          const formdata = {
            username: data.form.username,
            password: sha1(data.form.password),
            code: data.form.code,
          };
          store
            .dispatch("app/loginAction", formdata)
            .then((res) => {
              if (res.resCode == 0) {
                proxy.$message.success(res.message);
                resetForm();
                proxy.$router.push("/home");
              }
            })
            .finally(() => {
              data.isloading = false;
            });
        }
      });
    };

    const handleRegister = () => {
      data.isloading = true;
      proxy.$refs.loginForm.validate((valid) => {
        if (valid) {
          const formdata = {
            username: data.form.username,
            password: sha1(data.form.password),
            code: data.form.code,
          };
          register(formdata)
            .then((res) => {
              if (res.resCode == 0) {
                proxy.$message.success(res.message);
                data.currentTab = "login";
                resetForm();
              }
            })
            .finally(() => {
              data.isloading = false;
            });
        }
      });
    };

    const resetForm = () => {
      data.form.username = "";
      data.form.password = "";
      data.form.passwords = "";
      data.form.code = "";
      data.isloading = false;
      data.code_text = "获取验证码";
      data.code_loading = false;
      data.code_disabled = false;
      if (data.code_timer) {
        clearInterval(data.code_timer);
      }
      proxy.$refs.loginForm.resetFields();
    };

    onBeforeUnmount(() => {
      clearInterval(data.code_timer);
    });

    return {
      ...toRefs(data),
      switchTab,
      handleCode,
      handleLogin,
      handleRegister,
    };
  },
};
</script>

<style lang="scss" scoped>
#login {
  background-color: #344a5f;
  height: 100vh;
  .login-box {
    width: 320px;
    padding-top: 100px;
    margin: auto;
    .login-tab {
      display: flex;
      justify-content: center;
      li {
        width: 76px;
        height: 36px;
        border-radius: 5px;
        line-height: 36px;
        text-align: center;
        font-size: 14px;
        color: #ffffff;
        cursor: pointer;
        &.current {
          background: #2f4255;
        }
      }
    }
    .label-name {
      font-size: 14px;
      color: #ffffff;
    }
  }
}
</style>
