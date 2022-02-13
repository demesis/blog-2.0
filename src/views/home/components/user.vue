<template>
  <div id="User">
    <article>
      <h2>修改用户资料</h2>
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="修改用户名" name="first">
          <el-form
            :model="userForm"
            :rules="rules"
            ref="userFormRef"
            label-width="100px"
          >
            <el-form-item label="原用户名：">
              {{ $store.state.user.userInfo.user }}
            </el-form-item>
            <el-form-item label="新用户名：" prop="user">
              <el-input v-model="userForm.user"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="userNameUpdate(userFormRef)"
                >确认修改</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改密码" name="second">
          <el-form
            :model="passForm"
            :rules="rules"
            ref="passFormRef"
            label-width="100px"
          >
            <el-form-item label="原密码">
              <el-input type="password" v-model="passForm.oldPass"></el-input>
            </el-form-item>
            <el-form-item label="新密码" prop="pass">
              <el-input type="password" v-model="passForm.password"></el-input>
            </el-form-item>
            <el-form-item label="确认新密码" prop="pass2">
              <el-input type="password" v-model="passForm.password2"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="passUpdate(passFormRef)">确认修改</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="修改头像" name="third">
          <el-alert title="点击 + 选择图片自动上传修改" type="warning">
          </el-alert>
          <el-upload
            class="avatar-uploader"
            :action="baseURL + '/user/avatar'"
            :show-file-list="false"
            :with-credentials="true"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <el-icon v-else class="avatar-uploader-icon">+</el-icon>
          </el-upload>
        </el-tab-pane>
      </el-tabs>
    </article>
  </div>
</template>

<script>
import { reactive, ref } from 'vue-demi';
import { updatePass, updateUser } from '@/api/user'
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';

export default {
  name: "User",
  setup() {
      let activeName = ref('first')
      const userForm = reactive({
          user: ""
      })
      const passForm = reactive({
        oldPass: "",
        password: "",
        password2: "",
      })
      const rules = reactive({
        user: [
          {
            validator(rule, value, callback) {
              let reg = /^[^\s]{2,8}$/;

              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("2-8位非空格字符"));
              }
            },
            trigger: "blur",
          },
        ],
        password: [
          {
            validator(rule, value, callback) {
              let reg = /^[\w,.?;<>/|\\:'"!@#$%^&*()+-]{6,16}$/;
              if (reg.test(value)) {
                callback();
              } else {
                callback(new Error("6-16位字符"));
              }
            },
            trigger: "blur",
          },
        ],
        password2: [
          {
            validator: (rule, value, callback) => {
              if (!value) {
                callback(new Error("密码不能为空"));
              } else if (value !== this.passForm.pass) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
      })
      let imageUrl = ref("")
      const store = useStore()
      const router = useRouter()
      // 修改用户名
      const userFormRef = ref('userFormRef')
      const userNameUpdate = (userFormRef) => {
        if(!userFormRef) return 
        userFormRef.validate((vaild) => {
          if(vaild) {
            updateUser(userForm.user).then(({data}) => {
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
              store.commit('user/userUpdate', userForm.user)
              userForm.user = ''
          })
          }else {
            console.log('error submit!')
            return false
          }
        })
      }
      // 修改密码
      const passFormRef = ref('passFromRef')
      const passUpdate = (passFormRef) => {
        if(!passFormRef) return
        passFormRef.validate((vaild) => {
          if(vaild){
            updatePass(passForm.oldPass, passForm.password).then(({data}) => {
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
              store.commit('user/updateUser', {})
              router.replace('/')
            })
          }else{
            console.log('error submit!')
            return false
          }
        })
      }

      //上传成功的回调
      const handleAvatarSuccess = (res, file) => {
        imageUrl = URL.createObjectURL(file.raw);

        if (res.code) {
          return ElMessage({
            type: 'error',
            message: res.msg,
            showClose: true
          })
        }
        ElMessage({
          type: 'success',
          message: '头像修改完成！',
          showClose: true
        })
        //更新vuex数据
        store.commit('user/updateUser', res.data)
      }

      //上传之前的回调
      const beforeAvatarUpload = (file) => {
        let fileType = file.type;
        const isLt2M = file.size / 1024 / 1024 < 2;
        const isJPG = /^image\/(jpeg|png)$/.test(fileType);

        if (!isJPG) {
          ElMessage({
            type: 'error',
            message: "上传头像图片只能是 JPG,PNG 格式!",
            showClose: true
          })
        }
        if (!isLt2M) {
          ElMessage({
            type: 'error',
            message: '上传图片大小不能超过2MB!',
            showClose: true
          })
        }
        return isJPG && isLt2M;
      }

      return { activeName, rules, userForm, passForm, imageUrl, userFormRef, userNameUpdate, passFormRef, passUpdate, handleAvatarSuccess, beforeAvatarUpload }
    },
    created() {
      const store = useStore()
      const router = useRouter()
      if(!store.state.user.userInfo.user){
        router.replace('/')
      }
    },
};

</script>

<style lang="less" scoped>
#User {
  flex: 1;

  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;

    h2 {
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
    }
  }

  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    margin-top: 10px;
  }
  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  /deep/ .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>