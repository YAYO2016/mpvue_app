<template>
  <div class='mine'>
    <div class="user_info">
      <!--用户信息-->
      <img :src="user.avatarUrl" alt="">
      <div class="user_detail">
        <h4>{{user.nickName}}</h4>
        <span>{{user.gender==1?'男':'女'}}</span>
      </div>
    </div>
    <div class="learn_info">
      <!--课程信息-->
      <div class="learn_detail">
        <h4>课程</h4>
        <span>{{lessonInfo.totalCount}}</span>
      </div>
      <div class="learn_detail">
        <h4>已完成</h4>
        <span>{{lessonInfo.finishCount}}</span>
      </div>
      <div class="learn_detail">
        <h4>直播订阅</h4>
        <span>{{lessonInfo.liveCount}}</span>
      </div>
    </div>
    <div class="order_info">
      <OrderCell
        icon="/static/imgs/lev.jpg"
        title="当前学习等级"
        :text="grade"
      ></OrderCell>
      <OrderCell
        icon="/static/imgs/task.jpg"
        title="今日学习任务"
        :text="finish"
      ></OrderCell>
    </div>
    <div class="order_info">
      <OrderCell
        icon="/static/imgs/us.jpg"
        title="关于我们"
        @click="handleCell"
        :text="finish"
      ></OrderCell>
    </div>
  </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-11-28 23:30
     */
    import {mapState, mapActions} from 'vuex';
    import OrderCell from '@/components/orderCell/index';

    export default {
        name: "index",
        components: {OrderCell},
        data() {
            return {
                grade: '',
                finish: '',
            }
        },
        computed: {
            ...mapState('user', ['user', 'lessonInfo']),
        },
        /**
         * 每次进入页面都执行
         */
        onShow() {
            const learnInfo = wx.getStorageSync('learnInfo');
            this.finish = learnInfo >= 60 ? '完成' : '未完成';
            this.grade = wx.getStorageSync('grade');
        },
        methods: {
            handleCell(){
                wx.navigateTo({
                    url: "../aboutUs/main"
                });
            }
        }
    }
</script>

<style lang='scss' scoped>
  .mine {
    .user_info {
      background-color: #fff;
      padding: 8px 16px;
      box-sizing: border-box;
      border-bottom: 1px solid #ebeef5;
      border-top: 1px solid #ebeef5;
      display: flex;
      flex-direction: row;
    }

    .user_info img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      margin-right: 20px;
    }

    .user_detail h4 {
      margin: 10px 0;
      font-weight: bold;
    }

    .user_detail span {
      color: #aaa;
      font-size: 14px;
    }

    .learn_info {
      padding: 10px 16px;
      box-sizing: border-box;
      display: flex;
      flex-direction: row;
      background-color: #fff;
      border-bottom: 1px solid #ebeef5;
    }

    .learn_info .learn_detail {
      text-align: center;
      flex: 1;
    }

    .learn_detail span {
      color: #aaa;
      font-size: 14px;
    }

    .order_info {
      margin-top: 16px;
    }
  }
</style>
