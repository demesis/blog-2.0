<template>
  <div id="List">
    <div class="main">
      <div class="logo">
        <a href="">TT·XBB</a>
      </div>
      <div class="nav">
        <ul>
          <li><router-link to="/">首 页</router-link></li>
          <li><router-link to="/article">文 章</router-link></li>
          <li><router-link to="/about">关 于</router-link></li>
          <li><router-link to="/message">留 言</router-link></li>
        </ul>
      </div>
      <Photo v-if="$store.state.user.userInfo.user" />
      <div class="login" v-else>
          <el-button type="success"  @click=" isShow = true"
          >登陆 / 注册
        </el-button>
      </div>
      
      <TtxbbLogin v-show="isShow" @close="close" />
    </div>
  </div>
</template>

<script> 
import { ref } from 'vue-demi';
import TtxbbLogin from '@/components/ttxbb-login.vue'
import Photo from '@/components/photo.vue'
export default {
  name: "TtxbbTop",
  components: { TtxbbLogin, Photo },
  setup() {
    const isShow = ref(false)
    // 关闭登录窗口
    const close = () => {
      isShow.value = false
    }
    
    return { isShow, close }
  }
};
</script>

<style lang="less" scoped>
#List {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  height: 50px;
  box-shadow: 0 0 2px #999;
  background-color: #fff;
  border-radius: 15px;
  .main {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    max-width: 1300px;
    margin: auto;
    height: 100%;
    padding: 0 15px;
    .logo {
      width: 130px;
      height: 50px;
      text-align: center;
      a {
        font-family: "Pacifico";
        display: block;
        width: 130px;
        height: 50px;
        letter-spacing: 3px;
        line-height: 50px;
        font-size: 25px;
        color: black;
      }
    }
    .nav {
      ul {
        display: flex;
        height: 50px;
        li {
          height: 50px;
          margin: 2px 0;
          a {
            display: block;
            height: 48px;
            line-height: 48px;
            font-weight: bolder;
            color: #777;
            padding: 0 30px;
            border-radius: 15px;
            &:hover {
              // color: black;
              background-color: #bfe2e67a;
            }
            &.router-link-active {
              color: black;
              background-color: #bfe2e6;
            }
          }
        }
      }
    }
    .login {
      .el-button {
        margin-top: 11px;
        border-radius: 15px;
      }
    }
  }
}
@media screen and (max-width: 640px) {
    #List {
      max-width: 400px;
      .main {
        padding: 0 15px;
        .logo {
          width: 60px;
          height: 50px;
          text-align: center;
          a {
            width: 60px;
            letter-spacing: 1px;
            font-size: 8px;
          }
        }
        .nav {
          ul {
            li {
              height: 50px;
              margin: 2px 0;
              a {
                display: block;
                height: 48px;
                line-height: 48px;
                font-weight: bolder;
                color: #777;
                padding: 0 8px;
                border-bottom: 2px solid;
                border-bottom: 2px solid transparent;
              }
            }
          }
        }
        .login {
          .el-button {
            margin-top: 11px;
          }
        }
      }
    }
  } 
</style>>
