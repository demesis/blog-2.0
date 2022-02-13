<template>
  <div class="ttxbb-pagination">
    <a v-if="myCurrentPage <= 1" href="javascript:;" class="disabled">上一页</a>
    <a v-else href="javascript:;" @click="changePage(myCurrentPage-1)">上一页</a>
    <span v-if="pager.start > 1">...</span>
    <a
      @click="changePage(i)"
      href="javascript:;"
      :class="{ active: i === myCurrentPage }"
      v-for="i in pager.btnArr"
      :key="i"
      >{{ i }}</a
    >
    <span v-if="pager.end < pager.pageCount">...</span>
    <a
      v-if="myCurrentPage >= pager.pageCount"
      href="javascript:;"
      class="disabled"
      >下一页</a
    >
    <a v-else href="javascript:;" @click="changePage(myCurrentPage+1)" >下一页</a>
  </div>
</template>
<script>
import { computed, ref, watch } from "vue-demi";
export default {
  name: "XtxPagination",
  props: {
      total:{
          type: Number,
          default: 100
      },
      currentPage:{
          type: Number,
          default: 1
      },
      pagesize: {
        type: Number,
        default: 5
      }
  },
  setup(props,{emit}) {
    // 确定按钮的个数 5
    const count = 3;
    // 确定当前的页码
    const myCurrentPage = ref(1);
    // 总条数，页面大小
    const myTotal = ref(100);
    const myPageSize = ref(0);
    myPageSize.value = props.pagesize

    // 监听传人的值改变
    watch(props, () => {
      myTotal.value = props.total
      myCurrentPage.value = props.currentPage
    }, { immediate: true })

    // 其他数据
    const pager = computed(() => {
      // 总页数
      const pageCount = Math.ceil(myTotal.value / myPageSize.value);
      // 起始按钮，结束按钮，按钮数组
      let start = myCurrentPage.value - Math.floor(count / 2);
      let end = start + count - 1;
      // 如果起始页码小于1了，需要重新计算
      if (start < 1) {
        start = 1;
        end = start + count - 1 > pageCount ? pageCount : start + count - 1;
      }
      // 如果结束页码大于总页数，需要重新计算
      if (end > pageCount) {
        end = pageCount;
        start = end - count + 1 < 1 ? 1 : end - count + 1;
      }
      // 处理完毕start和end得到按钮数组
      const btnArr = [];
      for (let i = start; i <= end; i++) {
        btnArr.push(i);
      }
      return { pageCount, start, end, btnArr };
    });
    // 改变页码
    const changePage = (newPage) => {
      myCurrentPage.value = newPage
      emit('currentChange', newPage)
    }

    return { pager, myCurrentPage, changePage }
  },
};
</script>
<style scoped lang="less">
.ttxbb-pagination {
  display: flex;
  justify-content: center;
  padding: 10px;
  > a {
    font-size: 12px;
    display: inline-block;
    padding: 5px 10px;
    border: 1px solid #e4e4e4;
    border-radius: 4px;
    margin-right: 10px;
    &:hover {
      color: #bfe2e6;
    }
    &.active {
      background: #bfe2e6;
      color: #fff;
      border-color: #bfe2e6;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.4;
      &:hover {
        color: #333;
      }
    }
  }
  > span {
    margin-right: 10px;
  }
}
</style>