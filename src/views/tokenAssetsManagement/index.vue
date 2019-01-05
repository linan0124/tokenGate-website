<template>
  <div class="content">
    <div class="page-title">通证资产管理</div>
    <el-row :gutter="30">
      <el-col :span="12"><div class="grid-content bg-purple">
         <div class="bankAmount">银行账户总金额</div>
         <div class="bankAmountNumber">$ {{bankAmount |  moneyFlat}}</div>
      </div></el-col>
      <!-- <el-col :span="8"><div class="grid-content bg-purple">
         <div class="bankAmount">手续费余额</div>
         <div class="bankAmountNumber">$ {{bankAmount | NumFormat}}</div>
      </div></el-col> -->
      <el-col :span="12"><div class="grid-content bg-purple">
         <div class="bankAmount">通证总数量</div>
         <div class="bankAmountNumber">{{tokenAmount}}</div>
      </div></el-col>
    </el-row>

    <div class="content-block">
      <div class="search-block">
        <el-input placeholder="Token简称" v-model="currencyName" class="search-line apply-time"></el-input>
        <button class="search-btn" @click="getTokenList">搜索</button>
         <router-link tag="span" :to="{ name: 'addToken'}">
            <el-button type="primary" icon="el-icon-plus" class="fr addToken-btn">添加通证</el-button>
         </router-link>

      </div>
      <!-- 列表信息 -->
      <div class="table-content">
        <table>
          <thead>
            <tr>
              <th class="text-position">Token简称</th>
              <!-- 申请人修改为申请人邮箱 -->
              <th>Token全称</th>
              <th>合约地址</th>
              <th>锚定法币</th>
              <th>Token账户余额</th>
              <th>持有钱包地址数</th>
              <!-- <th>操作</th> -->
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listData" :key="index">
              <td class="blueWord text-position">
                <router-link tag="span" :to="{ name: 'tokenDetail', query: { tokenName: item.currency_name }}">{{item.currency_name}}</router-link>
              </td>
              <td>{{item.currency_fullname}}</td>
              <td>
                <el-tooltip placement="top">
                  <div slot="content">{{item.currency_contract}}</div>
                  <el-button>{{item.currency_contract | hideMiddle}}</el-button>
                </el-tooltip>
              </td>
              <td>{{item.currency_legal}}</td>
              <td>{{item.currency_number | moneyFlat}}</td>
              <td>{{item.currenyNum}}</td>
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
import {tokenList, tolalToken} from 'api/tokenAsstesList'

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
      bankAmount: '',
      tokenAmount: '',
      currencyName: ''
    }
  },
  components: {},
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageData.pageSize = val
      this.getTokenList()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pageData.currentPage = val
      this.getTokenList()
    },
    // 列表数据展示
    getTokenList () {
      tokenList({numPerPage: this.pageData.pageSize,
        pageNum: this.pageData.currentPage,
        currencyName: this.currencyName}).then(response => {
        let data = response.data
        if (Number(response.data.code) === 200) {
          this.listData = data.data.currencyInfoList
          this.pageData.total = data.data.pageView.totalCount
          this.pageData.currentPage = data.data.pageView.pageNum
          this.bankAmount = data.data.totalSum
          this.tokenAmount = data.data.totalCount
        }
      }).catch(errortip => {})
    }
  },
  filters: {
    hideMiddle (val) {
      return `${val.substring(0, 6)}....${val.substring(val.length - 6)}`
    }
  },
  mounted () {
    this.getTokenList()
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
    .addToken-btn{
      background: #1164FF;
      border:none;
      height: 40px;
    }
  }
  .page-info{
    float:right;
    margin-top:30px;
  }
//总量模块
 .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #9bf99a;
  }
  .bg-purple {
    height:160px;
    background: #ffffff;
    box-shadow:0px 0px 4px 0px rgba(0,0,0,0.1);
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .bankAmount{
    font-size: 14px;
    color: #8C98A4;
    text-align: center;
    padding-top: 40px;
  }
  .bankAmountNumber{
    font-size: 26px;
    color: #1E2021;
    text-align: center;
    margin-top: 20px;
    line-height: 37px;
  }
  .el-tooltip .el-button{
    border-color: #ffffff !important;
  }
</style>
