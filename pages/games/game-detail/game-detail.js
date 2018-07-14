// pages/games/game-detail/game-detail.js
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    theGameDetail:{},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var gameId=options.id;
    if(options.discounted==='false'){
      var discounted = false;
    }
    else{
      var discounted = true;
    }
    this.setData({
      discounted:discounted
    })
    var url = app.globalData.steamBase +'appdetails/?appids='+gameId;
    this.getGameDetail(url)
  },

  getGameDetail:function(url){
    var that=this;
    wx.request({
      url: url,
      method:'GET',
      success:function(res){
        that.processGameDetail(res.data);
      },
      fail:function(error){
        console.log(error);
      }
    })
  },

  processGameDetail:function(appDetail){
    for(var idx in appDetail){
      var gameDetail=appDetail[idx].data;
    }
    var theGameDetail={
      name:gameDetail.name,
      developer:gameDetail.developers,
      publisher:gameDetail.publishers,
      price:gameDetail.price_overview,
      platforms:gameDetail.platforms,
      category:gameDetail.categories,
      genre:gameDetail.genres,
      screenshot:gameDetail.screenshots,
      release:gameDetail.release_date,
      background:gameDetail.background,
      description:gameDetail.short_description
    }
    this.setData({
      theGameDetail:theGameDetail
    });
  }
})