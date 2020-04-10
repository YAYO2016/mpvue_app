<template>
  <div class='lesson_detail'>
    <div class="lesson_header">
      <!--小程序中的video组件  poster视频封面
      bindended播放到末尾的时候触发事件
      bindtimeupdate 播放进度变化的时候触发-->
      <video
        :src="videoUrl"
        autoplay="true"
        controls
        :poster="lessonDetail.img"
        @ended="playend"
        @timeupdate="timeupdate"
      ></video>
    </div>
    <div class="lesson_content">
      <div class="catalogue_wrap"
           v-for="(item,index) in lessonDetail.catalogue"
           :key="index"
           @click="handleLesson(item,index)"
      >
        <span v-if="currentIndex===index" class="active_icon"></span>
        <h4>{{item.name}}</h4>
        <img v-if="item.lock" src="/static/imgs/lock.jpg" alt="">
        <img v-else src="/static/imgs/icon_r.jpg" alt="">
      </div>
    </div>

  </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-12-02 11:45
     * 观看视频页面
     */

    export default {
        name: "index",
        data() {
            return {
                lessonDetail: {},
                videoUrl: '', //当前播放视频的url地址
                currentIndex: 0, //当前正在播放的视频的下标
                duration: 0, //当前已经观看的时长

            }
        },
        onLoad() {
            this.getData();
        },
        methods: {
            getData() {
                this.currentIndex = 0;
                this.$https.request({
                    url: this.$interfaces.getCatalogue,
                    method: 'get'
                }).then(res => {
                    console.log(res);
                    this.lessonDetail = res;
                    this.videoUrl = this.lessonDetail.catalogue[0].url;

                    //设置标题（代码中可以动态的进行设置）
                    wx.setNavigationBarTitle({
                        title: res.title
                    })
                    //存储等级
                    wx.setStorage({
                        key:'grade',
                        data:res.level
                    })
                })
            },

            /**
             *  如果当前播放的视频不是最后一个视频，那么就跳转到下一个，
             * 下一个视频解锁，并且重置url
             */
            playend() {
                let catalogue = this.lessonDetail.catalogue;
                if (this.currentIndex < catalogue.length - 1) {
                    this.currentIndex++;
                    this.catalogue[currentIndex].lock = false;
                    this.videoUrl = catalogue[currentIndex].url;
                }
                //视频播放结束之后，更新数据
                this.setLearnTime();
            },
            /**
             *直接点击摸一个视频，然后根据时候被锁定进行播放
             */
            handleLesson(item, index) {
                if (!item.lock) { //没有被锁定
                    this.currentIndex = index;
                    this.videoUrl = item.url;
                }
            },
            /**
             * 获取 视频学习时长 分钟
             */
            timeupdate(event) {
                this.duration = Math.floor(event.mp.detail.duration / 60);
            },
            /**
             * 视频播放结束之后 更新数据
             */
            setLearnTime() {
                //计算今天学习的总的时长 = 当前学习视频的时长 + 之前学习的时长
                const time = this.duration + Number(wx.getStorageSync('learnInfo').minutes);
                wx.setStorage({
                    key: 'learnInfo',
                    data: {
                        minutes: time,
                        percentage: Math.floor(time / 60 * 100) + '%'
                    }
                })

            }


        }
    }
</script>

<style lang='scss' scoped>
  .lesson_detail {
    .lesson_header {
      position: relative;
      width: 100%;
      height: 200px;
      box-sizing: border-box;

      video {
        width: 100%;
        height: 100%;
      }
    }

    .lesson_content {
      background-color: #fff;
      padding: 16px;
      box-sizing: border-box;
    }

    .catalogue_wrap {
      margin-bottom: 16px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      border: 1px solid #ebeef5;
      padding: 16px;
      border-radius: 5px;
      height: 60px;
      display: flex;
      align-items: center;
      position: relative;

      .active_icon {
        position: absolute;
        width: 3px;
        height: 80%;
        background-color: #009eef;
        left: 0;
        top: 10%;
      }

      h4 {
        width: 95%;
        font-size: 15px;
        font-weight: bold;
      }

      img {
        width: 20px;
        height: 20px;
      }
    }


  }

  .level {
    margin-right: 10px;
  }

</style>
