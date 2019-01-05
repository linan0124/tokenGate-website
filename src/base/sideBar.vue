<template>
  <div class="sideBar">
    <el-row>
      <el-col>
        <el-menu :default-active="$route.path"
          router
          background-color="#454f74"
          text-color="#8d98a6"
          active-text-color="#4c84ff">
          <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
            {{ item.title }}
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default{
  data () {
    return {
      navList: [
        {title: '首页',
          name: '/projectInfo'
        },
        {title: '认证',
          name: '/identification'
        },
        {title: '铸币',
          name: '/convert/convertList'
        },
        {title: '赎回',
          name: '/redeem/redeemList'
        },
        {title: '通证资产管理',
          name: '/tokenAssetsManagement/tokenAssetsList'
        },
        {title: '用户持币资产管理',
          name: '/userTokenAssetsManage/userTokenAssetsList'
        }
      ]
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  },
  mounted () {

  }
}
</script>

<style lang="scss" scoped>
%layout{
  max-width: 1200px;
  min-width: 960px;
  margin: 0 auto;
}
.sideBar{
  width:155px;
  height:100%;
  padding-top:50px;
  border-right: 1px solid #E5E9F2;
  background:#454f74;
  position:fixed;
  left:0;
  top:30px;

  &__pos{
    @extend %layout;
    height: 40px;
    padding: 20px 40px;
  }
}
.el-submenu__title{
  padding:0 !important
}
.el-menu-item.is-active {
   background-color: rgb(255, 255, 255) !important;
}
.el-menu-item{
  text-align: center;
}
</style>
