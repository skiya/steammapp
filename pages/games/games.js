// pages/games/games.js
var app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    featured:{},
    specials:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var featuredUrl=app.globalData.steamBase+"featured";
    var featuredCatUrl = app.globalData.steamBase + 'featuredcategories';

    this.getFeaturedGameListData(featuredUrl,'featured','商店热门');
    this.getSpecialSteamGameListData(featuredCatUrl,'specials','特别优惠');
  },

  /**
   * SteamAPI访问函数
   */
  getFeaturedGameListData:function (url,settedKey,categoryTitle){
    var that=this;
    wx.request({
      url: url,
      method: 'GET',
      success:function(res){
        that.processFeaturedSteamData(res.data,settedKey,categoryTitle)
      },
      fail:function(error){
       console.log(error);
      }
    })
  },

  getSpecialSteamGameListData:function(url,settedKey,categoryTitle){
    var that=this;
    wx.request({
      url: url,
      method:'GET',
      success:function(res){
        that.processSpecialSteamData(res.data,settedKey,categoryTitle)
      },
      fail:function(error){
        console.log(error);
      }
    })
  },


  /**
   * Steam数据处理
   */
  processFeaturedSteamData:function(gamesSteam,settedKey,categoryTitle){
    var games=[];
    for (var idx in gamesSteam.large_capsules){
      var largeCapsule = gamesSteam.large_capsules[idx];
      var name = largeCapsule.name;
      if(name.length>=21){
        name=name.substring(0,21)+'...'
      }
      var discounted = largeCapsule.discounted;
      var temp = {
        gameId:largeCapsule.id,
        discounted:largeCapsule.discounted,
        discount:largeCapsule.discount_percent,
        name:name,
        originalPrice:'￥'+largeCapsule.original_price/100,
        finalPrice: '￥'+largeCapsule.final_price/100 ,
        coverImage: largeCapsule.large_capsule_image
      };
      games.push(temp);
    }
    var readyData={};
    readyData[settedKey]={
      categoryTitle:categoryTitle,
      games:games
    };
    this.setData(readyData);
  },

  processSpecialSteamData:function(gamesSteam,settedKey,categoryTitle){
    var games=[];
    for(var idx in gamesSteam.specials.items){
      var special = gamesSteam.specials.items[idx];
      var name = special.name;
      if (name.length >= 21) {
        name = name.substring(0, 21) + '...';
      }
      var temp = {
        gameId:special.id,
        discounted: special.discounted,
        discount: special.discount_percent,
        name: name,
        originalPrice:'￥'+special.original_price/100,
        finalPrice: '￥' + special.final_price / 100,
        coverImage: special.large_capsule_image
      };
      games.push(temp);
    }
    var readyData = {};
    readyData[settedKey] = {
      categoryTitle: categoryTitle,
      games: games
    };
    this.setData(readyData);
  },

  /**
   *跳转到游戏详情页面 
  */
  onGameTap:function(event){
    var gameId=event.currentTarget.dataset.gameId;
    var ifDiscounted = event.currentTarget.dataset.discounted
    console.log(gameId);
    wx.navigateTo({
      url: 'game-detail/game-detail?id='+gameId+'&discounted='+ifDiscounted
    })
  }
})