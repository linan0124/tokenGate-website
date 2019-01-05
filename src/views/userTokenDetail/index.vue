<template>
  <div class="content">
    <div class="page-title"><span @click="$router.go(-1)"></span>个人资产详情</div>
    <div class="content-block">
      <div class="search-block clearfix">
          <div class="userName fl">{{userName}}</div>
          <div class="fl currentBox">
              <span class="currentAssetTitle">当前资产总估：</span>
              <span class="currentAssetNumber">{{totalAmount | moneyFlat}} USD</span>
          </div>
      </div>
      <!-- 列表信息 -->
      <div class="table-content">
        <table>
          <thead>
            <tr>
              <th class="">Token简称</th>
              <!-- 申请人修改为申请人邮箱 -->
              <th class="position-right">当前资金总估(USD)</th>
              <th class="position-right">Token账户余额</th>
              <!-- <th class="position-right">成功订单量</th> -->
              <th class="position-right">铸币成功订单量</th>
              <th class="position-right">赎回成功订单量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listData" :key="index">
              <td class="blueWord">
                <router-link tag="span" :to="{ name: 'tokenDetail', query: { tokenName: item.token_name }}">{{item.token_name}}</router-link>
              </td>
              <td class="position-right">$ {{item.token_amount | moneyFlat}}</td>
              <td class="redWord position-right">+ {{item.currency_number | moneyFlat}}</td>
              <!-- <td class="position-right">{{item.order_amount}}</td> -->
              <td class="position-right">{{item.coinNum}}</td>
              <td class="position-right">{{item.redeemNum}}</td>
            </tr>
          </tbody>
        </table>

        <div class="page-info">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="pageData.currentPage"
            :page-sizes="pageData.pageSizes"
            :page-size="pageData.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="pageData.total">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {userTokenDetail} from 'api/userTokenList'

export default {
  data () {
    return {
      pageData: {
        currentPage: null,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        total: null
      },
      listData: [],
      userName: this.$route.query.username,
      totalAmount: this.$route.query.totalAmount
    }
  },
  components: {},
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageData.pageSize = val
      this.getUserTokenDetail()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pageData.currentPage = val
      this.getUserTokenDetail()
    },
    // 列表数据展示
    getUserTokenDetail () {
      userTokenDetail({
        uid: this.$route.query.uid,
        numPerPage: this.pageData.pageSize,
        pageNum: this.pageData.currentPage
      }).then(response => {
        let data = response.data
        if (Number(response.data.code) === 200) {
          this.listData = data.listData
          this.pageData.total = data.data.totalCount
          this.pageData.currentPage = data.data.pageNum
        }
      }).catch(errortip => {})
    }

  },
  mounted () {
    this.getUserTokenDetail()
  }
}
</script>

<style lang="scss" scoped>
  .search-block{
    height:80px;
    .search-line{
      width:200px;
      height:40px;
      float:left;
      margin-right:20px;
    }
    .apply-time{
      width:300px;
    }
    .search-btn{
      width:120px;
      height:40px;
      float:left;
      background: #1164FF;
      border-radius: 3px;
      border:none;
      color:#fff;
      outline:none;
      cursor: pointer;
    }
  }
  .page-info{
    float:right;
    margin-top:30px;
  }
  .userName{
      font-size: 18px;
      color: #1E2021;
  }
  .currentBox{
      margin-left: 140px;
  }
  .currentAssetTitle{
      font-size: 14px;
      color: #8C98A4;
  }
  .currentAssetNumber{
      font-size: 18px;
      color: #EB0000;
  }
</style>
