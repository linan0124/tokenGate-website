<template>
  <div class="content">
    <div class="page-title" v-if="$route.query.optionStyle === 'user'"><span @click="$router.go(-1)"></span>用户详情</div>
    <div class="page-title" v-if="$route.query.optionStyle === 'check'"><span @click="$router.go(-1)"></span>认证详情</div>
    <div class="content-block">
      <!-- 翻页 -->
      <div class="page-line clearfix" v-if="optionStatus === 'check'">
        <div class="page-up">上一个</div>
        <div class="page-down">下一个</div>
      </div>
      <!-- 基本信息展示 -->
      <div class="info-content">
        <div class="info-line clearfix">
          <div class="info-title">Type ：</div>
          <div class="info-intro">Natural person</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Name ：</div>
          <div class="info-intro">Natural person</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Gender ：</div>
          <div class="info-intro">Natural person</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Date of birth ：</div>
          <div class="info-intro">Natural person</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Email ：</div>
          <div class="info-intro">Natural person</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Phone Number ：</div>
          <div class="info-intro">Natural person</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Type Address ：</div>
          <div class="info-intro">Natural person</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Address ：</div>
          <div class="info-intro">Natural person</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Postal Code  ：</div>
          <div class="info-intro">Natural person</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Country ：</div>
          <div class="info-intro">Natural person</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Tax ID number ：</div>
          <div class="info-intro">Natural person</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">ERC20 Address ：</div>
          <div class="info-intro">Natural person</div>
        </div>
         <div class="info-line clearfix">
          <div class="info-title">KYC/AML Status ：</div>
          <div class="info-intro">Natural person</div>
        </div>
         <div class="info-line clearfix">
          <div class="info-title">Account Balance ：</div>
          <div class="info-intro">Natural person</div>
        </div>
         <div class="info-line clearfix">
          <div class="info-title">Certificate type ：</div>
          <div class="info-intro">Natural person</div>
        </div>
         <div class="info-line clearfix">
          <div class="info-title">ID-number ：</div>
          <div class="info-intro">Natural person</div>
        </div>
         <div class="info-line clearfix">
          <div class="info-title">ID Expiry Date ：</div>
          <div class="info-intro">Natural person</div>
        </div>
         <div class="info-line clearfix">
          <div class="info-title">Resident Address ：</div>
          <div class="info-intro">Natural person</div>
        </div>
         <div class="info-line clearfix">
          <div class="info-title">Certificate ：</div>
          <div class="info-intro">Natural person</div>
        </div>
        <!-- 回显图片展示 -->
        <div class="photo-show">
          <!-- <img :src="userInfos.frontUrl" alt=""> -->
        </div>
        <div class="photo-show"></div>
        <div class="photo-show"></div>
      </div>
      <div class="option-content" v-if="optionStatus === 'check'">
        <!-- 翻页 -->
        <div class="page-line clearfix">
          <div class="page-up">上一个</div>
          <div class="page-down">下一个</div>
        </div>
        <!-- pass or no -->
        <div class="choice">
          <el-radio class="choice-btn" v-model="choiceStatus" label="pass">通过</el-radio>
          <el-radio class="choice-btn" v-model="choiceStatus" label="no">不通过</el-radio>
        </div>
        <!-- 备注填写 -->
        <div class="tipNote">
          <el-input
            type="textarea"
            :rows="3"
            resize=none
            placeholder="备注"
            v-model="tipNote">
          </el-input>
        </div>
        <!-- 确定按钮 -->
        <button class="submit-btn">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
// import {userList} from 'api/userList'

export default {
  data () {
    return {
      choiceStatus: 'pass',
      tipNote: '',
      optionStatus: ''
    }
  },
  components: {},
  methods: {
  },
  mounted () {
    this.optionStatus = this.$route.query.optionStyle
  }
}
</script>

<style lang="scss" scoped>
  .page-line{
    width:100%;
    font-size: 14px;
    color: #1164FF;
    margin-bottom:20px;
    .page-up{
      float:left;
      cursor: pointer;
    }
    .page-down{
      float:right;
      cursor: pointer;
    }
  }
  .photo-show{
    width:420px;
    height:200px;
    background: #F3F5F6;
    border: 1px dashed #C7D1DB;
    border-radius: 3px;
    margin-bottom:10px;
  }
  .option-content{
    margin-top:20px;
    .choice{
      margin-top:50px;
      margin-bottom:50px;
    }
    .choice-btn{
      margin-right:150px;
    }
    .tipNote{
      width:420px;
      height:80px;
      margin-bottom:40px;
    }
    .submit-btn{
      width:200px;
      height:50px;
      background: #1164FF;
      border-radius: 3px;
      color:#fff;
      margin-bottom:20px;
    }
  }
</style>
