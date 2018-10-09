// pages/game.js
import util from '../../utils/util.js'
import DataBus from '../../base/databus.js'
import BackGround from '../../runtime/background.js'
import Enemy from '../../runtime/enemy.js'
import SlotPool from '../../runtime/slotpool.js'
const BG_IMG_SRC = '../../../images/bg.jpg'
const BG_WIDTH = 512
const BG_HEIGHT = 512

const app = getApp()
let databus = new DataBus()

Page({
    lastFrameTime: 0,
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

        this.bg = new BackGround(this.ctx)
        databus.slotPool = new SlotPool()
        this.initPlayerFrames()
        this.playerIndex = util.rnd(0, 36)

        util.cancelAnimationFrame(this.aniId)
        this.aniId = util.requestAnimationFrame(() => {
            this.loop()
        })
    },
    /**
     * 初始化玩家头像
     */
    initPlayerFrames: function () {
        for (let i = 1;i < 10;i++) {
            if (util.rnd(0, 2) === 0) {
                databus.playerFrames.push([
                    `../../images/ff_l${i}.png`,
                    `../../images/ff_r${i}.png`
                ])
            } else {
                databus.playerFrames.push([
                    `../../images/ff_r${i}.png`,
                    `../../images/ff_l${i}.png`
                ])
            }
        }
    },

    loop: function () {
        databus.frame++
        this.update()
        this.render()
        this.ctx.draw()
        this.aniId = util.requestAnimationFrame(() => {
            this.loop()
        })
    },

    /**
     * 随着帧数变化的敌机生成逻辑
     * 帧数取模定义成生成的频率
     */
    enemyGenerate() {
        if (databus.enemys.length > 35) {
            return
        }
        if (databus.frame % 5 === 0) {
            let enemy = databus.pool.getItemByClass('enemy', Enemy)
            enemy.init(3, databus.enemys.length === this.playerIndex)
            databus.enemys.push(enemy)
        }
    },
    //随机移动飞机
    randMoveEnemy: function () {
        if (databus.frame % 280 === 0) {
            databus.slotPool.randMoveSlotItem()
        }
    },

    // 游戏逻辑更新主函数
    update: function () {
        this.bg.update()

        databus.enemys.forEach((item) => {
            item.update()
        })

        this.enemyGenerate()
        this.randMoveEnemy()
    },

    render: function () {
        this.ctx.clearRect(0, 0, app.windowWidth, app.windowHeight)
        this.bg.render(this.ctx)
        databus.enemys.forEach((item) => {
            item.drawToCanvas(this.ctx)
        })
    },

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
        databus.reset()
    },
    click: function () {
        wx.showToast({
            title: 'sdf',
        })
    }
})