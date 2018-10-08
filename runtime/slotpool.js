import Slot from './slot.js'
import util from './../utils/util.js'
const app = getApp()
/**
 * 玩家槽池
 */
export default class SlotPool
{
    constructor() {
        this.slotW = 30
        this.slotH = 30
        this.slotSpace = 10
        this.leftSlot = []
        this.leftSlotItems = 0
        this.leftIndex = 0
        this.rightSlot = []
        this.rightSlotItems = 0
        this.rightIndex = 0
        this.init(54)
    }

    init(total) {
        //总行数 多加3行
        for (let i = 0; i < total; i++) {
            let slotX = this.getSlotX(i)
            let slotY = this.getSlotY(i)
            if (this.isLeftSlot(i)) {
                this.leftSlot.push(new Slot(slotX, slotY))
            } else {
                this.rightSlot.push(new Slot(slotX, slotY))
            }
        }
    }
    getLeftIndex() {
        return this.leftIndex++
    }

    getRightIndex() {
        return this.rightIndex++
    }

    //是否在左侧
    isLeftSlot(index) {
        let mod = index % 6
        return mod === 0 || mod === 1 || mod === 2
    }
    //获取slot的横坐标
    getSlotX(index) {
        let margin = (app.windowWidth - (this.slotSpace + this.slotW) * 6) / 2
        let col = (index % 6) + 1
        let offset = 0

        if (index % 6 >= 3) {
            offset = 10
        }
        return margin + (this.slotSpace + this.slotW) * (col - 1) + offset
    }

    getSlotY(index) {
        let row = ~~(index / 6) + 1
        return app.windowHeight - 100 - (this.slotH + 10) * row
    }

    randMoveSlotItem() {
        this.leftSlot.forEach((slot) => {
            if (!slot.isEmpty && !slot.item.moving && this.doMove()) {
                this.moveTo('right', slot)
            }
        })
        this.rightSlot.forEach((slot) => {
            if (!slot.isEmpty && !slot.item.moving && this.doMove()) {
                this.moveTo('left', slot)
            }
        })
    }

    moveTo(direction, slot) {
        if (direction === 'right') {
            for (let i = 0; i < this.rightSlot.length; i++) {
                let rslot = this.rightSlot[i]
                if (rslot.isEmpty && !rslot.item.moving) {
                    console.log('move right')
                    slot.item.moving = false
                    rslot.item.moving = true
                    rslot.fill()
                    slot.item.sx = slot.x
                    slot.item.sy = slot.y
                    slot.item.fx = rslot.x
                    slot.item.fy = rslot.y
                    slot.item.xDirt = '+'
                    slot.item.speed = 3
                    rslot.item = slot.item
                    slot.empty()
                    slot.item = {}
                    return
                }
            }
        } else {
            for (let i = 0; i < this.leftSlot.length; i++) {
                let lslot = this.leftSlot[i]
                if (lslot.isEmpty && !lslot.item.moving) {
                    console.log('move left')
                    slot.item.moving = false
                    lslot.item.moving = true
                    lslot.fill()
                    slot.item.sx = slot.x
                    slot.item.sy = slot.y
                    slot.item.fx = lslot.x
                    slot.item.fy = lslot.y
                    slot.item.xDirt = '-'
                    slot.item.speed = 3
                    lslot.item = slot.item
                    slot.empty()
                    slot.item = {}
                    return
                }
            }
        }
    }

    doMove() {
        return util.rnd(0, 2) === 0
    }

    clearPool() {
        this.leftSlot = []
        this.rightSlot = []
        this.leftIndex = 0
        this.rightIndex = 0
        this.rightSlotItems = 0
        this.leftSlotItems = 0
    }
}