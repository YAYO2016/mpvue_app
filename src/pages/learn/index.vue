<template>
  <!--scroll-view小程序中可以滑动的组件-->
  <scroll-view class="learn" scroll-y>
    <div class="learn_info">
      <img src="/static/imgs/plan.jpg" alt="">
      <div class="info_text">
        <h4>已学习<span>{{minutes}}</span>分钟</h4>
        <p>今日目标已完成<span>{{percentage}}%</span></p>
      </div>
    </div>
    <div class="my_lesson" v-if="mylessons.length>0">
      <CartHeader :title="'我的課程'" :lessonCount="lessonCount" @click="switchMyLesson"></CartHeader>
      <div class="lesson_wrap">
        <div class="lesson_scroll">
          <div class="lesson_card" v-for="(lesson,index) in mylessons" :key="index">
            <img :src="lesson.img" alt="">
            <span>{{lesson.title}}</span>
          </div>
          <div class="lesson_card" @click="switchMyLesson">
            <img src="/static/imgs/lookall.jpg" alt="">
          </div>
        </div>
      </div>
    </div>
    <div class="start_lesson">
      <button @click="switchToWatchLesson">进入课程</button>
    </div>
    <div class="hot_lesson">
      <CartHeader :title="'今日最热课程'" @click="switchHotLessons"></CartHeader>
      <div v-for="(item,index) in hotLessons" :key="index">
        <LessonCell
          :img="item.img"
          :title="item.title"
          :level="item.level"
          :count="item.count"
          :url="item.url"
        ></LessonCell>
      </div>
    </div>
  </scroll-view>
</template>

<script>
    /**
     * Created by yanyue on 2019-11-28 23:30
     * 学习tab页面
     */
    import {mapState, mapActions} from 'vuex';
    import CartHeader from '@/components/cartHeader/index.vue'
    import LessonCell from '@/components/lessonCell/index.vue'

    export default {
        name: "index",
        components: {CartHeader, LessonCell},
        data() {
            return {
                minutes: 0,
                percentage: 0,
                lessonCount: 0, // 课程个数
                hotLessons: [], //最热课程数据

            }
        },
        onLoad() {
            //接口欧获取最热课程数据
            this.$https.request({
                url: this.$interfaces.getHotLessons,
                method: 'get'
            }).then(res => {
                console.log(res);
                this.hotLessons = res;
            })
        },
        /**
         * onShow 微信小程序方法  每次进入当前页面都会执行一次
         */
        onShow() {
            this.setLearnInfo();
        },
        computed: {
            //获取存储在vuex中的推荐课程
            ...mapState('user', ['lessonInfo']),
            mylessons() {  //将要被显示的部分或者全部的课程
                const lessons = [];
                //获取所有推荐课程
                const mylesson = this.lessonInfo;
                //课程个数
                this.lessonCount = mylesson.length;
                //判断是否大于5，如果大于5就显示前5个，否则就显示所有课程
                const count = mylesson.length > 5 ? 5 : mylesson.length;
                for (let i = 0; i < count; i++) {
                    lessons.push(mylesson[i]);
                }
                return lessons;
            }
        },
        methods: {
            switchMyLesson() {
                wx.navigateTo({
                    url: "/pages/mylesson/main"
                })
            },
            switchToWatchLesson() {
                wx.navigateTo({
                    url: "/pages/watchlesson/main"
                })
            },
            switchHotLessons() {
                //跳转到课程tab页面去
                wx.switchTab({
                    url: "/pages/watchlesson/main"
                })
            },
            setLearnInfo() {
                let vm = this;
                //获取当前日期
                let date = this.$utils.formatTime(new Date()).split(" ")[0];
                wx.getStorage({
                    key: 'date',
                    success(res) {
                        //console.log(res);
                        if (res.data != date) { //之前的日期和现在的日期不一致，说明之前的日期已经过期了
                            vm.storageDate(date);
                        } else {
                            //显示当前数据
                            const learnInfo = wx.getStorageSync("learnInfo");
                            vm.minutes = learnInfo.minutes;
                            vm.percentage = learnInfo.percentage;
                        }
                    },
                    fail() {
                        //如果没有时间date存储(vm,这边因为是在微信的wx方法中，所以不能直接使用this去调用vue实例了)
                        vm.storageDate(date);
                    }
                })
            },
            storageDate(date) {
                let vm = this;
                //存储当前日期，并将数据初始化
                wx.setStorage({
                    key: 'date',
                    data: date
                });

                wx.setStorage({
                    key: 'learnInfo',
                    data: {
                        minutes: 0,
                        percentage: 0
                    }
                });
                this.minutes = 0;
                this.percentage = 0;
            }
        }
    }
</script>

<style lang='scss' scoped>
  .learn {
    height: 100%;
    box-sizing: border-box;

    .learn_info {
      padding: 10px;
      display: flex;
      flex-direction: row;
      background-color: #fff;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #ebeef5;

      img {
        width: 85px;
        height: 85px;
      }
    }
  }

  .info_text {
    padding: 10px;

    h4 {
      font-weight: bold;

      span {
        color: #009eef;
      }
    }

    p {
      color: #ccc;
      font-size: 14px;
      margin-top: 10px;

      span {
        color: #85c646;
      }
    }
  }

  .my_lesson .hot_lesson {
    width: 100%;
    margin-top: 16px;
    background-color: #fff;
    border: 1px solid #ebeef5;
  }

  .lesson_wrap {
    width: 100%;
    overflow-x: auto;
  }

  .lesson_scroll {
    max-width: 200%;
    min-width: 100%;
    display: flex;
    flex-direction: row;
  }

  .lesson_card {
    display: flex;
    flex-direction: column;
    min-width: 120px;
    padding: 10px 5px;

    img {
      width: 100%;
      height: 100px;
      border-radius: 5px;
    }

    span {
      font-size: 14px;
      color: #333;
    }
  }

  ::-webkit-scrollbar {
    display: none;
  }

  .start_lesson {
    padding: 20px 0;
    box-sizing: border-box;
    text-align: center;

    button {
      background-color: #fff;
      color: #009eef;
      width: 150px;
      border-radius: 30px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    }
  }

  .start_lesson button::after {
    border: none;
  }
</style>
