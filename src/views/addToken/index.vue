<template>
  <div class="content">
    <div class="page-title"><span @click="$router.go(-1)"></span>添加通证</div>
    <div class="content-block">
        <div class="demo-input-suffix tokenBox pt20">
            <div class="tokenTitle fl">发币平台</div>
            <el-select v-model="companyList" placeholder="请选择" class="tokenInput">
                <el-option
                v-for="item in companyListData"
                :key="item.lable"
                :label="item.lable"
                :value="item.lable">
                </el-option>
            </el-select>
        </div>
        <div class="demo-input-suffix tokenBox">
            <div class="tokenTitle fl">Token简称</div>
            <el-input v-model="tokenAbbreviation" placeholder="请输入内容" class="tokenInput"></el-input>
        </div>
        <div class="demo-input-suffix tokenBox">
            <div class="tokenTitle fl">Token全称</div>
            <el-input v-model="tokenFullname" placeholder="请输入内容" class="tokenInput"></el-input>
        </div>
        <div class="demo-input-suffix tokenBox">
            <div class="tokenTitle fl">Token数量</div>
            <el-input v-model="tokenAmount" placeholder="请输入内容" class="tokenInput"></el-input>
        </div>
        <div class="demo-input-suffix tokenBox">
            <div class="tokenTitle fl">合约地址</div>
            <el-input v-model="contractAddress" placeholder="请输入内容" class="tokenInput"></el-input>
        </div>
        <div class="demo-input-suffix tokenBox">
            <div class="tokenTitle fl">合约创建时间</div>
            <el-date-picker
            class="tokenInput"
            v-model="contractCreationTime"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd">
            </el-date-picker>
        </div>
        <div class="demo-input-suffix tokenBox">
            <div class="tokenTitle fl">创世地址</div>
            <el-input v-model="creationAddress" placeholder="请输入内容" class="tokenInput"></el-input>
        </div>
        <div class="demo-input-suffix tokenBox">
            <div class="tokenTitle fl">锚定法币</div>
            <el-input v-model="anchorTheFiat" placeholder="请输入内容" class="tokenInput"></el-input>
            <!-- <el-select v-model="anchorTheFiat" placeholder="请选择" class="tokenInput">
                <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
                </el-option>
            </el-select> -->
        </div>
        <div class="demo-input-suffix tokenBox">
            <div class="tokenTitle fl">绑定机构</div>
            <el-select v-model="bindOrganization" multiple placeholder="请选择" class="tokenInput">
                <el-option
                v-for="item in orgListData"
                :key="item.lable"
                :label="item.lable"
                :value="item.value">
                </el-option>
            </el-select>
            <el-button plain icon="el-icon-plus" class="orgMsg" @click="addOrg">机构信息</el-button>
        </div>
        <div class="tokenBox">
            <div class="tokenTitle fl">添加LOGO</div>
            <div class="card-body boxBorder imgList">
                <form action="" enctype="multipart/form-data">
                    <div class="backImg"></div>
                    <input class="upload"
                        @change="takePicture"
                        type="file"
                        id="back"
                        accept="image/jpg, image/jpeg, image/png">
                </form>
            </div>
        </div>
         <el-button type="primary" class="submitBtn" @click="setToken">提交</el-button>

    </div>
    <div class="popBlock" id="popBlock">
      <div class="popBox">
          <h4 class="popTitle">添加机构</h4>
          <div class="popOrgBox">
              <div>机构名称</div>
              <el-input v-model="orgName" placeholder="请输入内容" class="popOrgName"></el-input>
          </div>
          <div class="popOrgBox">
              <div>机构账号</div>
              <el-input v-model="orgAccountNumber" placeholder="请输入内容" class="popOrgName"></el-input>
          </div>
          <div class="popOrgBox">
              <div>机构其他信息</div>
              <el-input v-model="orgMessage" placeholder="请输入内容" class="popOrgName"></el-input>
          </div>
          <div class="popOrgBox">
              <div>备注</div>
              <el-input v-model="orgRemark" placeholder="请输入内容" class="popOrgName"></el-input>
          </div>
           <el-button type="primary" class="sureBtn" @click="setOrgMessage">确定</el-button>
      </div>
    </div>
    <div class="submitPop" id="submitPop">
        <div class="submitSuccess" v-if="popUp">
            <div class="successIcon"></div>
            <div class="successTip">提交成功！</div>
            <div class="successBtn" @click="iKnow">我知道了</div>
        </div>
        <div class="submitFailed" v-else>
            <div class="failedIcon"></div>
            <div class="successTip">提交失败！</div>
            <div class="failedTip">失败原因</div>
            <div class="successBtn" @click="iKnow">返回查看</div>
        </div>
    </div>
  </div>
</template>

<script>
import {addOrg, addToken, orgList, companyList} from 'api/tokenAsstesList'
import axios from 'axios'
import { getToken } from 'util/auth'

export default {
  data () {
    return {
    //   convertDetailsInfo: {},
      popUp: '',
      tokenAbbreviation: '',
      tokenFullname: '',
      tokenAmount: '',
      contractAddress: '',
      contractCreationTime: '',
      creationAddress: '',
      anchorTheFiat: '',
      //   options: [{
      //     value: 'USD',
      //     label: 'USD'
      //   }, {
      //     value: 'EUR',
      //     label: 'EUR'
      //   }, {
      //     value: 'JPY',
      //     label: 'JPY'
      //   }],
      bindOrganization: [],
      orgListData: [],
      orgName: '',
      orgAccountNumber: '',
      orgMessage: '',
      orgRemark: '',
      companyList: '',
      companyListData: [],
      imageUrl: ''
    }
  },
  components: {},
  methods: {
    addCompanyBtn () {
      $('#popBlock').hide()
    },
    addOrg () {
      $('#popBlock').show()
    },
    iKnow () {
      $('#submitPop').hide()
    },
    // 添加机构信息
    setOrgMessage () {
      addOrg({bankName: this.orgName,
        bankCard: this.orgAccountNumber,
        bankInformation: this.orgMessage,
        bankComment: this.orgRemark}).then(response => {
        let data = response.data
        if (Number(response.data.code) === 200) {
          $('#popBlock').hide()
          this.$message(data.message)
          this.getOrgList()
        }
      }).catch(errortip => {})
    },
    // 获取机构列表
    getOrgList () {
      orgList().then(response => {
        let data = response.data
        if (Number(response.data.code) === 200) {
          this.orgListData = data.listData
        }
      }).catch(errortip => {})
    },
    // 获取平台列表
    getCompanyList () {
      companyList().then(response => {
        let data = response.data
        if (Number(response.data.code) === 200) {
          this.companyListData = data.listData
        }
      }).catch(errortip => {})
    },
    // 添加logo
    takePicture (e) {
      var file = e.target
      let _this = this
      if (file.files && file.files[0]) {
        _this.imageUrl = file.files[0]
        console.log(_this.imageUrl)
        var reader = new FileReader()
        reader.onload = function (evt) {
          if (e.target.id === 'back') {
            // _this.fileSize(e.target.size)
            $('.backImg').html('<img style="width:100%; height:100%;" src="' + evt.target.result + '" />')
          }
        }
        reader.readAsDataURL(file.files[0])
      } else {
        $('.backImg').html('<div class="img" style="filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale,src=\'' + file.value + '\'"></div>')
      }
    },
    fileSize (size) {
      var imgSize = size / 1024
      if (imgSize > 1024) {
        alert('Image size cannot exceed 1MB')
        this.canUpload = false
      }
    },

    // 提交图片文件
    setToken () {
      console.log(this.imageUrl)
      let param = new FormData() // 创建form对象
      param.append('currencyName', this.tokenAbbreviation)// 通过append向form对象添加数据
      param.append('currencyFullname', this.tokenFullname)
      param.append('currencyNumber', this.tokenAmount)
      param.append('currencyContract', this.contractAddress)
      param.append('currencyAddress', this.creationAddress)
      param.append('createTime', this.contractCreationTime)
      param.append('currencyLegal', this.anchorTheFiat)
      param.append(' bankName', this.bindOrganization.toString())
      param.append('file', this.imageUrl)
      param.append('companyName', this.companyList.toString())
      const instance = axios.create({
        withCredentials: true
      })
      let config = {
        headers: {'Content-Type': 'multipart/form-data', 'token': getToken()}
      } // 添加请求头  http://39.106.60.55:8888  http://192.11.9.68:8080/user/addPass
      axios.post('https://test_back.daocoin.money/user/addPass', param, config)
        .then(response => {
          let data = response.data
          if (Number(response.data.code) === 200) {
            this.popUp = true
            $('#submitPop').show()
          } else if (Number(response.data.code) === 500) {
            this.popUp = false
            $('#submitPop').show()
          } else {
            this.popUp = false
            $('#submitPop').show()
          }
        }).catch(errortip => {})
    }

  },
  mounted () {
    this.getOrgList()
    this.getCompanyList()
  }
}
</script>

<style lang="scss" scoped>
.pt20{
    padding-top: 20px;
}
.tokenBox{
    margin-bottom: 50px;
.tokenInput{
   width: 420px;
   height: 40px;
   margin-left: 100px;
}
.tokenTitle{
    width: 100px;
    line-height: 40px;
    font-size: 14px;
    color: #1E2021;
}
}
.orgMsg{
    color: #1164FF;
    border-color: #1164FF;
    background: #ffffff;
    margin-left: 20px;
}
.submitBtn{
    width: 200px;
    height: 50px;
    background: #1164FF;
    margin-left: 200px;
    margin-top: 20px;
}
// popBox
.popBlock{
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    .popBox{
    width: 40%;
    height: 580px;
    background: #ffffff;
    margin-top: 100px;
    margin-left: 30%;
    .popTitle{
      width: 100%;
      height: 60px;
      border-bottom: 1px solid #C7D1DB;
      font-size: 14px;
      line-height: 60px;
      text-align: center;
    }
    .popOrgBox{
        margin-top: 30px;
        margin-bottom: 20px;
        padding-left: 8%;
        padding-right: 8%;
        .popOrgName{
            width: 100%;
            margin-top: 10px;
        }
    }
    .sureBtn{
        width: 200px;
        height: 40px;
        background: #1164FF;
        margin-left: 8%;
        margin-top: 30px;
        cursor: pointer;
    }
}
}
//提交成功 失败提示
.submitPop{
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 10000;
    .submitSuccess{
      width: 500px;
      height: 380px;
      padding-top: 100px;
      background: #ffffff;
      margin-left: 420px;
      margin-top: 100px;
      .successIcon{
          width: 140px;
          height: 140px;
          background: url(/static/image/successicon.png);
          background-size: cover;
          border-radius: 70px;
          margin: 0 auto;
      }
      .successTip{
         padding-left: 202px;
         color: #1E2021;
         font-size: 24px;
         margin-top: 50px;
      }
      .successBtn{
         width: 200px;
         height: 40px;
         border:1px solid #1164FF;
         line-height: 40px;
         text-align: center;
         margin: 0 auto;
         margin-top: 50px;
         border-radius:3px;
         color: #1164FF;
      }
    }
    .submitFailed{
        width: 500px;
        height: 420px;
        padding-top: 100px;
        background: #ffffff;
        margin-left: 420px;
        margin-top: 100px;
         .failedIcon{
          width: 140px;
          height: 140px;
          background: url(/static/image/faildicon.png);
          background-size: cover;
          border-radius: 70px;
          margin: 0 auto;
      }
      .successTip{
         padding-left: 202px;
         color: #1E2021;
         font-size: 24px;
         margin-top: 50px;
      }
      .failedTip{
          color: #8C98A4;
          font-size: 14px;
          text-align: center;
          margin-top: 20px;
      }
      .successBtn{
         width: 200px;
         height: 40px;
         border:1px solid #1164FF;
         line-height: 40px;
         text-align: center;
         margin: 0 auto;
         margin-top: 50px;
         border-radius:3px;
         background: #1164FF;
         color: #ffffff;
      }

    }
}
//添加logo
 .boxBorder{
            border:1px solid #e7e7e7;
            min-height:100px;
            width: 100px;
            // margin-top: 100px;
            margin-left: 200px;
}
.imgList{
            background: #F3F5F6;
            position: relative;
            padding: 0;
    }
    .backImg{
        width: 100%;
        height: 100px;
        min-height: 100px;
        background: url(/static/image/addfile.png);
        background-size:100% 100%
    }
    .upload{
        width:100%;
        min-height:100px;
        position: absolute;
        top:0;
        left:0;
        opacity: 0
    }

</style>
