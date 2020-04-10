<template>
  <div class='lesson_cell' @click="switchWebView">
    <!--switchWebView 跳转到课程详情-->
    <img :src="img" alt="">
    <div class="cell_text">
      <h4>{{title}}</h4>
      <p>
        <span class="level">{{level}}</span>
        <span class="learn_count">{{count}}人学习</span>
      </p>
    </div>
  </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-12-02 13:51
     * 学习 - 最热课程 - 显示单个课程的cell组件
     */

    export default {
        name: "index",
        props: {
            img: String,  //课程图片
            title: String, //课程标题
            level: String, //课程等级
            count: String, //课程学习人数
            url: String //课程点击的跳转url
        },
        data() {
            return {}
        },
        methods: {
            switchWebView(){
              wx.navigateTo({
                  url:`/pages/webview/main?url=${this.url}`
              })
            }
        }
    }
</script>

<style lang='scss' scoped>
  /*rpx
  规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，
  共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0。1rpx = 0.5px = 1物理像素
  注意 xxrpx 一定要紧贴着写  不然无法识别
  */
  .lesson_cell {
    display: flex;
    flex-direction: row;
    box-sizing: border-box;
    height: 240rpx;
    padding: 20rpx 32rpx;
    background-color: #fff;
    border-bottom: 1px solid #ebeef5;

    img {
      width: 40%;
      height: 200rpx;
      margin-right: 10px;
      border-radius: 5px;
    }

    .cell_text {
      width: 60%;

      h4 {
        margin-top: 10px;
        height: 60px;
        font-weight: bold;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      p {
        font-size: 14px;

        .level {
          color: #eb8831;
          margin-right: 20px;
        }

        .learn_count {
          color: #ccc;
        }
      }
    }
  }

</style>
