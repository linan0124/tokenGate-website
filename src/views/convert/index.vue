<template>
  <div class="content">
    <div class="page-title">铸币</div>
    <div class="content-block">
      <div class="search-block">
        <el-input
          class="search-line"
          placeholder="订单ID"
          v-model="orderID"
          clearable>
        </el-input>
        <el-date-picker
          class="search-line apply-time"
          v-model="applyTime"
          format="yyyy-MM-dd"
          value-format="yyyy-MM-dd"
          type="daterange"
          range-separator="至"
          start-placeholder="申请开始时间"
          end-placeholder="申请结束时间">
        </el-date-picker>
        <el-select class="search-line" v-model="serviceStatus" clearable placeholder="订单状态">
          <el-option
            v-for="item in serviceList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <button class="search-btn" @click="convertListDate">搜索</button>
      </div>
      <!-- 列表信息 -->
      <div class="table-content">
        <table>
          <thead>
            <tr>
              <th class="text-position">订单ID</th>
              <!-- 申请人修改为申请人邮箱 -->
              <th>申请人邮箱</th>
              <th>铸币币种</th>
              <th class="position-right">铸币金额($)</th>
              <th class="position-right">申请时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in listData" :key="index">
              <td class="blueWord text-position">
                <router-link tag="span" :to="{ name: 'convertOrderDetail', query: { orderInfo: item.order_id }}">{{item.order_id}}</router-link>
              </td>
              <td class="blueWord">
                <router-link tag="span" :to="{ name: 'orderList', query: { uid:item.userId, id:item.id, operationType:'铸币' }}">{{item.email}}</router-link>
                <!-- <router-link tag="span" :to="{ name: 'userDetail', query: { optionStyle: 'user' }}">xiao wang</router-link> -->
              </td>
              <td>{{item.token_name}}</td>
              <td class="position-right">{{item.order_amount}}</td>
              <td class="position-right">{{item.created_at}}</td>
              <td>
                <!-- 非付款中展示 -->
                <span v-if="payStatusList[index] != '付款中'">{{payStatusList[index]}}</span>
                <!-- 付款中的操作 -->
                <!-- {{dropdownStatus[index]}} -->
                <el-dropdown @command="handleCommand" trigger="click" v-if="dropdownStatus[index] && payStatusList[index] === '付款中'">
                  <span class="el-dropdown-link">
                    {{payStatusList[index]}}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="changeData(index, item.order_id)" command='{"showInfo": "付款成功", "infoStatus": "settled"}'>付款成功</el-dropdown-item>
                    <el-dropdown-item @click.native="changeData(index, item.order_id)" command='{"showInfo": "付款失败", "infoStatus": "cancelled"}'>付款失败</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </td>
              <td class="blueWord">
                <!-- 付款中/发币中/转账中（刷新）  付款成功/发币失败（代币增发）  发币成功/转账失败（代币转账）-->
                <span v-if="payStatusList[index] === '付款中' && item.token_name === 'USDD'" @click="payPending(item.order_id)">刷新</span>
                <span v-if="payStatusList[index] === '发币中'" @click="getIssueTokenStatus(item.order_id)">刷新</span>
                <span v-if="payStatusList[index] === '转账中'" @click="selectTansferStatus(item.order_id)">刷新</span>
                <span v-if="payStatusList[index] === '付款成功' || payStatusList[index] === '发币失败'" @click="sureIssueToken(item.order_id)">代币增发</span>
                <span v-if="payStatusList[index] === '转账失败' || payStatusList[index] === '发币成功'" @click="sureTokenTransferFrom(item.order_id)">代币转账</span>
              </td>
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
import {
  convertList,
  changePayStatus,
  tryChangePayStatus,
  issueToken,
  getIssueTokenStatus,
  tokenTransferFrom,
  selectTansfer
} from 'api/convert'

export default {
  data () {
    return {
      pageData: {
        currentPage: null,
        pageSizes: [10, 20, 30, 40],
        pageSize: 10,
        total: null
      },
      orderID: '',
      serviceList: [{
        value: 'pending',
        label: '付款中'
      }, {
        value: 'settled',
        label: '付款成功'
      }, {
        value: 'cancelled',
        label: '付款失败'
      }, {
        value: 'issueWaiting',
        label: '发币中'
      }, {
        value: 'issueTrue',
        label: '发币成功'
      }, {
        value: 'issueFalse',
        label: '发币失败'
      }, {
        value: 'TransferWaiting',
        label: '转账中'
      }, {
        value: 'TransferSuccess',
        label: '转账成功'
      }, {
        value: 'TransferFalse',
        label: '转账失败'
      }],
      serviceStatus: '',
      applyTime: '',
      payStatusList: [],
      dropdownStatus: [],
      changeStatusName: '',
      listData: [],
      changeStatus: ''
    }
  },
  components: {},
  methods: {
    handleCommand (command) {
      let json = JSON.stringify(command)
      let obj = JSON.parse(json)
      let commandObjs = JSON.parse(obj)
      this.changeStatusName = commandObjs.showInfo
      this.changeStatus = commandObjs.infoStatus
    },
    changeData (index, orderId) {
      this.sureChangePayStatus(index, orderId)
    },
    handleSizeChange (val) {
      // console.log(`每页 ${val} 条`)
      this.pageData.pageSize = val
      this.convertListDate()
    },
    handleCurrentChange (val) {
      // console.log(`当前页: ${val}`)
      this.pageData.currentPage = val
      this.convertListDate()
    },
    // 列表数据展示
    convertListDate () {
      convertList({orderId: this.orderID,
        orderStatus: this.serviceStatus,
        beginCreatedAt: this.applyTime ? this.applyTime[0] : '',
        endCreatedAt: this.applyTime ? this.applyTime[1] : '',
        numPerPage: this.pageData.pageSize,
        pageNum: this.pageData.currentPage
      }).then(response => {
        let data = response.data
        this.payStatusList = []
        this.dropdownStatus = []
        if (Number(response.data.code) === 200) {
          this.listData = data.listData
          this.pageData.total = data.data.totalCount
          this.pageData.currentPage = data.data.pageNum
          for (let i = 0; i < data.listData.length; i++) {
            this.payStatusList.push(data.listData[i].order_status)
            this.dropdownStatus.push(true)
          }
        }
      }).catch(errortip => {})
    },
    // 付款中 刷新状态
    payPending (orderId) {
      changePayStatus({orderId: orderId}).then(response => {
        if (Number(response.data.code === 200)) {
          this.messageBox(response.data.message)
          this.convertListDate()
        }
      }).catch(errortip => {})
    },
    // 付款中 主动更改状态
    payStatusChange (orderId) {
      tryChangePayStatus({orderId: orderId, orderStatus: this.changeStatus}).then(response => {
        if (Number(response.data.code === 200)) {

        }
      }).catch(errortip => {})
    },
    // 代币增发
    issueToken (orderId) {
      issueToken({orderId: orderId, password: 'foundation123456'}).then(response => {
        if (Number(Number(response.data.code) === 200)) {
          this.messageBox(response.data.message)
          this.convertListDate()
        }
      }).catch(errortip => {})
    },
    // 发币中   刷新
    getIssueTokenStatus (orderId) {
      getIssueTokenStatus({orderId: orderId}).then(response => {
        if (Number(Number(response.data.code) === 200)) {
          this.messageBox(response.data.message)
          this.convertListDate()
        }
      }).catch(errortip => {})
    },
    // 代币转账
    tokenTransferFrom (orderId) {
      tokenTransferFrom({orderId: orderId, password: 'foundation123456'}).then(response => {
        if (Number(Number(response.data.code) === 200)) {
          this.convertListDate()
        }
      }).catch(errortip => {})
    },
    // 转账中   刷新
    selectTansferStatus (orderId) {
      selectTansfer({orderId: orderId}).then(response => {
        if (Number(Number(response.data.code) === 200)) {
          this.messageBox(response.data.message)
          this.convertListDate()
        }
      }).catch(errortip => {})
    },
    // 确认修改付款状态
    sureChangePayStatus (index, orderId) {
      this.$confirm('此操作将对该订单的付款状态进行修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dropdownStatus.splice(index, 1, false)
        this.payStatusList.splice(index, 1, this.changeStatusName)
        this.payStatusChange(orderId)
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 确认代币增发
    sureIssueToken (orderId) {
      this.$confirm('是否确认执行代币增发操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.issueToken(orderId)
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 确认代币转账
    sureTokenTransferFrom (orderId) {
      this.$confirm('是否确认执行代币转账操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.tokenTransferFrom(orderId)
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 信息提示
    messageBox (messages) {
      this.$alert(messages, '提示', {
        confirmButtonText: '确定',
        type: 'warning',
        callback: action => {
          // this.$message({
          //   type: 'info',
          //   message: `action: ${action}`
          // })
        }
      })
    }
  },
  mounted () {
    this.convertListDate()
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
