<template>
  <div class="content">
    <div class="page-title"><span @click="$router.go(-1)"></span>订单详情</div>
    <div class="content-block">
      <!-- 订单状态展示 -->
      <div class="order-status clearfix">
        <div class="pay-status">
          <p>付款</p>
          <!-- await success fail -->
          <div class="status-line success-line"></div>
          <div class="order-intro clearfix">
            <span class="fl">付款成功</span>
            <span class="order-intro-info">2018-06-12 14:34</span>
          </div>
        </div>
        <div class="pay-status">
          <p>代币增发</p>
          <!-- await success fail -->
          <div class="status-line success-line"></div>
          <div class="order-intro clearfix">
            <span class="fl">发币成功</span>
            <span class="order-intro-info">2018-06-12 14:34</span>
          </div>
        </div>
        <div class="pay-status" style="margin-right:0">
          <p>代币转账</p>
          <!-- await success fail -->
          <div class="status-line success-line"></div>
          <div class="order-intro clearfix">
            <span class="fl">转账成功</span>
            <span class="order-intro-info">2018-06-12 14:34</span>
          </div>
        </div>
      </div>
      <!-- 铸币订单信息 -->
      <div class="detail-title">铸币订单信息</div>
      <div class="info-content">
        <div class="info-line clearfix">
          <div class="info-title">订单ID ：</div>
          <div class="info-intro">{{convertDetailsInfo.order_id | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">申请人 ：</div>
          <div class="info-intro word-color">{{convertDetailsInfo.name | dealData}}</div>
        </div>
        <!-- 申请人邮箱 -->
        <div class="info-line clearfix">
          <div class="info-title">申请人邮箱 ：</div>
          <div class="info-intro">{{convertDetailsInfo.email | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">申请时间 ：</div>
          <div class="info-intro">{{convertDetailsInfo.created_at | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">币种 ：</div>
          <div class="info-intro">{{convertDetailsInfo.token_name | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">金额($) ：</div>
          <div class="info-intro">{{convertDetailsInfo.token_amount | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <!-- 未查到 -->
          <div class="info-title">实际转账金额 ：</div>
          <div class="info-intro">{{convertDetailsInfo.order_amount | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">转账手续费 ：</div>
          <div class="info-intro">{{convertDetailsInfo.purchase_fee | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">手续费费率 ：</div>
          <div class="info-intro">{{convertDetailsInfo.purchase_rate | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">赠送DCP量 ：</div>
          <div class="info-intro">{{convertDetailsInfo.dcp_in_return | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">收款方ERC20地址 ：</div>
          <div class="info-intro">{{convertDetailsInfo.wallet_address | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">增发hash ：</div>
          <div class="info-intro">{{convertDetailsInfo.order_status_hashcode | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">转账hash ：</div>
          <div class="info-intro">{{convertDetailsInfo.order_tansfer_hashcode | dealData}}</div>
        </div>
      </div>
      <!-- DaoCoin平台收款账户信息 -->
      <div class="detail-title">DaoCoin平台收款账户信息</div>
      <div class="info-content">
        <div class="info-line clearfix">
          <div class="info-title">Bank Name ：</div>
          <div class="info-intro">{{convertDetailsInfo.bank_name | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Bank Address ：</div>
          <div class="info-intro">St. Louis, MO</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Memo/reference ：</div>
          <div class="info-intro">{{convertDetailsInfo.mem_code | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Swift Code ：</div>
          <div class="info-intro">{{convertDetailsInfo.swift_code | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Account routing ：</div>
          <div class="info-intro">{{convertDetailsInfo.routing_number | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Account number ：</div>
          <div class="info-intro">{{convertDetailsInfo.bank_account_number | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Account Name ：</div>
          <div class="info-intro">{{convertDetailsInfo.bank_account_name | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Account Address ：</div>
          <div class="info-intro">{{convertDetailsInfo.address | dealData}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {convertDetails} from 'api/convert'

export default {
  data () {
    return {
      convertDetailsInfo: {}
    }
  },
  components: {},
  methods: {
    convertInfoDetails () {
      convertDetails({orderId: this.$route.query.orderInfo}).then(response => {
        // console.log(response.data.data.mintage)
        if (Number(response.data.code) === 200) {
          this.convertDetailsInfo = response.data.data.mintage
        }
      }).catch(errortip => {})
    }
  },
  mounted () {
    this.convertInfoDetails()
  }
}
</script>

<style lang="scss" scoped>
  .order-status{
    padding-bottom:70px;
    border-bottom:1px solid #C7D1DB;
    // margin-bottom:40px;
    p{
      font-size: 18px;
      color: #1E2021;
    }
    .pay-status{
      width:30%;
      margin-right:5%;
      float:left;
    }
    .status-line{
      height:10px;
      border-radius: 5px;
      margin-bottom:20px;
    }
    .success-line{
      background: #1164FF;
    }
    .await-line{
      background: #F3F5F6;
    }
    .fail-line{
      background: #D53D3D;
      color:#D53D3D;
    }
    .order-intro{
      font-size:14px;
      margin-bottom:10px;
    }
    .order-intro-info{
      color: #8C98A4;
      float:right;
    }
  }
  .detail-title{
    height:20px;
    font-size: 18px;
    color: #1E2021;
    margin-bottom:20px;
    margin-top:40px;
  }
  .word-color{
    color: #1164FF;
  }

</style>
