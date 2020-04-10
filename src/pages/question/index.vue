<template>
  <div class="question">
    <img class="bg" src="/static/imgs/test.jpg" alt>
    <div class="qs_content" v-if="questions.length > 0">
      <div v-if="!startqs">
        <p class="title">温馨提示:</p>
        <div class="warn_tag">为了更好的为您制定学习计划,请首先回答以下问题, 我们会为您量身推荐相关的课程.</div>
      </div>
      <div v-else>
        <p class="title">{{questions[currentIndex].title}}</p>
        <div
          class="response"
          v-for="(item,index) in questions[currentIndex].option"
          :key="index"
          @click="selectAnswer(index)"
        >
          <img v-if="item.select" src="/static/imgs/selected.jpg" alt>
          <img v-else src="/static/imgs/unselect.jpg" alt>
          <span>{{item.label}}</span>
        </div>
      </div>
    </div>
    <button class="qs_btn" :disabled="disabled" @click="btn_click">{{btn_title}}</button>
  </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-11-28 23:24
     * 问题测试页面
     */

    export default {
        name: "index",
        data() {
            return {
                questions: [],
                startqs: false, // 是否显示问题列表
                currentIndex: 0, // 记录当前回答到第几道题
                btn_title: "开始答题", // 按钮的title
                lesson: "" // 记录提交的问题
            };
        },
        //小程序的生命周期（页面渲染之前）
        onLoad() {
            this.getData();
        },
        computed: {
            //按钮disabled
            disabled() {
                if (!this.startqs) {
                    return false;
                } else {
                    //如果有选中的就可以操作，没有选中的就disabled
                    const option = this.questions[this.currentIndex].option;
                    let select = false;
                    option.forEach(item => {
                        if (item.select) {
                            select = true;
                        }
                    });
                    return !select;
                }

            }
        },
        methods: {
            getData() {
                this.$https.request({
                    url: this.$interfaces.getQuestions,
                    method: 'get',
                }).then(res => {
                    this.questions = res.questions;
                })
            },
            btn_click() {
                // 如果没有开始测试(this.startqs为false) 按钮标题默认显示’开始答题’如果已经开始测试
                // 判断是否为最后一题（this.currentIndex == this.questions.length - 1）
                // 如果不是最后一题，按钮标题为’下一题’ 否则显示’完成’
                if (!this.startqs) {
                    this.startqs = true;
                    this.btn_title = '下一题';
                } else {
                    this.lesson += this.getSelectOption(); //获取点击选中的课程
                    if (this.currentIndex < this.questions.length - 1) {
                        this.btn_title = '下一题';
                        this.currentIndex++;
                        //拼接,
                        this.lesson += ',';
                        if (this.currentIndex === this.questions.length - 1) {
                            this.btn_title = "完成";
                        }
                    } else {
                        //完成
                        console.log(this.lesson);
                        this.sendQuestions();
                    }
                }
            },
            selectAnswer(index) {
                const option = this.questions[this.currentIndex].option;
                //将列表中的是否选项都置为未选中(这样实现类似单选的效果)
                option.forEach(item => {
                    item.select = false;
                });
                //将点击的选项选中
                option[index].select = !option[index].select;
            },
            getSelectOption() {
                const option = this.questions[this.currentIndex].option;
                let label = '';
                option.forEach(item => {
                    if (item.select) {
                        label = item.label;
                    }
                });
                return label;
            },
            sendQuestions() {
                //定义默认等级为初级
                wx.setStorage({
                    key: 'grade',
                    data: '初级'
                });
                this.$https.request({
                    url: this.$interfaces.myLesson,
                    method: 'post',
                    data: {
                        //lesson 拼接的问题答案
                        lesson: this.lesson,
                        //openid
                        userId: this.$store.state.user.openid,
                    }
                }).then(res => {
                    console.log(res);
                    //将获取到的推荐课程信息保存到当前用户的vuex中
                    this.$store.dispatch('user/setLessonInfo', res.mylessons);
                    //跳转到学习页面
                    wx.switchTab({
                        url: "/pages/learn/main"
                    });
                })
            }
        }
    }
</script>

<style lang='scss' scoped>
  .question {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    .bg {
      width: 100%;
      height: 100%;
    }

    .qs_content {
      position: absolute;
      width: 80%;
      height: 50%;
      background: #fff;
      top: 36%;
      left: 10%;
      border-radius: 5px;
      box-sizing: border-box;
      padding: 10px;
      color: rgb(13, 28, 51);
    }

    .title {
      font-weight: bold;
      margin-bottom: 20px;
      word-break: break-all;
    }

    .warn_tag {
      padding: 40px 10px;
    }

    .response {
      padding: 10px;

      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
  }

  .qs_btn {
    position: absolute;
    top: 90%;
    left: 10%;
    width: 80%;
    background-color: #009eef;
    color: white;
  }


</style>
