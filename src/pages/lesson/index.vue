<template>
  <div class='lesson'>
    <!--swiper 小程序轮播组件（轮播图）-->
    <swiper
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :circular="circular"
      indicator-active-color="rgba(255,255,255,0.6)"
    >
      <block v-for="(item,index) in imgUrls" :key="index">
        <swiper-item>
          <img :src="item" class="slide-image" alt="">
        </swiper-item>
      </block>
    </swiper>
    <div class="classify">
      <!--导航组件-->
      <!--scroll-view 小程序的可滚动视图区域  scroll-x横向滚动-->
      <scroll-view class="btns_wrap"
                   scroll-x
                   :scroll-into-view="toChildView"
                   scroll-with-animation
      >
        <span :class="{active:currentIndex === index}"
              class="btn_scroll"
              v-for="(item,index) in allLessons"
              @click="()=>{currentIndex = index;toChildView=allLessons[currentIndex].id}"
              :key="index"
              :id="item.id"
        >{{item.name}}</span>
      </scroll-view>
      <!--内容
      style height 一个课程240rpx高，获取当前下标下的课程个数 * 240
      current 当前所在滑块（block）的index
      -->
      <swiper v-if="allLessons.length"
              :style="{height:allLessons[currentIndex].lessons.length*240+'rpx'}"
              :current="currentIndex"
              @change="e=>{currentIndex = e.mp.detail.current;toChildView=allLessons[currentIndex].id}"
      >
        <block v-for="(item,index) in allLessons" :key="index">
          <swiper-item>
            <div v-for="(lesson,indexChild) in item.lessons" :key="indexChild">
              <LessonCell
                :img="lesson.img"
                :title="lesson.title"
                :level="lesson.level"
                :count="lesson.count"
                :url="lesson.url"
              ></LessonCell>
            </div>
          </swiper-item>
        </block>
      </swiper>
    </div>
  </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-11-28 23:30
     * 课程页面tab
     */
    import LessonCell from '@/components/lessonCell/index.vue'

    export default {
        name: "index",
        components:{LessonCell},
        data() {
            return {
                imgUrls: [], //轮播显示的图片
                allLessons: [],  //所有的课程
                indicatorDots: true, //是否显示面板指示点
                autoplay: true, //是否自动切换
                interval: 2000, //自动切换时间间隔
                duration: 500, //滑动动画时长
                circular: true, //是否采用衔接滑动
                currentIndex: 0, //当前激活查看的课程下标
                toChildView: "", //当前滑动到最前端位置的元素的id
            }
        },
        /**
         * onLoad 小程序生命周期方法：在页面渲染之前执行
         */
        onLoad() {
            this.getData();
        },
        methods: {
            getData() {
                this.$https.request({
                    url: this.$interfaces.getLessons,
                    method: 'get'
                }).then(res => {
                    this.imgUrls = res.imgUrls;
                    this.allLessons = res.allLessons;
                })
            },
        }
    }
</script>

<style lang='scss' scoped>
  .lesson {
    ::-webkit-scrollbar {
      display: none;
    }

    .slide-image {
      width: 100%;
      height: 100%;
    }

    .btns_wrap {
      background-color: #fff;
      white-space: nowrap;
      border-bottom: 1px solid #ebeef5;
    }

    .btn_scroll {
      display: inline-block;
      padding: 0 16px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      box-sizing: border-box;
      text-align: center;
    }

    .active {
      color: #009eef;
    }
  }
</style>
