<template>
  <div class="login-block">
    <div class="login-header">
      <img class="daoCoin-logo" src="static/image/daoCoinLogo.png" alt="">
    </div>
    <div class="login-container">
      <div class="login">
        <div class="login-title">登录</div>
        <!-- form -->
        <el-form label-position="top" label-width="80px" :model="formLabelAlign" :rules="rules" ref="form">
          <el-form-item class="label-pos" prop="name">
            <span class="label-name">用户名</span>
            <el-input class="input-block" v-model="formLabelAlign.name" :maxlength="20"></el-input>
          </el-form-item>
          <el-form-item class="label-pos" prop="password">
            <span class="label-name">登录密码</span>
            <el-input class="input-block" type="password" v-model="formLabelAlign.password" :maxlength="20"></el-input>
          </el-form-item>
        </el-form>

        <!-- submit -->
        <el-button type="primary" class="submit-btn" @click="submitForm">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import {login} from 'api/login'
import {setToken} from 'util/auth'
export default{
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入用户名'))
      }
      const rex = /^\w{2,20}$/
      if (!rex.test(value)) {
        callback(new Error('请输入正确格式'))
      } else {
        callback()
      }
    }
    var checkPassword = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      }
      const rex = /^\w{5,20}$/
      if (!rex.test(value)) {
        callback(new Error('请输入正确格式'))
      } else {
        callback()
      }
    }
    return {
      formLabelAlign: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { validator: checkPhone, trigger: 'blur' }
        ],
        password: [
          { validator: checkPassword, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          login(this.formLabelAlign).then(response => {
            if (Number(response.data.code) === 200) {
              setToken(response.data.data.cookieToken)
              this.$router.push('/')
            } else {
              this.$message({
                message: response.data.message,
                type: 'warning'
              })
            }
          }).catch(errortip => {})
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.submit-btn{
  width: 100%;
  height: 40px;
}
.label-name{
  position: relative;
  left: 10px;
  top: 20px;
  z-index: 1000;
  color: #8C98A4;
}
.label-pos{
  margin-bottom: 40px;
}
.el-input__inner{
  text-indent: 80px;
}
.login-block{
  width: 100%;
  height: 100%;
  // position: relative;
  background: #454F74;
}
.login-header{
  width:100%;
  background:#fff;
  height:80px;
  .daoCoin-logo{
    width:151px;
    height:36px;
    margin: 20px 0 0 30px;
  }
}
.login-container{
  position: relative;
  background: #454F74;
  height:650px;
}
.login-title{
  font-size: 36px;
  color: #8C98A4;
  text-align:center;
  margin-bottom:40px;
}
.login{
  width: 480px;
  position: absolute;
  top: 120px;
  // top: 20%;
  left: 50%;
  margin-left:-240px;
  // transform: translate(-240px, -70%);

  img{
    height: 90px;
    display: block;
    margin: 0 auto 120px;
  }
  .logo{
    margin-top:100px;
    width:200px;
    height:80px;
  }
}
</style>
