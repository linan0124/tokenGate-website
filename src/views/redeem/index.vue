<template>
  <div class="content">
    <div class="page-title">赎回</div>
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
        <button class="search-btn" @click="getRedeemList">搜索</button>
      </div>
      <!-- 列表信息 -->
      <div class="table-content">
        <table>
          <thead>
            <tr>
              <th class="text-position">订单ID</th>
              <th>申请人邮箱</th>
              <th>赎回币种</th>
              <th class="position-right">赎回金额($)</th>
              <th class="position-right">申请时间</th>
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in listData" :key="index">
              <td class="blueWord text-position">
                <router-link tag="span" :to="{ name: 'redeemOrderDetail', query: { optionStyle: 'user' ,redeemId:item.redeem_id}}">{{item.redeem_id}}</router-link>
              </td>
              <td class="blueWord">
                <router-link tag="span" :to="{ name: 'orderList', query: { uid:item.userId, id:item.id, operationType:'赎回' }}">{{item.email}}</router-link>
              </td>
              <td>{{item.token_name}}</td>
              <td class="position-right">{{item.redeem_amount}}</td>
              <td class="position-right">{{item.created_at}}</td>
              <td>
                <!-- 非赎回中操作 -->
                <span v-if="orderStatusList[index] != '赎回中'">{{orderStatusList[index]}}</span>
                <!-- 赎回中操作 -->
                <el-dropdown v-if="orderStatusList[index] === '赎回中' && dropdownStatus[index]" @command="handleCommand" trigger="click">
                  <span class="el-dropdown-link">
                    {{item.redeem_status}}<i class="el-icon-arrow-down el-icon--right"></i>
                  </span>
                  <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item @click.native="changeData(index, item.redeem_id)" command='{"showInfo": "赎回成功", "infoStatus": "settled"}'>赎回成功</el-dropdown-item>
                    <el-dropdown-item @click.native="changeData(index, item.redeem_id)" command='{"showInfo": "赎回失败", "infoStatus": "cancelled"}'>赎回失败</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </td>
              <td class="blueWord">
                <!-- 转账中/赎回中/销毁中/转账失败  更新   转账成功/赎回失败  代币赎回    赎回成功/销毁失败    代币销毁 -->
                <span v-if="orderStatusList[index] === '转账中'" @click="selectDisbursements(item.redeem_id)">更新</span>
                <span v-if="orderStatusList[index] === '赎回中'" @click="selectRansom(item.redeem_id)">更新</span>
                <span v-if="orderStatusList[index] === '销毁中'" @click="selectBurn(item.redeem_id)">更新</span>
                <span v-if="orderStatusList[index] === '转账成功' || orderStatusList[index] === '赎回失败'" @click="sureDisbursements(item.redeem_id)">代币赎回</span>
                <span v-if="orderStatusList[index] === '赎回成功' || orderStatusList[index] === '销毁失败'" @click="sureBrunToken(item.redeem_id)">代币销毁</span>
              </td>
            </tr>
          </tbody>
        </table>
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
  </div>
</template>

<script>
import {
  redeemList,
  updateRedeemStatus,
  selectRansom,
  selectDisbursements,
  disbursements,
  brunToken,
  selectBurn
} from 'api/redeem'

export default {
  data () {
    return {
      choiceLeft: true,
      choiceRight: false,
      orderID: '',
      plateformStatus: '',
      serviceList: [{
        value: 'TransferWaiting',
        label: '转账中'
      }, {
        value: 'applyTrue',
        label: '转账成功'
      }, {
        value: 'applyRepeat',
        label: '转账失败'
      }, {
        value: 'pending ',
        label: '赎回中'
      },
      {
        value: 'settled',
        label: '赎回成功'
      },
      {
        value: 'cancelled',
        label: '赎回失败'
      },
      {
        value: 'burnWaiting',
        label: '销毁中'
      },
      {
        value: 'burnTrue',
        label: '销毁成功'
      },
      {
        value: 'burnFalse',
        label: '销毁失败'
      }],
      serviceStatus: '',
      currentPage4: 4,
      applyTime: '',
      payStatus: '转账中',
      pageData: {
        currentPage: 1,
        pageSizes: [10, 20, 40, 60],
        pageSize: 10,
        total: null
      },
      listData: [],
      orderStatusList: [],
      dropdownStatus: [],
      changeStatusName: '',
      changeStatus: ''
    }
  },
  components: {},
  methods: {
    // 下拉事件
    handleCommand (command) {
      let json = JSON.stringify(command)
      let obj = JSON.parse(json)
      let commandObjs = JSON.parse(obj)
      this.changeStatusName = commandObjs.showInfo
      this.changeStatus = commandObjs.infoStatus
    },
    // 分页事件
    handleSizeChange (val) {
      this.pageData.pageSize = val
      this.getRedeemList()
    },
    // 分页事件
    handleCurrentChange (val) {
      this.pageData.currentPage = val
      this.getRedeemList()
    },
    // 获取列表
    getRedeemList () {
      redeemList({pageNum: this.pageData.currentPage,
        numPerPage: this.pageData.pageSize,
        redeemId: this.orderID,
        redeemStatus: this.serviceStatus,
        beginCreatedAt: this.applyTime ? this.applyTime[0] : '',
        endCreatedAt: this.applyTime ? this.applyTime[1] : '' }).then(response => {
        var data = response.data
        var code = String(data.code)
        this.orderStatusList = []
        this.dropdownStatus = []
        if (code === '200') {
          this.listData = data.listData
          this.pageData.total = data.data.totalCount
          this.pageData.currentPage = data.data.pageNum
          for (let i = 0; i < data.listData.length; i++) {
            this.orderStatusList.push(data.listData[i].redeem_status)
            this.dropdownStatus.push(true)
          }
        } else if (code === '500') {
          this.$message(data.message)
        }
      }).catch(errortip => {})
    },
    // 修改赎回状态
    changeData (index, redeemId) {
      this.sureChangePayStatus(index, redeemId)
    },
    // 确认修改赎回状态
    sureChangePayStatus (index, redeemId) {
      this.$confirm('此操作将对该订单的赎回状态进行修改?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.dropdownStatus.splice(index, 1, false)
        this.orderStatusList.splice(index, 1, this.changeStatusName)
        this.redeemStatusChange(redeemId)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 赎回中   主动修改状态操作
    redeemStatusChange (redeemId) {
      updateRedeemStatus({
        redeemId: redeemId,
        redeemStatus: this.changeStatus
      }).then(response => {
        if (Number(response.data.code) === 200) {
          this.getRedeemList()
        }
      }).catch(errortip => {})
    },
    // 赎回中   更新
    selectRansom (redeemId) {
      selectRansom({redeemId: redeemId}).then(response => {
        if (Number(response.data.code) === 200) {
          this.messageBox(response.data.message)
          this.getRedeemList()
        }
      }).catch(errortip => {})
    },
    // 转账中   更新
    selectDisbursements (redeemId) {
      selectDisbursements({redeemId: redeemId}).then(response => {
        if (Number(response.data.code) === 200) {
          this.messageBox(response.data.message)
          this.getRedeemList()
        }
      }).catch(errortip => {})
    },
    // 代币赎回   转账成功/赎回失败
    disbursements (redeemId) {
      disbursements({redeemId: redeemId}).then(response => {
        if (Number(response.data.code) === 200) {
          this.getRedeemList()
        }
      }).catch(errortip => {})
    },
    // 确认执行代币赎回
    sureDisbursements (redeemId) {
      this.$confirm('是否确认执行代币赎回操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.disbursements(redeemId)
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
    // 代币销毁操作
    brunToken (redeemId) {
      brunToken({redeemId: redeemId, password: 'foundation123456'}).then(response => {
        if (Number(response.data.code) === 200) {
          this.getRedeemList()
        }
      }).catch(errortip => {})
    },
    // 确认执行代币销毁
    sureBrunToken (redeemId) {
      this.$confirm('是否确认执行代币销毁操作?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.brunToken(redeemId)
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
    // 销毁中   更新
    selectBurn (redeemId) {
      selectBurn({redeemId: redeemId}).then(response => {
        if (Number(response.data.code) === 200) {
          this.messageBox(response.data.message)
          this.getRedeemList()
        }
      }).catch(errortip => {})
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
    this.getRedeemList()
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
