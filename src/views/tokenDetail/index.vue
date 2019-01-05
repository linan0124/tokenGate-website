<template>
  <div class="content">
    <div class="page-title"><span @click="$router.go(-1)"></span>币种详情</div>
    <div class="content-block">
        <div class="demo-input-suffix tokenBox pt20 clearfix">
            <div class="tokenTitle fl">发币平台</div>
            <div class="tokenInput fl">{{listData.company_name}}</div>
        </div>
        <div class="demo-input-suffix tokenBox clearfix">
            <div class="tokenTitle fl">Token简称</div>
            <div class="tokenInput fl">{{listData.currency_name}}</div>
        </div>
        <div class="demo-input-suffix tokenBox clearfix">
            <div class="tokenTitle fl">Token全称</div>
             <div class="tokenInput fl">{{listData.currency_fullname}}</div>
        </div>
        <div class="demo-input-suffix tokenBox clearfix">
            <div class="tokenTitle fl">Token数量</div>
             <div class="tokenInput fl">{{listData.currency_number}}</div>
        </div>
        <div class="demo-input-suffix tokenBox clearfix">
            <div class="tokenTitle fl">合约地址</div>
             <div class="tokenInput fl">{{listData.currency_contract}}</div>
        </div>
        <div class="demo-input-suffix tokenBox clearfix">
            <div class="tokenTitle fl">合约创建时间</div>
            <div class="tokenInput fl">{{listData.createTime}}</div>
        </div>
        <div class="demo-input-suffix tokenBox clearfix">
            <div class="tokenTitle fl">创世地址</div>
             <div class="tokenInput fl">{{listData.currency_address}}</div>
        </div>
        <div class="demo-input-suffix tokenBox clearfix">
            <div class="tokenTitle fl">锚定法币</div>
             <div class="tokenInput fl">{{listData.currency_legal}}</div>
        </div>
        <div class="demo-input-suffix tokenBox clearfix">
            <div class="tokenTitle fl">绑定机构</div>
             <div class="tokenInput fl">{{listData.bank_name}}</div>
        </div>

    </div>
  </div>
</template>

<script>
import {TokenDetail} from 'api/userTokenList'

export default {
  data () {
    return {
      listData: []
    }
  },
  components: {},
  methods: {
    getTokenDetail () {
      TokenDetail({
        tokenName: this.$route.query.tokenName
      }).then(response => {
        let data = response.data
        if (Number(response.data.code) === 200) {
          this.listData = data.data.token
        }
      }).catch(errortip => {})
    }

  },
  mounted () {
    this.getTokenDetail()
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
   width: 410px;
   height: 40px;
   margin-left: 100px;
   background: #F7F7F7;
   border-radius: 3px;
   padding-left: 10px;
   line-height: 40px;
   color: #1E3864;
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
          background: #1164FF;
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
        .successIcon{
          width: 140px;
          height: 140px;
          background: #1164FF;
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

</style>
