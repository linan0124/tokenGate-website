<template>
  <div class="content">
    <div class="page-title">
      <span @click="$router.go(-1)"></span>
      <router-link tag="div" class="user-detail-door word-color" :to="{ name: 'userDetail', query: { optionStyle: 'user',id:id }}">用户详情</router-link>
      <!-- <div class="user-detail-door word-color">用户详情</div> -->
      订单
    </div>

    <div class="content-block">
      <!-- 订单列表展示 -->
      <div class="convert-block" v-if="$route.query.operationType === '铸币'">
        <table>
          <tbody>
            <tr>
              <td class="user-order-list-color">订单ID</td>
              <td class="user-order-list-color">订单类型</td>
              <td class="user-order-list-color">币种</td>
              <td class="user-order-list-color">金额($)</td>
              <td class="user-order-list-color">申请时间</td>
              <td class="user-order-list-color">状态</td>
            </tr>
            <tr v-for="(item,index) in orderList" :key="index">
              <!-- 根据订单类型就行跳转 -->
              <!--  -->
              <td class="word-color">
                <router-link tag="span" :to="{ name: 'convertOrderDetail', query: { orderInfo: item.order_id }}">{{item.order_id}}</router-link>
              </td>
              <td>{{$route.query.operationType}}</td>
              <td>{{item.token_name}}</td>
              <td>{{item.order_amount}}</td>
              <td>{{item.created_at}}</td>
              <td>{{item.order_status}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="redeem-block" v-if="$route.query.operationType === '赎回'">
      <!-- 订单列表展示 -->
        <table>
          <tbody>
            <tr>
              <td class="user-order-list-color">订单ID</td>
              <td class="user-order-list-color">订单类型</td>
              <td class="user-order-list-color">币种</td>
              <td class="user-order-list-color">金额($)</td>
              <td class="user-order-list-color">申请时间</td>
              <td class="user-order-list-color">状态</td>
            </tr>
            <tr v-for="(item,index) in redeemList" :key="index">
              <!-- 根据订单类型就行跳转 -->
              <!--  -->
              <td class="word-color">
                <router-link tag="span" :to="{ name: 'redeemOrderDetail', query: { redeemId: item.redeem_id }}">{{item.redeem_id}}</router-link>
              </td>
              <td>{{$route.query.operationType}}</td>
              <td>{{item.token_name}}</td>
              <td>{{item.redeem_amount}}</td>
              <td>{{item.created_at}}</td>
              <td>{{item.redeem_status}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="page-info">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageData.currentPage"
          :page-sizes=pageData.pageSizes
          :page-size=pageData.pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total=pageData.total>
        </el-pagination>
      </div>
    </div>

  </div>
</template>

<script>
import {getUserList} from 'api/kycAml'
import {redeemList} from 'api/redeem'

export default {
  data () {
    return {
      pageData: {
        currentPage: 1,
        pageSizes: [10, 20, 40, 60],
        pageSize: 10,
        total: null
      },
      orderList: [],
      id: this.$route.query.id

    }
  },
  components: {},
  methods: {
    handleSizeChange (val) {
      this.pageData.pageSize = val
      this.getDate()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pageData.currentPage = val
      this.getDate()
      // console.log(`当前页: ${val}`)
    },
    userList () {
      getUserList({uid: this.$route.query.uid, pageNum: this.pageData.currentPage, numPerPage: this.pageData.pageSize}).then(response => {
        var data = response.data
        var code = String(data.code)
        if (code === '200') {
          this.orderList = data.listData
          this.pageData.total = data.data.totalCount
          this.pageData.currentPage = data.data.pageNum
        } else if (code === '500') {
          this.$message(data.message)
        }
      }).catch(errortip => {})
    },
    getRedeemList () {
      redeemList({uid: this.$route.query.uid, pageNum: this.pageData.currentPage, numPerPage: this.pageData.pageSize}).then(response => {
        var data = response.data
        var code = String(data.code)
        if (code === '200') {
          this.redeemList = data.listData
          this.pageData.total = data.data.totalCount
          this.pageData.currentPage = data.data.pageNum
        } else if (code === '500') {
          this.$message(data.message)
        }
      }).catch(errortip => {})
    },
    getDate () {
      if (this.$route.query.operationType === '铸币') {
        this.userList()
      } else {
        this.getRedeemList()
      }
    }
  },
  mounted () {
    this.getDate()
  }
}
</script>

<style lang="scss" scoped>
  .user-detail-door{
    width: 100px;
    float: right;
    font-size: 14px;
    line-height: 40px;
  }
  .word-color{
    color: #1164FF;
    cursor: pointer;
  }
  .content-block table{
    border: none;
  }
  .user-order-list-color{
    color: #8C98A4;
  }
  .content-block tbody tr{
    border-top: none;
    border-bottom: 1px solid #C7D1DB;
    text-align: left;
    height: 80px;
  }
  .page-info{
    float:right;
    margin-top:30px;
  }

</style>
