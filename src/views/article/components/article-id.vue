<template>
  <div id="ArticleId">
    <article>
      <v-md-editor v-model="mdValue" mode="preview"  ></v-md-editor>
    </article>
  </div>
</template>

<script>
import { ref } from 'vue-demi';
import { useRoute } from 'vue-router';
import { getMd, getValue } from '@/api/article';
import { ElMessage } from 'element-plus';
export default {
  name: "ArticleId",
  setup() {
    let mdValue = ref(" ")
    const route = useRoute()
    let ifDEV = process.env.NODE_ENV === 'development'
    const baseURL = ifDEV ? 'http://localhost:80' : ''  
    // 获取文章地址
    getMd(route.params.id).then(({data}) => {
        if(data.code){
            return ElMessage({
                type: 'error',
                message: '文章获取失败！'
            })

        }
        // 获取文章内容
        getValue(baseURL + data.data).then((res) => {
            mdValue.value = res.data
        }) 
         
    })
    return { mdValue }
    
  }
};
</script>

<style scoped lang='less'>
article {
  border-radius: 15px;
  user-select: text;
}

// @media screen and(max-width: 640px) {
//   #article-main {
//     width: 320px;
//   }
// }
</style>