var app=getApp();
var _animation; // 动画实体
var _animationIndex = 0; // 动画执行次数index（当前执行了多少次）
var _animationIntervalId = -1; //动画定时任务id，通过setInterval来达到无限旋转，记录id，用于结束定时任务
var _animationIndex2 = 0; 
var _animationIntervalId2 = -1; 
const _ANIMATION_TIME = 1800; // 动画播放一次的时长ms
Page({
  data: {
    hiddenLoading:true,//loading动画
    logonorinfo:'登录',//登录或者个人信息
    openLoginPage:false , //判断是否弹出登录界面
    animation: '',
    animation2: '',
  },
  onLoad: function (options) {
     console.log('进入首页')
  },
  onReady: function () {
    _animationIndex = 0;
    _animationIntervalId = -1;
    this.data.animation = ''; 
    this.startAnimationInterval()
    this.startAnimationInterval2()
  },
  onShow: function () {
    _animation = wx.createAnimation({
      duration: _ANIMATION_TIME,
      timingFunction: 'linear', //"linear","ease","ease-in","ease-in-out","ease-out","step-start","step-end"
      delay: 0,
      transformOrigin: '50% 50% 0'
    })
  },
  doLogin_OR_Info:function(){ //打开登录或个人信息界面
    if (app.globalData.studentNo==null)
    {console.log('选择登录')
      this.toggleLogin();
    }
    else
    {
      console.log('选择个人中心')
      wx.navigateTo({
        url: '../Center/Center',
      })
    }
  },
  jumpInfo:function(){
    console.log("选择比特成员功能")     //进入比特成员
    
    if (app.globalData.studentNo == null)
     {
      wx.showToast({
        image: '/image/exclamation.png',
        title: '请先登录'
      }) 
     }
     else{
      wx.navigateTo({
        url: '../Bitpeople/Bitpeople',
      })
     }
  },
  jumpView: function () {             //进入项目概览
    console.log("选择项目概览功能")
    if (app.globalData.studentNo == null) {
      wx.showToast({
        image: '/image/exclamation.png',
        title: '请先登录'
      })
    }
    else {
      wx.navigateTo({
        url: '../ProjectOverview/ProjectOverview',
      })
    }
  },
  jumpManage: function () {           //进入成员管理
    console.log("选择项目管理功能")
    if (app.globalData.studentNo == null) {
      wx.showToast({
        image: '/image/exclamation.png',
        title: '请先登录'
      })
    }
    else if(app.globalData.groups!="产品组")
    {
      wx.showToast({
        image: '/image/exclamation.png',
        title: '无权限'
      })
    }
    else {
      wx.navigateTo({
        url: '../Manage/Manage',
      })
    }
  },
  toggleLogin:function() { //打开登录面板
    this.setData({
      openLoginPage: !this.data.openLoginPage,
    });

  },
  onUserLogin:function(e){
    var that = this;
    if (e.detail.value.studentNo == ''&& e.detail.value.studentPwd=='')
    {
      wx.showToast({
        image: '/image/exclamation.png',
        title: '请核对'
      })
      console.log("输格式有误")
    }
   else{
      this.setData({
        hiddenLoading:false,
      })
  wx.request({
    url: app.globalData.url + '/login', 
      data: {
        studentNo: e.detail.value.studentNo,
        studentPwd: e.detail.value.studentPwd
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' 
      },
      success(res) {
        if (res.data.id != null) {
          that.setData({
            hiddenLoading: true,
          })
          app.globalData.studentNo=res.data.number//将返回的学生的学号赋值给全局变量
          app.globalData.name = res.data.name//将返回的学生的学号赋值给全局变量
          app.globalData.id = res.data.id//将返回的学生的id赋值给全局变量
          app.globalData.groups = res.data.groups//将返回的学生的id赋值给全局变量
           console.log("登陆成功")
            wx.showToast({
              title: '登录成功'
            })
            that.setData({
              logonorinfo: '个人中心',
              isLogin:true
            })   
        }
        else {
          that.setData({
            hiddenLoading: true,
          })
          console.log("登陆失败")
          wx.showToast({
            image: '/image/exclamation.png',
            title: '账号或密码错误'
          })
        }
      }
    })
      this.toggleLogin();//关闭弹窗
    } 
  },
 rotateAni: function (n) {
    _animation.rotate(72 * (n)).step()
    this.setData({
      animation: _animation.export()
    })
  },
  rotateAni2: function (n) {
    _animation.rotate(-72 * (n)).step()
    this.setData({
      animation2: _animation.export()
    })
  },
  /**
   * 开始旋转
   */
  startAnimationInterval: function () {
    var that = this;
    that.rotateAni(++_animationIndex); // 进行一次旋转
    _animationIntervalId = setInterval(function () {
      that.rotateAni(++_animationIndex);
    },  _ANIMATION_TIME); // 每间隔_ANIMATION_TIME进行一次旋转
  },
  startAnimationInterval2: function () {
    var that = this;
    that.rotateAni2(++_animationIndex2); // 进行一次旋转
    _animationIntervalId2 = setInterval(function () {
      that.rotateAni2(++_animationIndex2);
    }, _ANIMATION_TIME); // 每间隔_ANIMATION_TIME进行一次旋转
  },
  Logout:function()  //退出登录 
{
  this.setData(
    {
      logonorinfo: '登录', 
      isLogin:false,
    })
    app.globalData.studentNo=null,
    app.globalData.id=null,
    app.globalData.name= "",
    app.globalData.grade= "",
    app.globalData.groups= "",
    app.globalData.projected ='',
    app.globalData.projecting= '',
    app.globalData.password='',
    app.globalData.tags="",
    app.globalData.status=''
}
})
