var app = getApp();
Page({
  data: {
    showDialog: false,
    bcolor1: '',
    bcolor2: '',
    bcolor3: '',
    color1: '',
    color2: '',
    color3: '',
    biter: [],//比特项目信息json


  },

 
  onLoad: function () {
 
    if (app.globalData.studentNo == "TuanDuiZhuGuan")   // 判断团队主管
      this.setData({
        zhuguan: 1
      })
    else
      this.setData({
        zhuguan: 0
      })
    var that = this
    wx.request({   
      url: app.globalData.url + '/zhengJinXingXiangMu',
      data: {

      },
      method: 'GET',
      header: {
        'content-type': 'application/json;charset=utf-8',
      },
      success: function (res) {
        that.setData({
          
          color1: 'white',
          color2: '#c4bebe',
          color3: '#c4bebe',
          bcolor1: '#ffdd11',
          bcolor2: 'none',
          bcolor3: 'none',

        })
        console.log(res.data)
        that.data.biter = res.data        // 将接受信息赋值比特json 
        that.shuaxin(); // 调用视图层显示函数 

      }
    })
  },
  btnclick: function (e) {
    var id = e.target.id
    this.load(id)

  },
  load(id) {
    if (id == '正进行项目') {
      console.log("选择了正进行项目")
      var that = this
      wx.request({
        url: app.globalData.url + '/zhengJinXingXiangMu',
        data: {
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',// 默认值 
        },
        success: function (res) {
          that.data.biter = res.data
          that.shuaxin();
          that.setData({
            color1: 'white',
            color2: '#c4bebe',
            color3: '#c4bebe',
            bcolor1: '#ffdd11',
            bcolor2: 'none',
            bcolor3: 'none',

          })
        }
      })
    }
    else if (id == '已完成项目') {
      this.data.deletegroups = "已完成项目"
      console.log("选择了已完成项目")
   
      var that = this
      wx.request({
        url: app.globalData.url + '/yiWanChengXiangMu',
        data: {
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',// 默认值 
        },
        success: function (res) {
          that.setData({
            color1: '#c4bebe',
            color2: 'white',
            color3: '#c4bebe',
            bcolor1: 'none',
            bcolor2: '#ffdd11',
            bcolor3: 'none',
          });
          that.data.biter = res.data
          that.shuaxin();

        }
      })

    }
    else{
      this.data.deletegroups = "已暂停项目"
      console.log("选择了已暂停项目")
      
      var that = this
      wx.request({
        url: app.globalData.url + '/yiZanTingXiangMu',
        data: {
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',// 默认值 
        },
        success: function (res) {
          that.setData({
            color1: '#c4bebe',
            color2: '#c4bebe',
            color3: 'white',
            bcolor1: 'none',
            bcolor2: 'none',
            bcolor3: '#ffdd11',
          });
          that.data.biter = res.data
          that.shuaxin();
        }
      })
    }
    

  },
  shuaxin() {  //拆分传入信息显示至视图层
 

  var that=this
    this.setData({

  
      showbiter: that.data.biter,//更新至视图层

    })
  },
  showprojectinfo(e)
  {
    var i
   
      var program = e.currentTarget.dataset.item.program
      var pro = new Array(); //定义一数组 
      pro = program.split("#"); //字符分割 
   
     
  
   
    var product = e.currentTarget.dataset.item.product
      var prod = new Array(); //定义一数组 
      prod = product.split("#"); //字符分割 
  
  
   
    var design = e.currentTarget.dataset.item.design
      var des = new Array(); //定义一数组 
      des = design.split("#"); //字符分割 
  
  
    this.toggleDialog()
   
      
    this.setData({
      product:prod,
      design:des,
      program:pro,
    projectname: e.currentTarget.dataset.item.projectname,
    starttime: e.currentTarget.dataset.item.starttime,
      finishtime: e.currentTarget.dataset.item.finishtime,
    introduction: e.currentTarget.dataset.item.introduction

    
  })

    if (e.currentTarget.dataset.item.status != "已上线") {
      console.log("项目已上线")
      this.setData({
        finishtime: '至今',
      })
    }
  },
  toggleDialog() {//是否弹出项目简介
  var that=this
    this.setData({
      showDialog: !that.data.showDialog,
     
     
    });

  },




 
})


