import Animation from '../base/animation.js'
import DataBus from '../base/databus.js'
import util from '../utils/util.js'

const ENEMY_IMG_SRC = '../../images/enemy.png'
const ENEMY_WIDTH = 30
const ENEMY_HEIGHT = 30
const app = getApp()

const __ = {
    speed: Symbol('speed')
}

let databus = new DataBus()

export default class Enemy extends Animation
{
    constructor() {
        super(ENEMY_IMG_SRC, ENEMY_WIDTH, ENEMY_HEIGHT)
        // this.initExplosionAnimation()
    }

    init(speed) {
        this.x = util.rnd(0, app.windowWidth - ENEMY_WIDTH)
        this.y = -this.height
        this[__.speed] = speed
        this.visible = true
    }

    update() {
        this.y += this[__.speed]

        // 对象回收
        if (this.y > app.windowHeight + this.height)
            databus.removeEnemey(this)
    }
}

