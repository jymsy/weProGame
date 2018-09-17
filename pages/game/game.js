// pages/game.js
import util from '../../utils/util.js'
import DataBus from '../../base/databus.js'
const BG_IMG_SRC = '../../../images/bg.jpg'
const BG_WIDTH = 512
const BG_HEIGHT = 512

const app = getApp()
let databus = new DataBus()

Page({
  lastFrameTime:0,
  ctx: {},
  aniId: 0,
  top: 0,
  planeX: 50,
  planeY: 50,
  planeXV: 2,
  planeYV: 4,
  /**
   * 页面的初始数据
   */
  data: {
    bgStyle: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      bgStyle: `width:${app.windowWidth}px;height:${app.windowHeight}px;`
    })
    this.ctx = wx.createCanvasContext('cg')
    databus.reset()
    this.top = 0
    this.render()
    
    this.ctx.draw()

    util.cancelAnimationFrame(this.aniId)
      this.aniId = util.requestAnimationFrame(()=>{
      this.loop()
    })
  },

  loop: function () {
    this.update()
    this.render()
    this.ctx.draw()
      this.aniId = util.requestAnimationFrame(() => {
      this.loop()
    })
  },

  update: function () {
    this.top += 2
    this.planeX += this.planeXV
    this.planeY += this.planeYV
    if (this.planeX >= app.windowWidth) {
      this.planeXV = -2;
    } else if (this.planeX <= 0) {
      this.planeXV = 2;
    }
    if (this.planeY >= app.windowHeight) {
      this.planeYV = -4;
    } else if (this.planeY <= 0) {
      this.planeYV = 4;
    }
    if (this.top >= app.screenHeight) {
      this.top = 0
    }
      
  },

  render: function () {
    // console.log(this.top, app.screenWidth, app.screenHeight)
    this.ctx.clearRect(0, 0, app.windowWidth, app.windowHeight)
    // this.ctx.draw()
    this.ctx.drawImage(
      '../../images/bg.jpg',
      0,
      -app.screenHeight + this.top,
      app.windowWidth,
      app.screenHeight
      // 0,
      // -app.screenHeight + this.top,
      // app.screenWidth,
      // app.screenHeight
    )
    this.ctx.drawImage(
      '../../images/bg.jpg',
      0,
      this.top,
      app.windowWidth,
      app.screenHeight
      // 0,
      // this.top,
      // app.screenWidth,
      // app.screenHeight
    )
    this.ctx.drawImage(
      '../../images/enemy.png',
      this.planeX,
      this.planeY,
      20,
      15
    )
  },

//   requestAnimationFrame: function (callback) {
//     var currTime = new Date().getTime();
//     var timeToCall = Math.max(0, 16 - (currTime - this.lastFrameTime));
//     var id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
//     this.lastFrameTime = currTime + timeToCall;
//     return id;
//   },

//   cancelAnimationFrame: function (id) {
//     clearTimeout(id)
//   },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
      util.cancelAnimationFrame(this.aniId)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})