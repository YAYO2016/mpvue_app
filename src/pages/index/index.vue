<template>
  <div class="container">
    <div class="login">
      <img src="/static/imgs/guide_bg.jpg" alt="">
      <div class="learn">
        <!--获取用户信息-->
        <button open-type="getUserInfo" @getuserinfo="getUserInfo">开始学习</button>
      </div>
    </div>
  </div>
</template>


<script>


    export default {
        data() {
            return {}
        },


        components: {},


        methods: {
            getUserInfo(e) {
                //判断授权时候成功
                if (e.mp.detail.userInfo) {
                    //console.log(e.mp.detail.userInfo);
                    //存储到vuex中
                    this.$store.dispatch('user/setAuthenticated', true)
                    this.$store.dispatch('user/setUser', e.mp.detail.userInfo)
                    //获取code
                    this.getCode();
                }
            },
            getCode() {
                //在mpvue中，提供了一个全局小程序对象wx
                wx.login({
                    success: res => {
                        console.log(res);
                        //获取openid
                        this.getOpenId(res.code)
                    }
                })
            },
            getOpenId(code) {
                //3个参数 appid secret code
                const appid = 'wxbcbcc6c7639c7c9b';
                const secret = 'd9992689ffa80f4d05fb8aacc6ecf456';

                this.$https.request({
                    url: `${this.$interfaces.getOpenId}/${appid}/${secret}/${code}`,
                    method: 'get'
                }).then(res => {
                    console.log(res);
                    //将openid存储到vuex中
                    this.$store.dispatch('user/setOpenid', res.openid)
                    //请求课程
                    this.isLearned(res.openid);
                }).catch(err => {
                    console.log(err);
                })

            },
            /**
             * 调用接口判断当前用户是否做过问题测试
             * @param openid
             */
            isLearned(openid) {
                this.$https.request({
                    url: `${this.$interfaces.getMyLesson}/${openid}`,
                    method: 'get'
                }).then(res => {
                    console.log("已经测试过了");
                    console.log(res);  //如果已经经过问题测试，那么返回结果里面就是推荐的课程数据
                    //将数据存储到vuex中
                    this.$store.dispatch('user/setLessonInfo', res.mylessons);
                    wx.switchTab({
                        url: "/pages/learn/main"
                    });
                }).catch(err => {
                    console.log("还没有测试过",err);
                    // 页面跳转(注意，在app.json中通过tabBar注册过的页面地址，无法通过redirect去访问，只能通过switchTab去跳转)
                    wx.redirectTo({
                        url: "/pages/question/main"
                    })
                })
            }
        },

    }
</script>


<style scoped lang="scss">
  .container {
    width: 100%;
    height: 100%;
    overflow: hidden;

    .login {
      width: 100%;
      height: 100%;
      position: relative;

      img {
        display: inline-block;
        width: 100%;
        height: 100%;
      }

      .learn {
        position: absolute;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        top: 0;
        left: 0;

        button {
          position: absolute;
          top: 90%;
          left: 10%;
          width: 80%;
          background-color: #009eef;
          color: white;
        }
      }
    }
  }


</style>
