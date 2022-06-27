<template>
  <el-form class="login-form"
           status-icon
           :rules="loginRules"
           ref="loginForm"
           :model="loginForm"
           label-width="0">
    <el-form-item prop="username">
      <el-input @keyup.enter="handleLogin"
                v-model="loginForm.username"
                auto-complete="off"
                :placeholder="$t('login.username')">
        <template #prefix>
          <i class="icon-yonghu"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input @keyup.enter="handleLogin"
                :type="passwordType"
                v-model="loginForm.password"
                auto-complete="off"
                :placeholder="$t('login.password')">
        <template #suffix>
          <i class="el-icon-view el-input__icon"
             @click="showPassword"></i>
        </template>
        <template #prefix>
          <i class="icon-mima"></i>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="code">
      <el-input @keyup.enter="handleLogin"
                :maxlength="code.len"
                v-model="loginForm.code"
                auto-complete="off"
                :placeholder="$t('login.code')">
        <template #prefix>
          <i class="icon-yanzhengma"></i>
        </template>
        <template #append>
          <div class="login-code">
            <span class="login-code-img"
                  @click="refreshCode"
                  v-if="code.type == 'text'">{{code.value}}</span>
            <img :src="code.src"
                 class="login-code-img"
                 @click="refreshCode"
                 v-else />
            <!-- <i class="icon-shuaxin login-code-icon" @click="refreshCode"></i> -->
          </div>
        </template>
      </el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary"
                 @click.prevent="handleLogin"
                 class="login-submit">{{$t('login.submit')}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { randomLenNum } from "utils/util";
import { mapGetters } from "vuex";
export default {
  name: "userlogin",
  data () {
    const validateCode = (rule, value, callback) => {
      if (this.code.value != value) {
        this.loginForm.code = "";
        this.refreshCode();
        callback(new Error("请输入正确的验证码"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        username: "admin",
        password: "123456",
        code: "",
        redomStr: ""
      },
      checked: false,
      code: {
        src: "",
        value: "",
        len: 4,
        type: "text"
      },
      loginRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, message: "密码长度最少为6位", trigger: "blur" }
        ],
        code: [
          { required: true, message: "请输入验证码", trigger: "blur" },
          { min: 4, max: 4, message: "验证码长度为4位", trigger: "blur" },
          { required: true, trigger: "blur", validator: validateCode }
        ]
      },
      passwordType: "password"
    };
  },
  created () {
    this.refreshCode();
  },
  mounted () { },
  computed: {
    ...mapGetters(["tagWel"])
  },
  props: [],
  methods: {
    refreshCode () {
      this.loginForm.redomStr = randomLenNum(this.code.len, true);
      this.code.type == "text"
        ? (this.code.value = randomLenNum(this.code.len))
        : (this.code.src = `/${this.loginForm.redomStr}`);
      this.loginForm.code = this.code.value;
    },
    showPassword () {
      this.passwordType == ""
        ? (this.passwordType = "password")
        : (this.passwordType = "");
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch("LoginByUsername", this.loginForm).then(() => {
            this.$router.push(this.tagWel);
          });
        }
      });
    }
  }
};
</script>

<style>
</style>
