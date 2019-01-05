<template>
  <div class="content">
    <div class="page-title"><span @click="$router.go(-1)"></span>订单详情</div>
    <div class="content-block">
      <!-- 订单状态展示 -->
      <div class="order-status clearfix">
        <div class="pay-status">
          <p>代币转账</p>
          <!-- await success fail -->
          <div class="status-line success-line"></div>
          <div class="order-intro clearfix">
            <span class="fl">转账成功</span>
            <span class="order-intro-info">2018-06-12 14:34</span>
          </div>
        </div>
        <div class="pay-status">
          <p>代币销毁</p>
          <!-- await success fail -->
          <div class="status-line success-line"></div>
          <div class="order-intro clearfix">
            <span class="fl">销毁成功</span>
            <!-- <span class="order-intro-info">2018-06-12 14:34</span> -->
          </div>
        </div>
        <div class="pay-status" style="margin-right:0">
          <p>法币赎回</p>
          <!-- await success fail -->
          <div class="status-line success-line"></div>
          <div class="order-intro clearfix">
            <span class="fl">赎回成功</span>
            <!-- <span class="order-intro-info">2018-06-12 14:34</span> -->
          </div>
        </div>
      </div>
      <!-- 铸币订单信息 -->
      <div class="detail-title">赎回订单信息</div>
      <div class="info-content">
        <div class="info-line clearfix">
          <div class="info-title">订单ID ：</div>
          <div class="info-intro">{{listData.redeem_id | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">申请人 ：</div>
          <div class="info-intro word-color">{{listData.name | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">申请人邮箱 ：</div>
          <div class="info-intro">{{listData.email | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">申请时间 ：</div>
          <div class="info-intro">{{listData.created_at | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">赎回币种 ：</div>
          <div class="info-intro">{{listData.token_name | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">赎回金额($) ：</div>
          <div class="info-intro">{{listData.token_amount | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">实际转账金额 ：</div>
          <div class="info-intro">{{listData.redeem_amount | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">转账手续费 ：</div>
          <div class="info-intro">{{listData.redeem_fee | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">手续费费率 ：</div>
          <div class="info-intro">{{listData.redeem_rate | dealData}}%</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">赠送DCP量 ：</div>
          <div class="info-intro">{{listData.dcp_in_return | dealData}} DCP</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">收款方ERC20地址 ：</div>
          <div class="info-intro">{{listData.address | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">转账hash ：</div>
          <div class="info-intro">{{listData.orderHash | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">销毁hash ：</div>
          <div class="info-intro">{{listData.broken_hash | dealData}}</div>
        </div>
      </div>
      <!-- DaoCoin平台收款账户信息 -->
      <div class="detail-title">{{listData.name}}银行账户信息</div>
      <div class="info-content">
        <div class="info-line clearfix">
          <div class="info-title">Bank Account Name ：</div>
          <div class="info-intro">{{listData.bank_account_name | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Bank Account Number ：</div>
          <div class="info-intro">{{listData.bank_account_number | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Contact Name ：</div>
          <div class="info-intro">{{listData.contact_name | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Contact Email ：</div>
          <div class="info-intro">{{listData.contact_email | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Routing Number ：</div>
          <div class="info-intro">{{listData.routing_number | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Bank Name ：</div>
          <div class="info-intro">{{listData.bank_name | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Intermediary Bank Name ：</div>
          <div class="info-intro">{{listData.intermediary_bank_name}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Intermediary Bank Reference ：</div>
          <div class="info-intro">{{listData.reference_number | dealData}}</div>
        </div>
        <div class="info-line clearfix">
          <div class="info-title">Swift Code ：</div>
          <div class="info-intro">{{listData.swift_code | dealData}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {redeemDetail} from 'api/redeem'

export default {
  data () {
    return {
      listData: []
    }
  },
  components: {},
  methods: {
    getRedeemList () {
      redeemDetail({
        redeemId: this.$route.query.redeemId}).then(response => {
        var data = response.data
        var code = String(data.code)
        if (code === '200') {
          this.listData = data.data.redeem
        } else if (code === '500') {
          this.$message(data.message)
        }
      }).catch(errortip => {})
    }
  },
  mounted () {
    this.getRedeemList()
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
