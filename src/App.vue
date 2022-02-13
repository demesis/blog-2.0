<template>
    <TtxbbTop />
    <div id="main">
      <div class="side">
        <TtxbbSide />
      </div>
      <div class="right">
        <router-view :key="$route.path"></router-view>
      </div>
    </div>
</template>

<script>
import TtxbbTop from '@/components/ttxbb-top.vue'
import TtxbbSide from '@/components/ttxbb-side.vue'
import { checkLogin } from '@/api/login'
import { useStore } from 'vuex'
export default {
  name:'App',
  components: { TtxbbTop, TtxbbSide },
  created() {
    const store = useStore()
    checkLogin().then(({data}) => {
      if (data.code) return;
      store.commit('user/updateUser', data.data) 
    })
  }
}
</script>

<style lang="less" >
@import "./assets/css/reset.css";
@import "./assets/css/font.css";
@import "./assets/css/font/iconfont.css";

::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 5px;
  height: 10px;
}

::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 5px;
  background: #04bbcfd8;
}

::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  // -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  background: #ededed;
}

body {
  user-select: none;
  background: url("./assets/img/bg/bg-left.png") no-repeat left 20px,
    url("./assets/img/bg/bg-right.png") no-repeat right 20px;
  // user-select: none;
  background-color: #f2f2f2;
  background-attachment: fixed;
}

#app {
  width: 100%;
  padding-top: 65px;
}
#main {
  display: flex;
  box-sizing: border-box;
  max-width: 1300px;
  padding: 0 15px;
  margin: 0 auto 0;
  .side {
    width: 270px;
    margin-right: 15px;
  }
  .right {
    flex: 1;
  }
}
@media screen and (max-width: 768px) {
  #main {
    padding: 0 15px;
    .side {
      width: 0px;
      display: none;
      margin-right: 0px;
    }
    .right {
      width: 90%;
    }
  }
}


</style>
