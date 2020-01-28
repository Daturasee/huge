var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectData: ['调研中', '设计中', '开发中', '测试中', '已暂停'],//下拉列表的数据
    showprojectStatus: false, //判断是否弹出登录
    index: 0,//选择的下拉列表下标
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    project: {
      status: '调研中',
      projectname: '',
      department: '',
      product: '',
      program: '',
      design: '',
      introduction: '',
      starttime: '',
    },

  },

  optionTap(e) { // 下拉列表

    this.showprojectStatus()
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show,
    });
    var s = this.data.selectData[Index]
    this.setData({
      status: s
    })
    this.data.project.status = s  //选定的项目状态赋值
  


  },
  onLoad: function (options) {
   this.setData(
     {
       status:"调研中"  //默认前端状态显示为调研中
     }
   )
  },

  showprojectStatus() {//判断是否弹出登录
    var that = this
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

  addchanping() {   //Addpop会将选定的成员设置为this.data.project.product 也会将前端视图层的cpmember刷新
    console.log("添加产品")
    wx.navigateTo({
      url: "../Addpop/Addpop?&groups=1",
    })
  },
  addchengxu() {//Addpop会将选定的成员设置为this.data.project.program 也会将前端视图层的cxmember刷新
    console.log("添加程序")
    wx.navigateTo({
      url: "../Addpop/Addpop?&groups=2",
    })
  },
  addsheji() {//Addpop会将选定的成员设置为this.data.project.desig 也会将前端视图层的sjmember刷新
    console.log("添加设计")
    wx.navigateTo({
      url: "../Addpop/Addpop?&groups=3",
    })
  },
  createproject(e) {
    var that = this
    var n=0  //判断输入是否符合规范
    this.data.project.starttime = e.detail.value.sy + "-" + e.detail.value.sm + "-" + e.detail.value.sd //组合开始时间
    if (e.detail.value.projectname == '') {
      console.log("项目名为空")
      ++n
    }
    if (e.detail.value.sy == '' || e.detail.value.sm == '' || e.detail.value.sd == '') {
      console.log("开始时间为空")
      ++n
    }
    if (e.detail.value.sy < 0 || e.detail.value.sm > 12 || e.detail.value.sm < 0 || e.detail.value.sd > 31 || e.detail.value.sd < 0) {
      console.log("输入时间不符合规范")
      ++n
    }
    if (e.detail.value.department == '') {
      console.log("负责人为空")
      ++n
    }
    if (this.data.project.product == '') {
      console.log("产品组为空")
      ++n
    }
    if (this.data.project.program == '') {
      console.log("程序组为空")
      ++n
    }
    if (this.data.project.design == '') {
      console.log("设计组为空")
      ++n
    }
    if (e.detail.value.introduction=='')
     {
      console.log("项目介绍为空")
      ++n
    }
   
    
if(n==0)  //输入符合规范

      {
 
  console.log("新建编辑")
  console.log(this.data.project.status)
  console.log(e.detail.value.projectname)
  console.log(that.data.project.department)
  console.log(e.detail.value.introduction)
  console.log(this.data.project.product)
  console.log(this.data.project.program)
  console.log(this.data.project.design)
  console.log(this.data.project.starttime)
        
        wx.request({
          url: app.globalData.url + '/xinJianXiangMu',
        data: {
          status: that.data.project.status,
          projectname: e.detail.value.projectname,
          department: that.data.project.department,
          product: that.data.project.product,
          program: that.data.project.program,
          design: that.data.project.design,
          introduction: e.detail.value.introduction,
          starttime: that.data.project.starttime,

          finishtime: that.data.project.starttime,
        },
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          wx.navigateTo({
            url: '../Createsuccess/Createsuccess',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
          })

        },
      })}
else
{
  wx.showToast({
    image: '/image/exclamation.png',
    title: '请仔细核对'
  }) 
}

      
    }
   
  ,

})