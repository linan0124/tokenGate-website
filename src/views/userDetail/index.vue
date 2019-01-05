<template>
  <div class="content">
    <div class="page-title" v-if="$route.query.optionStyle === 'user'"><span @click="$router.go(-1)"></span>用户详情</div>
    <div class="page-title" v-if="$route.query.optionStyle === 'check'"><span @click="$router.go(-1)"></span>认证详情</div>
    <div class="content-block">
      <!-- 翻页 -->
      <div class="page-line clearfix" v-if="optionStatus === 'check'" v-show="!kycList.index">
        <div class="page-up" @click="pageTurning(-1)">上一个</div>
        <div class="page-down" @click="pageTurning(1)">下一个</div>
      </div>
      <!-- 基本信息展示 -->
      <div class="info-content">
        <div class="info-line clearfix">
          <div class="info-title">Nationality ：</div>
          <div class="info-intro">{{kycList.nationality | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">First name ：</div>
          <div class="info-intro">{{kycList.first_name | dealData}}</div>
        </div>
         <div class="info-line clearfix">
          <div class="info-title">Last name ：</div>
          <div class="info-intro">{{kycList.family_name | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Gender ：</div>
          <div class="info-intro">{{kycList.gender | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Date of birth ：</div>
          <div class="info-intro">{{kycList.birth | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Email ：</div>
          <div class="info-intro">{{kycList.email | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Primary phone number ：</div>
          <div class="info-intro">{{kycList.phone | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Type of address ：</div>
          <div class="info-intro">{{kycList.type_address | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Country of residence ：</div>
          <div class="info-intro">{{kycList.country | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Region ：</div>
          <div class="info-intro">{{kycList.region | dealData}}</div>
        </div>
         <div class="info-line clearfix">
          <div class="info-title">City ：</div>
          <div class="info-intro">{{kycList.city | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Street ：</div>
          <div class="info-intro">{{kycList.street | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Postal code  ：</div>
          <div class="info-intro">{{kycList.postalcode | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Taxation country ：</div>
          <div class="info-intro">{{kycList.tax_country | dealData}}</div>
        </div>

        <div class="info-line clearfix">
          <div class="info-title">Tax ID number ：</div>
          <div class="info-intro">{{kycList.tax_id_number | dealData}}</div>
        </div>
         <div class="info-line clearfix">
          <div class="info-title">Certificate type ：</div>
          <div class="info-intro">{{kycList.certificate_type | dealData}}</div>
        </div>
         <div class="info-line clearfix">
          <div class="info-title">ID number ：</div>
          <div class="info-intro">{{kycList.certificate_id | dealData}}</div>
        </div>
         <div class="info-line clearfix">
          <div class="info-title">ID Expiry Date ：</div>
          <div class="info-intro">{{kycList.certificate_expiry_date | dealData}}</div>
        </div>
        <!-- 回显图片展示 -->
        <p>Passport or Identity Card</p>
        <div class="photo-show">
          <img :src="kycList.id_person_img" alt="">
        </div>
        <p>Address Files</p>
        <div class="photo-show">
          <img :src="kycList.id_back_img" alt="">
        </div>
        <p>Holding your ID</p>
        <div class="photo-show">
          <img :src="kycList.id_img" alt="">
        </div>
      </div>
      <div class="option-content" v-if="optionStatus === 'check'">
        <!-- 翻页 -->
        <div class="page-line clearfix" v-show="!kycList.index">
          <div class="page-up" @click="pageTurning(-1)">上一个</div>
          <div class="page-down" @click="pageTurning(1)">下一个</div>
        </div>
        <!-- pass or no -->
        <div class="choice">
          <el-radio class="choice-btn" v-model="choiceStatus" label="审核通过">通过</el-radio>
          <el-radio class="choice-btn" v-model="choiceStatus" label="审核不通过">不通过</el-radio>
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
        <button class="submit-btn" @click="makeSure">确认</button>
      </div>
    </div>
  </div>
</template>

<script>
import {identificationDetails, setPageTurning, checkDetial} from 'api/kycAml'

export default {
  data () {
    return {
      choiceStatus: '审核通过',
      tipNote: '',
      optionStatus: '',
      kycList: [],
      kid: ''
    }
  },
  components: {},
  methods: {
    // 详情接口
    getIdentificationDetail () {
      identificationDetails({id: this.$route.query.id}).then(response => {
        var data = response.data
        // console.log(data.data.ack)
        var code = String(data.code)
        if (code === '200') {
          this.kycList = data.data.ack
          this.kid = data.data.ack.id
        } else if (code === '500') {
          this.$message(data.message)
        }
      }).catch(errortip => {})
    },
    // 翻页接口
    pageTurning (val) {
      setPageTurning({id: this.kid, number: val}).then(response => {
        var data = response.data
        var code = String(data.code)
        if (code === '200') {
          this.kycList = data.data.page
          this.kid = data.data.page.id
          if (data.data.page.index) {
            this.$message(data.data.page.index)
          }
        } else if (code === '500') {
          // this.$message(data.message)
        }
      }).catch(errortip => {})
    },
    // 审核接口
    checkPass () {
      if (this.choiceStatus !== '') {
        checkDetial({id: this.kid, status: this.choiceStatus, comment: this.tipNote}).then(response => {
          var data = response.data
          var code = String(data.code)
          if (code === '200') {
            this.$router.push('/identification')
          // this.$router.push({name: 'converFiatCheck', query: {memoData: data.data}})
          } else if (code === '500') {
            this.$message(data.message)
          }
        }).catch(errortip => {})
      } else {
        this.$message('请选择通过或不通过')
      }
    },
    makeSure () {
      this.$confirm('此操作无法撤销, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.checkPass()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  },
  mounted () {
    this.optionStatus = this.$route.query.optionStyle
    this.getIdentificationDetail()
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
    img {
      width: 100%;
      height:100%;
    }
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
