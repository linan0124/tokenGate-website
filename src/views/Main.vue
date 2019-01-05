<template>
  <div id="app">

    <Header></Header>

    <SideBar></SideBar>

    <!-- 内容块 -->
    <div class="contant">
      <router-view></router-view>
    </div>

  </div>
</template>

<script>
import Header from '@/base/header'
import SideBar from '@/base/sideBar'

export default {
  name: 'App',
  components: {Header, SideBar}
}
</script>

<style lang="scss">
  @import 'normalize.css';// normalize.css 样式格式化
  @import '../styles/index.scss'; // 全局自定义的css样式
  .contant{
    position: absolute;
    top: 80px;
    left: 155px;
    right: 0;
    padding:20px 40px 100px 20px;
    background: #F5F6FA;
  }
</style>
