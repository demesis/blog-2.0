<template>
    <article>
      <router-link :to="`/article/${item._id}`" >
        <h2>{{ item.title }}</h2>
      </router-link>
      <div class="time">
        <p class="date">
          {{ new Date(item.date).getDate() }}
          <span>/ {{ new Date(item.date).getMonth() + 1 }} </span>
          <span>/ {{ new Date(item.date).getFullYear() }}</span>
        </p>
      </div>
      <div class="show">
        <div
          class="img"
          :style="{
            backgroundImage: `url(${baseURL + item.photo})`,
          }"
        >
        <router-link :to="`/article/${item._id}`" ></router-link>
        </div>
        <div class="des">
          {{ item.des }}
        </div>
      </div>
      <div class="r-b">
        <p>浏览量：{{ item.pv }}</p>
        <router-link :to="`/article/${item._id}`" >阅读全文</router-link>
      </div>
    </article>
</template>

<script>
export default {
    name: 'ArticleItem',
    props: {
        item: {
          type: Object
        },
    }

}
</script>

<style lang="less" scoped>
  article {
    box-sizing: border-box;
    position: relative;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: Quicksand;
    border-radius: 15px;

    &:hover {
      box-shadow: rgb(209, 209, 209) 0px 0px 10px 5px;
      h2{
        color: #73b899;
      }
      .img {
        background-position: center;
      }
    }

    a {
      display: block;
      width: 400px;
      h2 {
        width: 400px;
        margin-bottom: 15px;
        font-size: 20px;
        letter-spacing: 3px;
        line-height: 24px;
        border-left: 5px solid #73b899;
        text-indent: 10px;
      }
    }
    .time {
      position: absolute;
      top: 0;
      right: 5px;
      width: 135px;
      .date {
        font-weight: bolder;
        font-size: 20px;
        text-align: center;
        color: #73b899;
        span {
          font-size: 20px;
        }
      }
    }
    .show {
      display: flex;
      width: 100%;
      height: 200px;
      .img {
        box-sizing: border-box;
        width: 50%;
        padding-right: 1%;
        background-size: cover;
        transition: 0.5s;
        border-radius: 15px;
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .des {
        box-sizing: border-box;
        width: 50%;
        height: 115px;
        padding-left: 5%;
        padding-top: 10px;
        font-size: 16px;
        overflow: hidden;
        white-space: wrap;
        text-overflow: ellipsis;
        user-select: text;
      }
    }
    .r-b {
      position: absolute;
      right: 20px;
      bottom: 40px;
      p {
        position: relative;
        left: 20px;
        top: -10px;
        color: #aaa;
        font-size: 12px;
      }
      a {
        width: 58px;
        padding: 10px 20px;
        background-color: #409eff;
        color: #fff;
        transition: opacity 0.3s;
        border-radius: 15px;
      }
    }
  }
  @media screen and (max-width: 640px) {

    article {
      .show {
        height: 150px;
        .des{
          height: 76px;
        }
      }
    }
  }
</style>