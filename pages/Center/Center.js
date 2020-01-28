// pages/center/center.js
var app=getApp();
Page({

  data: {
    showChangePassword: false, //是否弹出登录
    showProjectExperience:false,
    tagarray:[],
    newname:'',
    newgrade:'',
    newgroups:'',
    newtag1:'',
    newtag2: '',
    newtag3: '',
    pwd:'',
    projecting:[],
    projected: [],
  },


  onLoad: function () {
    console.log("进入个人中心")
    var that=this
    wx.request({
      url: app.globalData.url + '/chaKanGeRen',
      data: {
        studentNo:app.globalData.studentNo
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded' // 默认值
      },
      success(res) {

        app.globalData.studentNo = res.data.number
        app.globalData.id = res.data.id
        app.globalData.name = res.data.name
        app.globalData.grade = res.data.grade
        app.globalData.groups = res.data.groups
        app.globalData.projected = res.data.projected
        app.globalData.projecting = res.data.projecting
        app.globalData.tags = res.data.tags
        app.globalData.password = res.data.password
        app.globalData.status = res.data.status
        that.data.pwd = app.globalData.password
        var tag = res.data.tags
        var ped = res.data.projected
        var ping = res.data.projecting
        var t = new Array(); //定义一数组 
        t = tag.split("#"); //字符分割 
        console.log("标签为" + t)
        console.log(t)

        var pd = new Array(); //定义一数组 
        pd = ped.split("#"); //字符分割 
        console.log("完成项目为为" + pd)
        console.log(pd)

        var pg = new Array(); //定义一数组 
        pg = ping.split("#"); //字符分割 
        console.log("进行项目为" + pg)
        console.log(pg)
        
        
       if(pg=='')
       that.setData({
         pgnum:0
       })
       else
         that.setData({
           pgnum: 1
         })
        if (pd == '')
          that.setData({
            pdnum: 0
          })
       else
        that.setData({
          pdnum: 1
        })
        that.setData({
          tagarray: t,
          projected: pd,
          projecting: pg,
          showOddName: app.globalData.name,
          showOddGrade: app.globalData.grade,
          showOddGroups: app.globalData.groups,
        })



     
      },
    })

    


  },

 
  ProjectExperience:function(){

    console.log("打开项目经历")
    this.showProjectExperience();
  },
   ChangePassword: function () {

    console.log("选择修改密码")
     this.showChangePassword();
    
  }
  ,
  showProjectExperience() {
    this.setData({
      showProjectExperience: !this.data.showProjectExperience,

    });

  },
  showChangePassword() {
    this.setData({
      showChangePassword: !this.data.showChangePassword,

    });

  },
  onPasswordChanged:function(e){
    var that=this
   if(e.detail.value.pwd1!=e.detail.value.pwd2)
   {
      console.log("两次密码不一致,修改失败")
     wx.showToast({
       image: '/image/exclamation.png',
       title: '密码不一致'
     })
   }
   else
   {

       that.data.pwd=e.detail.value.pwd1
       console.log("修改成功")
       console.log("修改后的密码:  "+that.data.pwd)
     that.showChangePassword();
   }
  },


  onUserinfoInput:function(e){
    console.log("保存个人信息")
 

    if(e.detail.value.newname!='')
    {
     this.data.newname=e.detail.value.newname
    }
    else
    {
      this.data.newname=app.globalData.name
    }
    if (e.detail.value.newgrade != '') {
      this.data.newgrade = e.detail.value.newgrade
    }
    else {
      this.data.newgrade = app.globalData.grade
    }
    if (e.detail.value.newgroups != '') {
      this.data.newgroups = e.detail.value.newgroups
    }
    else {
      this.data.newgroups = app.globalData.groups
    }

    if (e.detail.value.newtag1 == '') {  //标签1
      this.data.newtag1 = this.data.tagarray[0]
    }
    else {
      this.data.newtag1 = e.detail.value.newtag1
    }
    


    if (e.detail.value.newtag2 == '') { //标签2
      this.data.newtag2 = this.data.tagarray[1]
    }
    else {
      this.data.newtag2 = e.detail.value.newtag2
    }


    if (e.detail.value.newtag3 == '') { //标签3
      this.data.newtag3 = this.data.tagarray[2]
    }
    else {
      this.data.newtag3 = e.detail.value.newtag3
    }


    var newtagarray = new Array(this.data.newtag1, this.data.newtag2, this.data.newtag3);
    var newtags = newtagarray.join('#');
    console.log("合并后的标签" + newtags)

    
    var that=this

    console.log(
      'id:'+ app.globalData.id,
      'number:'+ app.globalData.studentNo,
      'password:'+ this.data.pwd,
      'name:' + this.data.newname,
      'grade: ' + this.data.newgrade,
      'groups:' +  this.data.newgroups,
      'projected:' +app.globalData.projected,
      'projecting: '+app.globalData.projecting,
      ' tags: ' + newtags

    )
 
    wx.request({
      url: app.globalData.url + '/xiuGaiGeRen',
      data: {
      
           id: app.globalData.id,
           number: app.globalData.studentNo,
           password: that.data.pwd, 
           name: that.data.newname, 
           grade: that.data.newgrade, 
           groups: that.data. newgroups,
           projected: app.globalData.projected, 
           projecting: app.globalData.projecting, 
           tags: newtags
      
      },
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8' // 默认值
      },
      success(res) {
        wx.showToast({
   
          title: '保存成功'
        })
        console.log(res)
        that.onLoad()
        
      },
    })

  }

})