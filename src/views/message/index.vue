<template>
  <div id="Message">
    <article>
      <h2>留言板</h2>
      <p>文明发言，下面也有些小表情可以使用\(^o^)/~</p>
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        maxlength="100"
        show-word-limit
        v-model="msg"
      >
      </el-input>
      <div class="btn">
        <i class="iconfont icon-biaoqing bq" @click="ifEmojiShow = !ifEmojiShow"></i>
        <el-button type="primary"  @click="handleMessageSubmit"
          >发表</el-button
        >
        <div
          class="emoji"
          :class="{
            show: ifEmojiShow,
          }"
        >
          <ul>
            <li
              v-for="(item, index) in emoji"
              :key="index"
              @click="handleEmojiClick(item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </article>

    <article class="content">
      <ul v-if="msgList.length">
        <li v-for="item in msgList" :key="item._id">
          <!--父留言-->
          <div class="parent">
            <!--留言-->
            <div class="left">
              <!--用户头像-->
              <div
                class="img"
                :style="{
                  backgroundImage: `url(${baseURL}${item.user.photo})`,
                }"
              ></div>
            </div>
            <div class="right">
              <div class="name-time">
                <!--用户名-->
                <span>{{ item.user.user }}</span>
                <!--留言时间-->
                <span>{{ formatDate(item.date) }}</span>
              </div>
              <div class="message">
                <!--留言内容-->
                {{ item.msg }}
              </div>
              <div class="like-reply">
                <i
                  class="like iconfont icon-xinaixin"
                  :class="{
                    isLike:
                      $store.state.user.userInfo._id && item.likes.indexOf($store.state.user.userInfo._id) !== -1,
                  }"
                  @click="handleLikesClick(item)"
                ></i>
                <!--点赞数-->
                <span>{{ item.likes.length }}</span>
                <i
                  class="reply iconfont icon-huifu"
                  @click="handleReplyClick(item, item.user)"
                ></i>
              </div>
            </div>
          </div>
          <!-- 子留言-->
          <div
            class="child"
            v-for="(childItem, index) in item.children"
            :key="index"
          >
            <div class="left">
              <div
                class="img"
                :style="{
                  backgroundImage: `url(${baseURL}${childItem.user.photo})`,
                }"
              ></div>
            </div>
            <div class="right">
              <div class="name-time">
                <span>{{ childItem.user.user }}</span>
                <span>{{ formatDate(childItem.date) }}</span>
              </div>
              <div class="message">
                <span>@{{ childItem.replyUser.user }}</span>
                {{ childItem.msg }}
              </div>
              <div class="like-reply">
                <i
                  class="like iconfont icon-xinaixin"
                  :class="{
                    isLike:
                      $store.state.user.userInfo._id &&
                      childItem.likes.indexOf($store.state.user.userInfo._id) !== -1,
                  }"
                  @click="handleLikesClick(item, childItem)"
                ></i>
                <span>{{ childItem.likes.length }}</span>
                <i
                  class="reply iconfont icon-huifu"
                  @click="handleReplyClick(item, childItem.user)"
                ></i>
              </div>
            </div>
          </div>
          <!--回复框-->
          <div
            class="replyInput"
            :class="{
              show: item.ifShowReply,
            }"
          >
            <el-input
              :placeholder="`@${item.replyUser.user}`"
              v-model="item.reply"
            ></el-input>
            <el-button
              class="replyBtn"
              type="primary"
              @click="handleReplySubmit(item)"
              >回复
            </el-button>
            <div class="clear"></div>
          </div>
        </li>
      </ul>
      <MessageSkeleton v-else   />
      <TtxbbPagination  :total="msgLength" @currentChange="currentChange" :currentPage="pages" :pagesize="8" />
    </article>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue-demi';
import { useStore } from 'vuex';
import { ElMessage } from 'element-plus';
import { getMessage, likeClick, messageSubmit, replySubmit } from '@/api/message'
import MessageSkeleton from './components/message-skeleton.vue'
import TtxbbPagination from '@/components/ttxbb-pagination.vue'

export default {
  name: "Message",
  components: { MessageSkeleton, TtxbbPagination },
  setup() {
    const emoji = ref([
        "😃",
        "😁",
        "😂",
        "😊",
        "🙃",
        "🥰",
        "😘",
        "🤭",
        "🤔",
        "😏",
        "😵",
        "😟",
        "🙁",
        "😳",
        "😰",
        "😭",
        "😖",
        "😶",
        "😷",
        "🤮",
        "🧐",
        "😡",
        "😠",
        "😈",
        "💩",
        "💋",
        "🤡",
        "☠️",
        "👻",
        "🙈",
        "🙉",
        "❤️",
        "💖",
        "💢",
        "💣",
        "💤",
        "👋",
        "💪",
        "👍",
        "👌",
        "🤞",
        "🤟",
        "🤙",
        "👊",
        "🖕",
        "🤝",
        "🙏",
        "🙅",
        "🙅‍♂️",
        "👨‍✈️",
        "👩‍✈️",
        "👷",
        "👷‍♀️",
        "🤦",
        "🤦‍♂️",
        "👴",
        "🧓",
        "🐶",
        "🐽",
        "🐍",
        "🐴",
        "🐮",
        "🐖",
        "🐑",
        "🐓",
        "🦚",
        "🐲",
        "🐳",
        "🐟",
        "🐌",
    ])
    let msg = ref("")
    let ifEmojiShow = ref(false)
    let msgList = ref([])
    // 表情被点击
    const handleEmojiClick = (item) => {
      msg.value += item
    }
    // 留言发表
    const store = useStore()
    const handleMessageSubmit = () => {
      // 验证是否登录
      if(!store.state.user.userInfo.user){
        return ElMessage({
          type: 'error',
          message: '用户未登录！',
          showClose: true
        })
      }
      // 验证留言是否为空
      if(!msg.value.trim()){
        return ElMessage({
          type: 'error',
          message: '留言内容为空！',
          showClose: true
        })
      }
      messageSubmit(msg.value).then(({data}) => {
        // if(data.code){
        //   return ElMessage({
        //     type: 'error',
        //     message: data.msg,
        //     showClose: true
        //   })
        // }
        ElMessage({
          type: 'success',
          message: data.msg,
          showClose: true
        })
        msg.value = ''
        getMsg(pages.value)
      })
    }
    // 获取留言数据
    let msgLength = ref(0)
    let pages = ref(1)
    const getMsg = (newPage) => {
      msgList.value = []
      getMessage(newPage).then(({data}) => {
        // 添加一些新属性
        data.data.result.filter((item) => {
          //用来控制回复框显不显示
          item.ifShowReply = false;
          //用来存储每个留言的回复
          item.reply = "";
          //用来存储回复的是谁
          item.replyUser = {};
        });
        msgList.value = data.data.result
        // 分页数据
        msgLength.value = data.data.length
        pages.value = newPage
      })
    }
    getMsg(1)
    // 更改时间格式
    const formatDate = (val) => {
      let date = new Date(val),
        YY = date.getFullYear(),
        MM = date.getMonth() + 1,
        DD = date.getDate(),
        hh = date.getHours(),
        mm = date.getMinutes(),
        ss = date.getSeconds();

      hh < 10 && (hh = "0" + hh);
      mm < 10 && (mm = "0" + mm); 
      ss < 10 && (ss = "0" + ss);

      return `${YY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
    }
    // 打开回复
    const handleReplyClick = (item, replyUser) => {
      //  未登录时，不让打开
      if (!store.state.user.userInfo.user) {
        return ElMessage({
          type: 'error',
          message: '用户未登录',
          showClose: true
        })
      }

      item.ifShowReply = !item.ifShowReply;
      item.replyUser = replyUser;
    }
    // 回复提交
    const handleReplySubmit = (item) => {
      if(!item.reply.trim()){
        return ElMessage({
          type: 'error',
          message: '请输入回复内容!',
          showClose: true
        })
      }
      replySubmit(item.reply, item._id, item.replyUser._id).then(({data}) => {
        if(data.code){
          return ElMessage({
            typr: 'error',
            message: data.msg,
            showClose: true
          })
        }
        ElMessage({
          type: 'success',
          message: '回复成功!',
          showClose: true
        })
        getMsg(pages.value)  
      })
    }
    // 点赞
    const handleLikesClick = (item, childItem) => {
      likeClick(item, childItem).then(({data}) => {
        if(data.code){
          return ElMessage({
            type: 'error',
            message: data.msg,
            showClose: true
          })
        }
        ElMessage({
          type: 'success',
          message: '点赞成功！',
          showClose: true
        })
        getMsg(pages.value)
      }) 
    }

    // 改变页数
    const currentChange = (newPage) => {
      pages.value = newPage
      document.body.scrollTop = 200;
      document.documentElement.scrollTop = 200;
      getMsg(newPage)
    }


    return { emoji, msg, ifEmojiShow, msgList, handleEmojiClick, handleMessageSubmit, formatDate, handleReplyClick, handleReplySubmit, handleLikesClick, msgLength, currentChange, pages }
  }
};
</script>

<style lang="less" scoped>
#Message {
  flex: 1;

  article {
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 15px;
    box-shadow: 0 0 4px #ddd;
    padding: 25px 20px;
    background-color: #fff;
    font-family: Quicksand;
    border-radius: 15px;

    h2 {
      margin-bottom: 15px;
      font-size: 20px;
      letter-spacing: 3px;
      line-height: 24px;
      border-left: 5px solid #73b899;
      text-indent: 10px;
    }

    p {
      text-indent: 2em;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;

      &.border {
        border-bottom: 1px dotted rgb(170, 170, 170);
      }
    }

    .el-textarea {
      min-height: 80px;
      margin-top: 20px;
    }

    /deep/ textarea {
      min-height: 80px !important;
      font-family: "Quicksand", "Microsoft YaHei", sans-serif;
      color: #444;
      font-size: 14px;
      letter-spacing: 4px;
      line-height: 30px;
    }

    .btn {
      position: relative;
      display: flex;
      margin-top: 10px;
      justify-content: space-between;

      i.bq {
        font-size: 20px;
        cursor: pointer;
      }

      .emoji {
        display: none;
        position: absolute;
        top: 30px;
        left: 0;
        width: 300px;
        height: 210px;
        padding: 10px;
        background-color: #fff;
        box-shadow: 0 0 5px #aaa;
        border-radius: 3px;
        font-size: 18px;

        &.show {
          display: block;
        }

        &::before {
          content: "";
          position: absolute;
          top: -10px;
          left: 5px;
          width: 0;
          height: 0;
          border: 5px solid transparent;
          border-bottom-color: #bbb;
        }

        ul {
          display: flex;
          flex-wrap: wrap;
          width: 100%;
          height: 100%;
          border-top: 1px solid #ddd;
          border-left: 1px solid #ddd;

          li {
            box-sizing: border-box;
            width: 30px;
            height: 30px;
            line-height: 29px;
            text-align: center;
            border-right: 1px solid #ddd;
            border-bottom: 1px solid #ddd;
            cursor: pointer;
          }
        }
      }
    }

    &.content {
      user-select: none;

      ul {
        li {
          padding-bottom: 5px;
          margin-bottom: 10px;
          border-bottom: 1px dashed #ddd;
          font-size: 12px;
          font-family: "Microsoft YaHei", "sans-serif";

          div.parent,
          div.child {
            display: flex;
          }

          div.child {
            margin-left: 55px;
            margin-top: 3px;
          }

          div.left {
            overflow: hidden;
            width: 40px;
            height: 40px;
            margin-right: 15px;
            border-radius: 50%;

            .img {
              width: 40px;
              height: 40px;
              background-size: cover;
              background-position: center top;
            }
          }

          div.right {
            flex: 1;

            div.name-time {
              font-size: 12px;
              margin-bottom: 3px;

              span:nth-child(1) {
                color: #73b899;
              }

              span:nth-child(2) {
                color: #aaa;
                margin-left: 10px;
                font-family: "Microsoft YaHei", "sans-serif";
              }
            }

            div.message {
              color: #666;
              letter-spacing: 2px;
              margin-bottom: 3px;
              word-break: break-word;

              span {
                color: #409eff;
                margin-right: 5px;
              }
            }

            div.like-reply {
              i {
                cursor: pointer;
                font-size: 14px;
                color: #aaa;
              }

              i.isLike {
                color: #f30606;
              }

              span {
                display: inline-block;
                width: 43px;
                font-size: 12px;
                color: #aaa;
              }
            }
          }
        }
      }
    }

    .replyInput {
      box-sizing: border-box;
      overflow: hidden;
      width: 100%;
      height: 0;
      padding-left: 55px;
      transition: height 0.3s;

      &.show {
        height: 57px;
      }

      .replyBtn {
        padding: 4px 9px !important;
        float: right;
      }
    }
  }
}
</style>