<template>
  <div id="AdminArticleAdd">
    <el-tag>请上传.md文件</el-tag>
    <el-upload
      class="upload-demo"
      ref="uploadRef"
      :action="baseURL + '/admin/upload'"
      :file-list="fileList"
      :on-success="handleMDSuccess"
      :with-credentials="true"
      :auto-upload="false"
    >
      <template #trigger>
        <el-button size="small" type="primary">选取文件</el-button>
      </template>
      <br />
    </el-upload>
    <el-input
      style="margin-top: 20px"
      v-model="title"
      placeholder="请输入文章标题"
    ></el-input>
    <el-input v-model="des" placeholder="请输入文章描述"></el-input>

    <el-button
      style="margin-top: 20px"
      size="small"
      type="success"
      @click="submitUpload"
      >上传到服务器</el-button
    >
  </div>
</template>

<script>
import { ref } from 'vue-demi';
import { ElMessage } from 'element-plus';
import { articleAdd } from '@/api/article';
export default {
  name: "AdminArticleAdd",
  setup() {
    let title = ref('')
    let des = ref('')
    let fileList = ref([])
    // 文件上传
    const uploadRef = ref('uploadRef')
    const submitUpload = () => {
      if(!title.value.trim() || !des.value.trim()){
        return ElMessage({
          type: 'error',
          message: '请输入文章信息！',
          showClose: true
        })
      }
      uploadRef.value.submit()
    }
    // 文章上传成功后添加到服务器
    const handleMDSuccess = (res) => {
      articleAdd(title.value, des.value, res.data.fileName).then(({data}) => {
        ElMessage({
          type: 'success',
          message: data.msg
        })
      })
    }
    return { title, des, fileList, submitUpload, uploadRef, handleMDSuccess }
  }
};
</script>

<style scoped>
</style>














