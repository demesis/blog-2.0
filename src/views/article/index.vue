<template>
  <div id="article">
    <div v-if="articleList.length">
      <div class="Article"   v-for="(item, index) in articleList" :key="index" >
        <ArticleItem :item="item"  />
      </div>
    </div>
    <ArticleSkeleton v-else />
    <article>
      <TtxbbPagination :total="articleLength" :pagesize="4" :currentPage="Pages" @currentChange="changePage" />
    </article>
  </div>
  


</template>

<script>
import { ref } from 'vue-demi';
import ArticleItem from './components/article-item.vue'
import { getArticle } from '@/api/article'
import { ElMessage } from 'element-plus';
import ArticleSkeleton from './components/article-skeleton.vue'
import TtxbbPagination from '@/components/ttxbb-pagination.vue';
export default {
  name: "Article",
  components: { ArticleItem, ArticleSkeleton, TtxbbPagination },
  setup() {
    // 获取文章信息
    let articleList = ref([])
    let articleLength = ref(0)
    let pages = ref(1)
    const getArt = (pages) => {
      articleList.value = []
      getArticle(pages).then(({data}) => {
      if(data.code){
        return ElMessage({
          type: 'error',
          message: '文章列表查询失败！',
          showClose: true
        })
      }
      articleList.value = data.data.result
      articleLength.value = data.data.length
    })
    }
    getArt(1)
    // 改变页数
    const changePage = (newPage) => {
      pages.value = newPage
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
      getArt(newPage)
    }
    return { articleList, articleLength, changePage, pages }
  }
};
</script>

<style lang="less" scoped>
#article{
  width: 100%;
  .Article {
    flex: 1;
    width: 100%;
  }
  article {
      box-sizing: border-box;
      position: relative;
      width: 100%;
      margin-bottom: 15px;
      box-shadow: 0 0 4px #ddd;
      background-color: #fff;
      font-family: Quicksand;
      border-radius: 15px;
  }
}
</style>