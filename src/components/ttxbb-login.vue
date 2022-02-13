<template>
  <div id="login" @click="close">
    <div class="main" @click.stop>
      <el-tabs v-model="activeName">
        <el-tab-pane label="用户登录" name="login">
          <el-form
            :model="loginForm"  
            label-width="70px"
            >
            <el-form-item label="用户名" prop="user">
              <el-input type="text" v-model="loginForm.user"></el-input>
            </el-form-item>
            <el-form-item label="密码"  prop="password">
              <el-input type="password" v-model="loginForm.password" ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="login"
                >立即登录</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="注册账号" name="zhuce">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            label-width="70px"
            ref="ruleFromRef"
          >
            <el-form-item label="用户名" prop="user">
              <el-input
                type="text"
                v-model="ruleForm.user"
                placeholder="可为中文"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
              <el-input 
                type="password"
                v-model="ruleForm.pass"
               ></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input 
                type="password" 
                v-model="ruleForm.checkPass"
                ></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary"  @click="submitForm(ruleFromRef)"
                >立即注册</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue-demi';
import {  register, toLogin } from '@/api/login'
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';

export default {
  emits: ["close"],
  name: "Login",
  setup(props,{ emit }) {
    const activeName = ref('login')
    // 关闭登录窗口
    const close = () => {
      emit('close')
    }
    // 表单验证规则
    let checkUser = (rule, value, callback) => {
      let reg = /^[^\s]{2,8}$/;
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (reg.test(value)) {
        callback();
      } else {
        callback(new Error("2-8位非空格字符"));
      }
    }
    let validatePass = (rule, value, callback) => {
      let reg = /^[\w,.?;<>/|\\:'"!@#$%^&*()+-]{6,16}$/;
      if (reg.test(value)) {
        callback();
      } else if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback(new Error("6-16位字符"));
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    }
    // 表单数据
    let loginForm = reactive({
        user: "",
        password: "",
      })
    const ruleForm = reactive({
        pass: '',
        checkPass: '',
        user: '',
      })

    const rules = reactive({
        pass: [{ validator: validatePass, trigger: 'blur' }],
        checkPass: [{ validator: validatePass2, trigger: 'blur' }],
        user: [{ validator: checkUser, trigger: 'blur' }],
      })
    
    // 注册
    const ruleFromRef = ref('ruleFromRef')

    const submitForm =  (ruleFromRef) => {
      if (!ruleFromRef) return
       ruleFromRef.validate((valid) => {
         if (valid) {
          register(ruleForm.user, ruleForm.pass).then(({data}) => {
            if(data.code){
              return ElMessage({
                type: 'error',
                message: data.msg,
                showClose: true
              })
            }
            ElMessage({
              type: 'success',
              message: data.msg,
              showClose: true
            })
            activeName.value = 'login'
            // 清空表单
            ruleFromRef.resetFields()
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }

    // 登录
    const loginRef = ref('loginRef')
    const store = useStore()

    const login =  () => {
        toLogin(loginForm.user, loginForm.password).then(({data}) => {
            if(data.code){
              return ElMessage({
                type: 'error',
                message: data.msg,
                showClose: true
              })
            }
            ElMessage({
              type: 'success',
              message: data.msg,
              showClose: true
            })
            close()
            // 保存到vuex
            store.commit('user/updateUser', data.data)  
          })
    }
    


    return { close, activeName, loginForm, ruleForm, rules, ruleFromRef, submitForm, loginRef, login}  
  }
};
</script>

<style scoped lang ='less'>
#login {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);

  .main {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 300px;
    height: 300px;
    padding: 10px 30px;
    transform: translate(-50%, -50%);
    background-color: #fff;
  }
}
.el-button {
  margin-left: 30px;
}
</style>