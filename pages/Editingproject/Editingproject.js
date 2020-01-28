// pages/Editingproject/Editingproject.js
var app = getApp();
 var json
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectData: ['调研中', '设计中', '开发中', '测试中','已暂停'],//下拉列表的数据
    showprojectStatus: false, //判断是否弹出登录
    index: 0,//选择的下拉列表下标
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    project: {
    id:'',
    status: '',
    projectname: '',
    department :'',
    product :'',
    program :'',
    design :'',
    introduction : '',
    starttime : '',
    finishtime : ''},



    cx:"",//暂存json的程序成员
    cp: "",//暂存产品的程序成员
    sj: ""//暂存设计的程序成员

  },
 
  optionTap(e) { // 显示状态信息
    this.setData({
      yizanting: 0  //将修改的状态至前端显示
    })
    this.showprojectStatus()   
    let Index = e.currentTarget.dataset.index;
    this.setData({
      index: Index,
      show: !this.data.show,
    });
    var s = this.data.selectData[Index]
    console.log(s == "已暂停")
   
   
      this.data.project.status = s 
    this.setData({
      status:s  //将修改的状态至前端显示
    })
     //将data中的status修改

  

   
  },
  onLoad: function (options) {

    json = JSON.parse(options.json) //接收前端传来的json
    console.log("传入的json为")
    console.log(json)
    this.data.cx=json.program   //暂存程序
    this.data.cp=json.product   //暂存产品
    this.data.sj=json.design    //暂存设计

    var i
    for (i in json) {
      var chanpingpop = json.product
      var cp = new Array(); //定义一数组 
      cp = chanpingpop.split("#"); //字符分割 
     
    }
    for (i in json) {
      var chengxupop = json.program
      var cx = new Array(); //定义一数组 
      cx = chengxupop.split("#"); //字符分割 

    }
    for (i in json) {
      var shejipop = json.design
      var sj = new Array(); //定义一数组 
      sj = shejipop.split("#"); //字符分割 

    }
    for (i in json) {
      var stime = json.starttime
      var starttime = new Array(); //定义一数组 
      starttime = stime.split("-"); //字符分割 
    

    }
    this.setData(
      {
        sy: starttime[0], //刷新至视图层显示开始年份
        sm: starttime[1],//刷新至视图层显示开始月份
        sd: starttime[2],//刷新至视图层显示开始天
      }
    )

    for (i in json) {
      var ftime = json.finishtime
      var finishtime = new Array(); //定义一数组 
      finishtime = ftime.split("-"); //字符分割 
    }
    this.setData(
      {
        fy: finishtime[0],//刷新至视图层显示完成年份
        fm: finishtime[1],//刷新至视图层显示完成月份
        fd: finishtime[2],//刷新至视图层显示完成天
      }
    )
    if (json.status == "已暂停")
      this.setData({
        yizanting: 1
      })
    if (json.status != "已上线")
      this.setData({
        yishangxian: 1
      })

    this.setData({ //将json传来的上面剔除符号后的字符赋值给视图层
       projectname:json.projectname,
      fzmember: json.department,
       cpmember: cp,  
       cxmember:cx,
       sjmember:sj,
       status: json.status,
       introduction: json.introduction,
       finishtime:json.finishtime,
       starttime: json.starttime,
     
     })
    this.data.project=json  //将传来的json数据赋值给data
    

  },

  showprojectStatus() {  //显示项目状态
    var that=this
   
    this.setData({
      showprojectStatus: !that.data.showprojectStatus,

    });

  },
  addfuzeren() {  //Apppo会将添加的产品成员赋值给data的product 和刷新至视图层
    console.log("添加产品")
    wx.navigateTo({
      url: "../Depart/Depart",
    })
  },
 
  addchanping() {  //Apppo会将添加的产品成员赋值给data的product 和刷新至视图层
    console.log("添加产品")
    wx.navigateTo({
      url: "../Addpop/Addpop?&groups=1",
    })
  },
  addchengxu() {  //同理
    console.log("添加程序")
    wx.navigateTo({
      url: "../Addpop/Addpop?&groups=2",
    })
  },
  addsheji() {//同理
    console.log("添加设计")
    wx.navigateTo({
      url: "../Addpop/Addpop?&groups=3",
    })
  },
  finish()
  { 
    var that = this
    wx.showModal({
      title: '',
      content: '是否上线项目',
      success(res) {
        if (res.confirm) {

          that.data.project.status = "已上线"
          console.log("项目上线")
          console.log(json.projectname)
          console.log(json.department)
          console.log(json.introduction)
          console.log(json.starttime)
          console.log(json.finishtime)
          console.log(json.id)
          console.log(that.data.project.status)
          console.log(that.data.cp)
          console.log(that.data.cx)
          console.log(that.data.sj)

          wx.request({
            url: app.globalData.url + '/xiangMuWanCheng',
            data: {
              id: json.id,
              status: that.data.project.status,
              projectname: json.projectname,
              department: json.department,
              product: that.data.cp,
              program: that.data.cx,
              design: that.data.sj,
              introduction: json.introduction,
              starttime: json.starttime,
              finishtime: json.finishtime
            },
            method: 'POST',
            header: {
              'content-type': 'application/json;charset=UTF-8' // 默认值
            },
            success(res) {
              wx.navigateTo({
                url: '../Restartproject/Restartproject',
                success: function (res) { },
                fail: function (res) { },
                complete: function (res) { },
              })
            },
          })

        } else if (res.cancel) {
          console.log('取消上线')
        }
      }
    })
   
 
  },
  saveproject(e){ //保存项目
    var starttime = e.detail.value.sy + "-" + e.detail.value.sm + "-" + e.detail.value.sd //组合开始时间
    var finishtime = e.detail.value.fy + "-" + e.detail.value.fm + "-" + e.detail.value.fd //组合完成时间
    var that = this
    var n = 0 //判断是否符合规范的变量
      if (e.detail.value.projectname == '') {
        console.log("项目名为空")
        n++
      }
      if (e.detail.value.department== '') {
        console.log("负责人为空")
        n++
      }
      if (e.detail.value.introduction == '') {
        console.log("项目介绍为空")
        n++
      }

      if (this.data.project.program == '') {
        console.log("程序为空")
        n++
      }
      if (this.data.project.product == '') {
        console.log("产品为空")
        n++
      }
      if (this.data.project.design == '') {
        console.log("设计为空")
        n++
      }
    if (e.detail.value.sy == '' || e.detail.value.sm == '' || e.detail.value=='') {
      console.log("开始时间为空")
      n++
    }
      if (n == 0)
      {
        
        
        console.log("项目编辑")
        console.log('项目id'+this.data.project.id)
        console.log('项目状态'+this.data.project.status)
        console.log('项目名称' +e.detail.value.projectname)
        console.log('项目负责人' +this.data.project.department,)
        console.log('项目描述' +e.detail.value.introduction)
        console.log('产品' +this.data.project.product)
        console.log('程序' +this.data.project.program)
        console.log('设计'+this.data.project.design)
        console.log(starttime)
        console.log(finishtime)
  
    wx.request({
      url: app.globalData.url + '/xiuGaiXiangMu',
      data: {
        id: that.data.project.id,
        status: that.data.project.status,
        projectname: e.detail.value.projectname,
        department: that.data.project.department,
        product: that.data.project.product,
        program: that.data.project.program,
        design: that.data.project.design,
        introduction: e.detail.value.introduction,
        starttime: starttime,
        finishtime: finishtime
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8' // 默认值
      },
      success(res) {
        wx.navigateBack({
          delta: 1
        })
        wx.showToast({
          
          title: '修改成功'
        }) 
      
      },
    })
        
      }
      else
      {
        wx.showToast({
          image: '/image/exclamation.png',
          title: '请核对'
        }) 
      }
   
  
  },
  
 
})