var app = getApp();
Page({
  data: {
    bcolor1: '#fce564',
    color1: 'black',
    biter: [],//比特成员信息json
    showbiter: [],
    choosepop:[],
    choosegroups:'',
    hiddenLoading:false
  
  },


  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
     var that=this
    if(e.detail.value.length>3)
    {
 
      wx.showToast({
        image: '/image/exclamation.png',
        title: '最多选择三人'
      })
      
      that.data.choosepop = [e.detail.value[0], e.detail.value[1], e.detail.value[2]]

     
    }
    else{
      this.data.choosepop = e.detail.value
    }
  },
  onLoad: function (option) {
    var that = this
 
    this.data.choosegroups = option.groups 
    if (option.groups==1)
    { that.setData({
        showgroups:"产品组"
     })
      this.load('产品组')
    }
    else if (option.groups == 2)
    {


      that.setData({
        showgroups: "程序组"
      })
      this.load('程序组')
    }
   else if (option.groups == 3)
   {


      that.setData({
        showgroups: "设计组"
      })
      this.load('设计组')
    }
    
  },

  load(id) {
    if (id == '产品组') {
      console.log("选择了产品组")
      var that = this
      wx.request({
        url: app.globalData.url + '/chanPinChengYuan',
        data: {
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',// 默认值 
        },
        success: function (res) {
          that.setData({
            hiddenLoading: !that.data.hiddenLoading,
          })
          console.log(res.data)
          that.data.biter = res.data
          that.shuaxin();
       
        }
      })
    }
    else if (id == '程序组') {
      console.log("选择了程序组")
  
      var that = this
      wx.request({
        url: app.globalData.url + '/chengXuChengYuan',
        data: {
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',// 默认值 
        },
        success: function (res) {
          that.setData({
            hiddenLoading: !that.data.hiddenLoading,
          })
          that.data.biter = res.data
          that.shuaxin();

        }
      })

    }
    else if (id == '设计组') {
      console.log("选择了设计组")
   
  
      var that = this
      wx.request({
        url: app.globalData.url + '/sheJiChengYuan',
        data: {
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',// 默认值 
        },
        success: function (res) {
          that.setData({
            hiddenLoading: !that.data.hiddenLoading,
          })
          that.data.biter = res.data
          that.shuaxin();
        }
      })
    }
  

  },
  shuaxin() {  //拆分传入信息显示至视图层
    var that = this
    var i
    for (i in this.data.biter) {
      var tag = this.data.biter[i].tags
      var t = new Array(); //定义一数组 
      t = tag.split("#"); //字符分割 
      this.data.biter[i].tags = t
    }
    for (i in this.data.biter) {
      if (this.data.biter[i].projecting == "")
        this.data.biter[i].num = 0;
      else {
        var ping = this.data.biter[i].projecting
        var h = new Array(); //定义一数组 
        h = ping.split("#"); //字符分割 
        this.data.biter[i].num = h.length
      }
    }
    i = 0

  

    this.setData({

      showbiter: that.data.biter,//更新至视图层

    })
  },
  querentianjia()
  { 
    var that=this

    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

    let prevPage = pages[pages.length - 2];

    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
    if (this.data.choosegroups == 1)
    {

    
    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

      cpmember : that.data.choosepop,
    })
      var cp = that.data.choosepop.join('#');
      prevPage.data.project.product =cp
    }
    else if (this.data.choosegroups == 2)
    {
      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

        cxmember: that.data.choosepop,


      })
      var cx = that.data.choosepop.join('#');
      prevPage.data.project.program = cx
    }
    else 
     { prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

        sjmember: that.data.choosepop,


      })
      var sj = that.data.choosepop.join('#');
      prevPage.data.project.design = sj
     }
    //上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。


    //最后就是返回上一个页面。

    wx.navigateBack({

      delta: 1  // 返回上一级页面。

    })

 
  }



})


