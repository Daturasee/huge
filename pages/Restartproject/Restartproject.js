// pages/Restartproject/Restartproject.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
 
   onLoad() {
    setTimeout(function () {
      wx.navigateBack({
        delta: 2
      })
    }, 1500)
  },
  back() {

    wx.navigateBack({
      delta: 2
    })

  }

})