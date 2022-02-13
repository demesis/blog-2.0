<template>
  <div class='home-skeleton'>
    <div class="item" v-for="i in 8" :key="i" >
        <div class="left">
            <TtxbbSkeleton bg="#e4e4e4" width="40px" height="40px" animated />
        </div>
        <div class="right">
            <TtxbbSkeleton bg="#e4e4e4" width="100px" height="7px" animated />
            <TtxbbSkeleton bg="#e4e4e4" width="280px" height="10px" animated />
            <TtxbbSkeleton bg="#e4e4e4" width="150px" height="7px" animated />
        </div>
    </div>
  </div>
</template>

<script>
import TtxbbSkeleton from '@/components/ttxbb-skeleton.vue'
export default {
  name: 'messageSkeleton',
  components: { TtxbbSkeleton }

}
</script>

<style scoped lang='less'>
.home-skeleton {
  .item {
    display: flex;
    justify-content: flex-start;
    .left{
        width: 50px;
        height: 60px;
    }
    .right{
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        .ttxbb-skeleton{
            margin-top: 6px;
        }

    }
    
  }
}
</style>