<template>
  <div class='article-skeleton'>
    <div class="item" v-for="i in 5" :key="i" >
        <article>
            <TtxbbSkeleton bg="#e4e4e4" width="200px" height="24px" animated />
            <div class="time">
                <p class="date">
                <TtxbbSkeleton bg="#e4e4e4" width="135px" height="24px" animated />
                </p>
            </div>
            <div class="show">
                <TtxbbSkeleton bg="#e4e4e4" width="50%" height="200px" animated />
                <div class="des">
                <TtxbbSkeleton bg="#e4e4e4" width="100%" height="100px" animated />
                </div>
            </div>
            <div class="r-b">
                <TtxbbSkeleton bg="#e4e4e4" width="100px" height="40px" animated />
            </div>
        </article>
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
 article {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    border-radius: 15px;

    a {
      display: block;
      width: 400px;
      h2 {
        width: 400px;
        margin-bottom: 15px;
      }
    }
    .time {
      position: absolute;
      top: 0;
      right: 5px;
      width: 135px;
    }
    .show {
      display: flex;
      width: 100%;
      height: 200px;
      margin-top: 10px;
      .img {
        box-sizing: border-box;
        width: 50%;
        padding-right: 1%;
      }
      .des {
        box-sizing: border-box;
        width: 50%;
        height: 115px;
        padding-left: 5%;
        padding-top: 10px;
      }
    }
    .r-b {
      position: absolute;
      right: 20px;
      bottom: 40px;
    }
  }
</style>