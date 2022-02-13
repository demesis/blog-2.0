<template>
  <div id="photo">
    <el-popover placement="bottom-start" :width="288" trigger="hover">
      <template #reference>
        <div
          class="img"
          :style="{
            backgroundImage: `url(${baseURL}${$store.state.user.userInfo.photo})`,
          }"
        ></div>
      </template>
      <div class="btn">
        <el-button type="primary"  @click="toUser"
          >修改资料
        </el-button>
        <el-button type="success"  @click="toAdmin"
          >后台管理
        </el-button>
        <el-button type="danger"  @click="loginOut"
          >退出登录
        </el-button>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { loginout } from '@/api/login';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: "Photo",
  setup() {
    const store = useStore()
    const router = useRouter()
    const loginOut = () => {
      loginout().then(({data}) => {
        ElMessage({
          type: 'success',
          message: data.msg,
          showClose: true
        })
        store.commit('user/updateUser', {})
        router.replace('/')     
      })
    }
    const toUser = () => {
      router.push('/user')
    }
    const toAdmin = () => {
      router.push('/admin')
    }
    return { loginOut, toUser, toAdmin }
  }
};
</script>

<style lang='less' scoped>
.img {
  width: 40px;
  height: 40px;
  background-size: cover;
  background-position: center top;
  border-radius: 50%;
  margin-top: 5px;
  cursor: pointer;
}
</style>