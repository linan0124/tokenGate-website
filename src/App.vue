<template>
  <div id="app">

    <!-- 内容块 -->
    <div class="contents">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Header from '@/base/header'
import SideBar from '@/base/sideBar'

export default {
  name: 'App',
  components: {}
}
</script>

<style lang="scss">
  @import 'normalize.css';// normalize.css 样式格式化
  @import './styles/index.scss'; // 全局自定义的css样式
  .contents{
    position: absolute;
    top:0;
    left: 0;
    right: 0;
    background: #F5F6FA;
  }
  #app{
    height:100%
  }
</style>
