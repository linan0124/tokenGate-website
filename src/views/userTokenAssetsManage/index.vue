<template>
  <div class="content">
    <div class="page-title">用户持币资产管理</div>
    <div class="content-block">
      <div class="search-block">
        <!-- <el-date-picker
          class="search-line"
          v-model="applyTime"
          type="date"
          placeholder="交易时间">
         </el-date-picker> -->
        <el-input
          class="search-line"
          placeholder="用户名"
          v-model="userNames"
          clearable>
        </el-input>
        <button class="search-btn" @click="userListDate">搜索</button>
      </div>
      <!-- 列表信息 -->
      <div class="table-content">
        <table>
          <thead>
            <tr>
              <th class="text-position">用户名</th>
              <!-- 申请人修改为申请人邮箱 -->
              <th class="position-right">当前资金总估(USD)</th>
              <th class="position-right">铸币资金总估(USD)</th>
              <th class="position-right">赎回资金总估(USD)</th>
              <!-- <th class="position-right">成功订单量</th> -->
              <th class="position-right">铸币成功订单量</th>
              <th class="position-right">赎回成功订单量</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listData" :key="index">
              <td class="blueWord text-position">
                <router-link tag="span" :to="{ name: 'userTokenDetail', query: { uid: item.uid,username:item.userName,totalAmount:item.account }}">{{item.userName}}</router-link>
              </td>
              <td class="blueWord position-right">$ {{item.account | moneyFlat}}</td>
              <td class="redWord position-right">+ {{item.orderAmount | moneyFlat}}</td>
              <td class="greenWord position-right">- {{item.redeemAmount | moneyFlat}}</td>
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
import {userToken} from 'api/userTokenList'

export default {
  data () {
    return {
      pageData: {
        currentPage: null,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        total: null
      },
      userNames: '',
      listData: []

    }
  },
  components: {},
  methods: {
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageData.pageSize = val
      this.userListDate()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pageData.currentPage = val
      this.userListDate()
    },
    // 列表数据展示
    userListDate () {
      userToken({
        numPerPage: this.pageData.pageSize,
        pageNum: this.pageData.currentPage,
        userName: this.userNames
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
    this.userListDate()
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
</style>
