<template>
  <div class='my_lesson'>
    <div class="lesson_wrap" v-for="(item,index) in lessonInfo" :key="index"
         @click="switchWatchLesson(item)"
    >
      <img :src="item.img" alt="">
      <div class="lesson_info">
        <h4>{{item.title}}</h4>
        <!--小程序自带的进度条组件-->
        <progress :percent="item.progress" border-radius="8" stroke-width="10"></progress>
        <div class="detail">
          <span v-if="item.lock">完成上个课程自动开始</span>
          <span v-else>已完成{{item.progress}}%</span>
          <img v-if="item.lock" src="/static/imgs/lock.jpg" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-12-02 11:34
     * 我的课程页面
     */

    import {mapState, mapActions} from 'vuex';

    export default {
        name: "index",
        data() {
            return {}
        },
        computed: {
            ...mapState('user', ['lessonInfo']),

        },
        methods: {
            switchWatchLesson(item){
                //课程如果被锁定了就无法跳转
                if(item.lock){
                    return;
                }else{
                    wx.navigateTo({
                        url:'/pages/watchlesson/main'
                    })
                }

            }
        }
    }
</script>

<style lang='scss' scoped>
  .my_lesson {
    padding: 10px 16px;
    box-sizing: border-box;
    .lesson_wrap {
      margin-bottom: 16px;
      background-color: #fff;
      display: flex;
      height: 120px;
      border-radius: 5px;
      img {
        height: 100%;
        width: 40%;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      .lesson_info {
        padding: 10px;
        box-sizing: border-box;
        width: 60%;
        h4 {
          height: 50px;
          font-weight: bold;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          margin-bottom: 10px;
        }
        .detail {
          margin-top: 10px;
          font-size: 13px;
          color: #aaa;
          overflow: hidden;
          img {
            width: 16px;
            height: 16px;
            float: right;
          }
        }
      }
    }
  }
</style>
