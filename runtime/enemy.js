import Animation from '../base/animation.js'
import DataBus from '../base/databus.js'
import util from '../utils/util.js'

const ENEMY_IMG_SRC = '../../images/ff_l1.png'
// const ENEMY_IMG_SRC = '../../images/enemy.png'
const ENEMY_WIDTH = 35
const ENEMY_HEIGHT = 35
const app = getApp()
const PLAYERS_AVATAR = [
    [
        '../../images/ff_l1.png',
        '../../images/ff_r1.png',  
    ],[
        '../../images/ff_r2.png',
        '../../images/ff_l2.png',
    ], [

    ]
]

const __ = {
    speed: Symbol('speed')
}

let databus = new DataBus()

export default class Enemy extends Animation
{
    constructor() {
        super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
        this.xDirt = '+'
        this.yDirt = '+'
        // this.initExplosionAnimation()
    }

    init(speed, isPlayer = false) {
        let slot = {}
        this.id = databus.enemys.length
        if (this.inLeftSlot(this.id)) {
            let leftIndex = databus.slotPool.getLeftIndex()
            slot = databus.slotPool.leftSlot[leftIndex]
            databus.slotPool.leftSlotItems++
        } else {
            let rightIndex = databus.slotPool.getRightIndex()
            slot = databus.slotPool.rightSlot[rightIndex]
            databus.slotPool.rightSlotItems++
        }
        this.isPlayer = isPlayer
        slot.fill()
        slot.item = this
        this.fx = slot.x
        this.fy = slot.y
        this.x = -this.width
        this.sx = -this.width
        this.y = -this.height
        this.sy = -this.height
        // this[__.speed] = speed
        this.speed = speed
        this.visible = true
        this.moving = true
        this.initFrames(databus.playerFrames[this.id % 9])
    }



    //是否在左侧
    inLeftSlot(index) {
        let mod = index % 6
        return mod === 0 || mod === 1 || mod === 2
    }

    update() {
        if ((this.xDirt === '+' && this.x >= this.fx) || 
        (this.xDirt === '-' && this.x <= this.fx)) {
            this.moving = false
            this.y = this.fy
            this.x = this.fx
            return
        }
        if (this.xDirt === '+') {
            this.x += this.speed
        } else {
            this.x -= this.speed
        }
        this.y = this.getY(this.x)
        
        // 对象回收
        if (this.y > app.windowHeight + this.height)
            databus.removeEnemey(this)
    }

    getY(x) {
        let k = (this.fy - this.sy) / (this.fx - this.sx)
        let b = this.sy - k * this.sx
        return k * x + b
    }

    drawToCanvas(ctx) {
        if (!this.visible) {
            return
        }
        // super.drawToCanvas(ctx)
        let src = ''
        if (databus.frame % 8 < 4) {
            src = this.imgList[0]
        } else {
            src = this.imgList[1]
        }
        ctx.drawImage(
            src,
            this.x,
            this.y,
            this.width,
            this.height
        )
        ctx.font = '10rpx -apple-system-font,Helvetica Neue,sans-serif'
        if (this.isPlayer) {
            ctx.setFillStyle('red')
        } else {
            ctx.setFillStyle('white')
        }
        
        ctx.fillText('xxx', this.x, this.y + ENEMY_WIDTH + 7)
    }
}

