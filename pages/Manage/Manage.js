// pages/Manage/Manage.js
var app=getApp()
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    hiddenLoading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow:function()
  {
    var that = this
    wx.request({
      url: app.globalData.url + '/fuZeXiangMu',
      data: {
        name: app.globalData.name
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',// 默认值 
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
         
          showbiter: res.data
        })

      }
    })
  },

  onLoad: function (options) {
  var that=this
    wx.request({
      url: app.globalData.url + '/fuZeXiangMu',
      data: {
        name:app.globalData.name
      },
      method: 'GET',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',// 默认值 
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          hiddenLoading: !that.data.hiddenLoading,
           showbiter: res.data
        })
      
      }
    })

  },


  gotoedit(e){
  
    var json = JSON.stringify(e.currentTarget.dataset.item);
    wx.navigateTo({
      
      url: '../Editingproject/Editingproject?json=' + json,
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })

  },
  createnewproject(){
    wx.navigateTo({
      url: '../Createproject/Createproject',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  }
})