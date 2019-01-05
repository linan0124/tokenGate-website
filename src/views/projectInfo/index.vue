<template>
<div>
  <!-- <div :html="htmlUrl"></div> -->
  <!-- <!DOCTYPE html> -->
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <!-- Bootstrap core CSS     -->
    <link href="../../../static/css/bootstrap.min.css" rel="stylesheet" />

    <!--  Material Dashboard CSS    -->
    <link href="../../../static/css/material-dashboard.css" rel="stylesheet"/>

    <!--     Fonts and icons     -->
    <link href="../../../static/css/font-awesome.min.css" rel="stylesheet">
    <link href='../../../static/css/2d7207a20f294df196f3a53cae8a0def.css' rel='stylesheet' type='text/css'>
  </head>
  <body>
    <div class="wrapper">
      <div class="main-panel" style="width: 100%">
        <div class="content">
         <div class="container-fluid">
           <div class="row">
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                  <div class="card-header" data-background-color="orange">
                    <i class="material-icons">content_copy</i>
                  </div>
                  <div class="card-content">
                    <p class="category">注册人数</p>
                    <h3 class="title" id="countRegester"> <small>人</small></h3>
                  </div>
                </div>
              </div>

              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                  <div class="card-header" data-background-color="green">
                    <i class="material-icons">store</i>
                  </div>
                  <div class="card-content">
                    <p class="category">激活人数</p>
                    <h3 class="title" id="activiteRegester"></h3>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                  <div class="card-header" data-background-color="red">
                    <i class="material-icons">info_outline</i>
                  </div>
                  <div class="card-content">
                    <p class="category">kyc提交人数</p>
                    <h3 class="title" id="kyc_user"></h3>
                  </div>
                </div>
              </div>
              <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="card card-stats">
                  <div class="card-header" data-background-color="blue">
                    <i class="fa fa-twitter"></i>
                  </div>
                  <div class="card-content">
                    <p class="category">kyc通过人数</p>
                    <h3 class="title" id="kyc_userPass"></h3>
                  </div>
                </div>
              </div>
            </div>
     </div>
  </div>

        <div class="col-md-12">
            <div class="card card-plain">
                <!-- <div class="card-header" data-background-color="purple">
                    <h4 class="title">Table on Plain Background</h4>
                    <p class="category">Here is a subtitle for this table</p>
                </div> -->
                <div class="card-content table-responsive">
                    <table class="table table-hover">
                      <tr style="height: 60px;">
                        <th>序号</th>
                        <th>邮箱</th>
                        <th>是否激活</th>
                        <th>KYC状态</th>
                        <th>用户创建时间</th>
                        <th>KYC提交时间</th>
                      </tr>
                      <tbody class = "pagination1">

                      </tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>

  </body>
  </html>
</div>
</template>
<script>

// import {login} from 'api/login'
// import {setToken} from 'util/auth'

export default{
  data () {
    return {
      // htmlUrl: '../../../static/table.html'
    }
  },
  methods: {
    getData () {
      $.ajax({
        type: 'get',
        url: 'https://daocoin.money/user/get_alluserInfo',
        async: true,
        success: function (res) {
          var dataList = res.data.listData
          var str = ''
          for (var i = 0; i < dataList.length; i++) {
            var kycCreattime = dataList[i].kyc_creattime
            if (kycCreattime === 'undefined' || kycCreattime === undefined) {
              kycCreattime = ''
            }
            str = str + '<tr>' +
                '<td>' + (i + 1) + '</td>' +
                '<td>' + dataList[i].email + '</td>' +
                '<td>' + dataList[i].is_activation + '</td>' +
                '<td>' + dataList[i].is_passkyc + '</td>' +
                '<td>' + dataList[i].user_creattime + '</td>' +
                '<td>' + kycCreattime + '</td>' +
                '</tr>'
          }
          $('.pagination1').append(str)
          $('#countRegester').html(res.data.mapData.countRegester + '  ')
          $('#activiteRegester').html(res.data.mapData.activiteRegester + '  ')
          $('#kyc_user').html(res.data.mapData.kyc_user + '  ')
          $('#kyc_userPass').html(res.data.mapData.kyc_userPass + '  ')
        }

      })
    }
  },
  mounted () {
    // window.open('../../../static/table.html', '_self')
    this.getData()
  }

}
</script>

<style lang="scss" scoped>
  .wrapper{
    background: #ffffff;
    height: auto;
  }
  .main-panel > .content{
    min-height: auto;
    padding-top: 30px;
  }
  th{
    text-align: center;
  }
</style>
