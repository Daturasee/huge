var app = getApp();
Page({
  data: {
    bcolor1: '#fce564',
    color1: 'black',
    biter: [],//比特成员信息json
    showbiter: [],
    choosepop: [],
    choosegroups: '',
    hiddenLoading: false

  },


  checkboxChange: function (e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    var that = this
    this.data.choosepop = e.detail.value
    
  },
  onLoad: function () 
  {

      this.load()
  },
  load() 
  {
    
     
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
  querentianjia() {
    var that = this

    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

    let prevPage = pages[pages.length - 2];

    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。
   


      prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。

        fzmember: that.data.choosepop,
      })
     
    prevPage.data.project.department = that.data.choosepop,
    
   
    //上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。


    //最后就是返回上一个页面。

    wx.navigateBack({

      delta: 1  // 返回上一级页面。

    })


  }



})


