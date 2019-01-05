<template>
  <div class="content">
    <div class="page-title">认证</div>
    <div class="content-block">
      <div class="search-block">
        <el-input
          class="search-line"
          placeholder="邮箱"
          v-model="email"
          clearable>
        </el-input>
        <el-select class="search-line" v-model="plateformStatus" clearable placeholder="平台审核状态">
          <el-option
            v-for="item in plateformList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <el-select class="search-line" v-model="serviceStatus" clearable placeholder="服务商认证状态">
          <el-option
            v-for="item in serviceList"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        <button class="search-btn" @click="getIdentificationList">搜索</button>
      </div>
      <!-- 列表信息 -->
      <div class="table-content">
        <table>
          <thead>
            <tr>
              <th class="text-position">申请人</th>
              <th>邮箱</th>
              <th>申请时间</th>
              <th>平台审核</th>
              <th>服务商认证</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item,index) in listData" :key="index">
              <td class="blueWord text-position">
                <router-link tag="span" :to="{ name: 'userDetail', query: { optionStyle: 'user',id:item.id }}">{{item.name}}</router-link>
                <!-- <router-link tag="span" :to="{ name: 'userDetail', query: { optionStyle: 'user' }}">werwefe</router-link> -->
              </td>
              <td>{{item.email}}</td>
              <td>{{item.created_at}}</td>
              <td>{{item.STATUS}}</td>
              <td v-if="item.is_pass=='N'">未提交</td>
              <td v-if="item.is_pass=='W'">认证中</td>
              <td v-if="item.is_pass=='Y'">认证成功</td>
              <td v-if="item.is_pass=='F'">认证失败</td>
              <td class="blueWord">
                <router-link tag="span" :to="{ name: 'userDetail', query: { optionStyle: 'check' ,id:item.id}}" v-if="item.STATUS=='待审核'&&item.is_pass=='N'">审核</router-link>
                <span v-if="item.STATUS=='审核通过'&&item.is_pass=='N'" @click="updateIndentification(item.id)">提交认证</span>
                <span v-if="item.STATUS=='审核通过'&&item.is_pass=='W'" @click="updateFromPt(item.KycId)">更新</span>
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
import {identificationList, submitKyc, updatePt} from 'api/kycAml'

export default {
  data () {
    return {
      choiceLeft: true,
      choiceRight: false,
      email: '',
      pageData: {
        currentPage: 1,
        pageSizes: [10, 20, 40, 60],
        pageSize: 10,
        total: null
      },
      plateformList: [{
        value: '未认证',
        label: '未认证'
      }, {
        value: '待审核',
        label: '待审核'
      }, {
        value: '不通过',
        label: '审核不通过'
      }, {
        value: '审核通过',
        label: '审核通过'
      }],
      plateformStatus: '',
      serviceList: [{
        value: 'N',
        label: '未认证'
      }, {
        value: 'W',
        label: '待审核'
      }, {
        value: 'F',
        label: '审核不通过'
      }, {
        value: 'Y',
        label: '审核通过'
      }],
      serviceStatus: '',
      listData: []

    }
  },
  components: {},
  methods: {
    handleSizeChange (val) {
      this.pageData.pageSize = val
      this.getIdentificationList()
      // console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      this.pageData.currentPage = val
      this.getIdentificationList()
      // console.log(`当前页: ${val}`)
    },
    // 获取列表
    getIdentificationList () { // email: this.email, isPass: this.plateformStatus, status: this.serviceStatus
      identificationList({pageNum: this.pageData.currentPage, numPerPage: this.pageData.pageSize, email: this.email, status: this.plateformStatus, isPass: this.serviceStatus}).then(response => {
        var data = response.data
        var code = String(data.code)
        if (code === '200') {
          this.listData = data.listData
          this.pageData.total = data.data.totalCount
          this.pageData.currentPage = data.data.pageNum
          // this.$router.push('/orderCheck')
          // this.$router.push({name: 'converFiatCheck', query: {memoData: data.data}})
        } else if (code === '500') {
          this.$message(data.message)
        }
      }).catch(errortip => {})
    },
    // 提交认证
    updateIndentification (val) {
      submitKyc({id: val}).then(response => {
        var data = response.data
        var code = String(data.code)
        if (code === '200') {
          this.getIdentificationList()
          this.$message(data.message)
        } else if (code === '500') {
          this.$message(data.message)
        }
      }).catch(errortip => {})
    },
    // 更新
    updateFromPt (val) {
      updatePt({KycId: val}).then(response => {
        var data = response.data
        var code = String(data.code)
        if (code === '200') {
          this.getIdentificationList()
          this.$message(data.message)
        } else if (code === '500') {
          this.$message(data.message)
        }
      }).catch(errortip => {})
    }

  },
  mounted () {
    this.getIdentificationList()
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
