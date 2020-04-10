<template>
  <!--web-view 小程序自带的，可以跳转到任何的url中-->
  <web-view :src="url"></web-view>
</template>

<script>
    /**
     * Created by yanyue on 2019-12-02 14:16
     * 课程详情页面
     */

    export default {
        name: "index",
        data() {
            return {
                url:''
            }
        },
        onLoad(option){
            //option 就是跳转时候的参数（url等）
            console.log(option);
            this.url = option.url
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
  .index {

  }
</style>
