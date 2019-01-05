<template>
  <div class="header">
    <div class="header__pos clearfix">
      <img src="static/image/daoCoinLogo.png" alt="fpt" class="fl">
      <!-- <span class="headerName">后台管理系统</span> -->
      <div class="user fr">
        <el-dropdown>
        <span class="el-dropdown-link">
          admin<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <el-dropdown-item>修改密码</el-dropdown-item> -->
            <el-dropdown-item  @click.native="loginOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import {removeToken} from 'util/auth'
export default{
  methods: {
    loginOut () {
      removeToken()
      this.$router.push('./login')
    }
  }
}
</script>

<style lang="scss" scoped>
%layout{
  margin: 0 auto;
}
.headerName{
  display:inline-block;
  font-size: 14px;
  color: #1E3864;
  line-height:30px;
  margin-left:20px;
}
.header{
  width: 100%;
  height:80px;
  box-shadow: 0 0 4px 0 rgba(0,0,0,0.10);
  position: fixed;
  top:0;
  left:0;
  background:#ffffff;
  z-index:1002;
  &__pos{
   @extend %layout;
     height: 40px;
     padding: 20px 40px;
   }

  img{
    height: 36px;
    width: 150px;
  }
  .user{
    margin-top:10px;

  }
  .el-dropdown{
    color:#8C98A4;
    // width:100px;
  }
}
</style>
