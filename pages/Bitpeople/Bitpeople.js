var app = getApp();
Page({
  data: {
    showDialog: false,
    showaddpeople: false,
    showdeletepeople:false,
    bcolor1: '',
    bcolor2: '',
    bcolor3: '',
    bcolor4: '',
    color1: '',
    color2: '',
    color3: '',
    color4: '',
    biter: [],//比特成员信息json
    show: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    showdeletepeople: false,
    selectData: ['产品组', '程序组', '设计组', '运营组'],//下拉列表的数据
    selectDatadelete: [],
    index: 0,//选择的下拉列表下标
    addgroups: '产品组', // 添加成员默认产品组
    deletename: '', // 删除成员姓名
    deletegroups: '产品组', // 删除成员组别
    hiddenLoading: false
  },

  selectTap() { // 点击下拉列表
    this.setData({
      show: !this.data.show
    
    });
    
    console.log(this.data.show)
  },
  optionTap(e) { // 下拉列表

      this.data.addgroups = e.target.dataset.groups
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
  },
  onLoad:function(){
    this.setData({
      
      color1: 'white',
      color2: '#c4bebe',
      color3: '#c4bebe',
      color4: '#c4bebe',
      bcolor1: '#ffdd11',
      bcolor2: 'none',
      bcolor3: 'none',
      bcolor4: 'none',

    
    
    })
    if (app.globalData.studentNo == "xmzg" || app.globalData.studentNo == "tdzg")   // 判断团队主管
    this.setData({
      zhuguan:1
    })
    else
      this.setData({
        zhuguan: 0
      })
  var that=this
    wx.request({   // 默认产品组
      url: app.globalData.url+'/chanPinChengYuan',
      data: {    
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
      success: function (res) {
        that.setData({
          hiddenLoading: !that.data.hiddenLoading
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
  load(id)
  {
    if (id == '产品组') {
      this.data.selectDatadelete = [],
      this.data.deletegroups = "产品组"
      console.log("选择了产品组")
      var that = this
      wx.request({
        url: app.globalData.url + '/chanPinChengYuan',
        data: {
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',// 默认值 
        },
        success: function (res) {
          that.setData({
            hiddenLoading: !that.data.hiddenLoading
          })
          that.data.biter = res.data
          that.shuaxin();
          that.setData({
            color1: 'white',
            color2: '#c4bebe',
            color3: '#c4bebe',
            color4: '#c4bebe',
            bcolor1: '#ffdd11',
            bcolor2: 'none',
            bcolor3: 'none',
            bcolor4: 'none',
            

          })
        }
      })
    }
    else if (id == '程序组') {
      this.data.selectDatadelete = [],
      this.data.deletegroups = "程序组"
      console.log("选择了程序组")
      this.setData({
    
        
        color1: '#c4bebe',
        color2: 'white',
        color3: '#c4bebe',
        color4: '#c4bebe',
        bcolor1: 'none',
        bcolor2: '#ffdd11',
        bcolor3: 'none',
        bcolor4: 'none',
       
      });
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
            hiddenLoading: !that.data.hiddenLoading
          })
          console.log(res.data)
          that.data.biter = res.data
          that.shuaxin();

        }
      })

    }
    else if (id == '设计组') {
      this.data.selectDatadelete = [],
      this.data.deletegroups = "设计组"
      console.log("选择了设计组")
      this.setData({
        color1: '#c4bebe',
        color2: '#c4bebe',
        color3: 'white',
        color4: '#c4bebe',
        bcolor1: 'none',
        bcolor2: 'none',
        bcolor3: '#ffdd11',
        bcolor4: 'none',
      });
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
            hiddenLoading: !that.data.hiddenLoading
          })
          that.data.biter = res.data
          that.shuaxin();
        }
      })
    }
    else if (id == '运营组') {
      this.data.selectDatadelete= [],
      this.data.deletegroups = "运营组"
      console.log("选择了运营组")
      this.setData({
        color1: '#c4bebe',
        color2: '#c4bebe',
        color3: '#c4bebe',
        color4: 'white',
        bcolor1: 'none',
        bcolor2: 'none',
        bcolor3: 'none',
        bcolor4: '#ffdd11',
      });
      var that = this
      wx.request({
        url: app.globalData.url+'/yunYingChengYuan',
        data: {
        },
        method: 'GET',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',// 默认值 
        },
        success: function (res) {
          that.setData({
            hiddenLoading: !that.data.hiddenLoading
          })
          that.data.biter = res.data

          that.shuaxin();

        }


      })

    }

  },
  shuaxin(){  //拆分传入信息显示至视图层
    var that=this
    var i
    for (i in this.data.biter) {
      var tag = this.data.biter[i].tags
      var t = new Array(); //定义一数组 
      t = tag.split("#"); //字符分割 
      this.data.biter[i].tags = t
    }


  for (i in this.data.biter) {
      var ped = this.data.biter[i].projected
      var p = new Array(); //定义一数组 
      p = ped.split("#"); //字符分割 
      this.data.biter[i].projected = p
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
    
    i=0
   
    for (i in this.data.biter) {
    
      this.data.selectDatadelete[i]= this.data.biter[i].name
     
    }
    
     this.setData({
       
       selectDatadelete: this.data.selectDatadelete,
       showbiter: that.data.biter,//更新至视图层
    
    })
  },

  toggleDialog(e) {//是否弹出个人简介框
    var that=this
    this.setData({
      showDialog: !this.data.showDialog
    });
    
    if (this.data.showDialog==true)
    {  

      
      if (e.currentTarget.dataset.item.tags == '')
        this.setData(
          {
            tagno: 1
          }
        )
      else
        this.setData(
          {
            tagno: 0
          }
        )
      if (e.currentTarget.dataset.item.projected == '')
        this.setData(
          {
            pno: 1
          }
        )
      else
        this.setData(
          {
            pno: 0
          }
        )

       var i
   
      this.setData({
        tags: e.currentTarget.dataset.item.tags,
        projected: e.currentTarget.dataset.item.projected,
      


      })
    }

  },

  showaddpop() {//是否弹出添加人员框
    
    this.setData({
      showaddpeople: !this.data.showaddpeople
    });

    if(this.data.show=true)
    this.setData(
      {
        show:!this.data.show
      }
    )
  },
  showdeletepop() {//是否弹出删除人员框
   
    this.setData({
      showdeletepeople: !this.data.showdeletepeople
    });
    if (this.data.show = true)
      this.setData(
        {
          show: !this.data.show
        }
      )
   
    
  },
  addpop: function (e) {
    var that = this
    console.log("输入的姓名为：" + e.detail.value.name)
    console.log("输入的学号为：" + e.detail.value.sno)
    console.log("选择的组别为" + this.data.addgroups)
    if (e.detail.value.name == '' && e.detail.value.sno == '') {
      wx.showToast({
        image: '/image/exclamation.png',
        title: '请核对'
      })
    }
    else {
      this.showaddpop()
      wx.request({
        url: app.globalData.url + '/tianJiaChengYuan',
        data: {
          name: e.detail.value.name,
          studentNo: e.detail.value.sno,
          groups: that.data.addgroups
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8', // 默认值
        },

        method: 'POST',
        success: function (res) {
          console.log('添加返回值'+res.data)
          if(res.data==1)
          {
            
            wx.showToast({

              title: '添加成功'
            })
            that.load(that.data.deletegroups)
         
          }
          else 
          {
            wx.showToast({
              image: '/image/exclamation.png',
              title: '该成员已经添加过了'
            })
          }
        }
      })
    }
  },
  optionTapdelete(e) { // 下拉列表
    this.data.deletename = e.target.dataset.name;
    let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
    this.setData({
      index: Index,
      show: !this.data.show
    });
    
  },
  deletepop: function (e) {
    console.log("删除成员")
    this.showdeletepop()
    var that = this
    console.log("删除的组别为" + this.data.deletegroups)
    console.log("删除的姓名为" + this.data.deletename)
      wx.request({
        url: app.globalData.url + '/shanChuChengYuan',
        data: {
          name: that.data.deletename,
          groups: that.data.deletegroups
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded;charset=utf-8',// 默认值 
        },
        success: function (res) {
          console.log(res)
          if (res.data = 1) {
            wx.showToast({
              title: '删除成功'
            })
            that.load(that.data.deletegroups)
          }
          else {
            wx.showToast({
              image: '/image/exclamation.png',
              title: '删除失败'
            })
          }
        }
      })
    
 
  },

  changestatus(e){
    if (app.globalData.studentNo == "tdzg" || app.globalData.studentNo == "xmzg")  

    {console.log("更改人员状态")
    var that=this
      wx.showModal({
        title: '',
        content: '是否将该成员状态变为“特殊”？',
        success(res) {
          if (res.confirm) {
            console.log("修改状态成员组别为" + e.currentTarget.dataset.item.groups)
            console.log("修改状态成员姓名为"+e.currentTarget.dataset.item.name)
            wx.request({
              url: app.globalData.url + '/zhuangTaiBianGeng',
              data: {
                name: e.currentTarget.dataset.item.name,
                groups: e.currentTarget.dataset.item.groups,
                status: e.currentTarget.dataset.item.status,
              },
              method: 'GET',
              header: {
                'content-type': 'application/x-www-form-urlencoded;charset=utf-8',// 默认值 
              },
              success: function (res) {
                console.log("修改成员成功")
                that.load(e.currentTarget.dataset.item.groups,)

              }
            })

          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    

  }
  }

})


