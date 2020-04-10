<template>
  <div class='CartHeader'>
    <span>{{title}}</span>
    <span v-if="lessonCount>0">（{{lessonCount}}）</span>
    <span class="look_all" @click="$emit('click')">查看全部</span>
  </div>
</template>

<script>
    /**
     * Created by yanyue on 2019-12-02 11:00
     */

    export default {
        name: "CartHeader",
        props: {
            title: String,
            lessonCount: {
                type: Number,
                default: 0
            }
        },

        data() {
            return {}
        },
        methods: {}
    }
</script>

<style lang='scss' scoped>
  .CartHeader {
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    overflow: hidden;

    .look_all {
      font-size: 12px;
      color: #aaa;
      float: right;
    }
  }
</style>
