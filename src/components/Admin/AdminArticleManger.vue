<template>
  <div id="AdminArticleManger">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="title" label="标题"> </el-table-column>
      <el-table-column prop="des" label="描述"> </el-table-column>
      <el-table-column prop="pv" label="浏览量"> </el-table-column>
      <el-table-column label="操作" :width="100">
        <template #default="scope">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            @click="handleDelete(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { deleteArticle, getAllArticle } from '@/api/article';
import { ref } from 'vue-demi';
import { ElMessage } from 'element-plus';
export default {
  name: "AdminArticleManger",
  setup() {
    // 文章获取
    let tableData = ref([])
    getAllArticle().then(({data}) => {
      tableData.value = data.data
    })
    // 文章删除
    const handleDelete = (item) => {
      deleteArticle(item._id, item.md).then(({data}) => {
        ElMessage({
          type: 'success',
          message: data.msg,
          showClose: true
        })
      })
    }
    return { tableData, handleDelete }
  }
 
};
</script>

<style lang="less" scoped>
</style>














