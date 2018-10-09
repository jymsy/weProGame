import Slot from './slot.js'
import util from './../utils/util.js'
const app = getApp()
/**
 * 玩家槽池
 */
export default class SlotPool
{
    constructor() {
        this.slotW = 35
        this.slotH = 35
        this.slotSpace = 10
        this.midSpace = 20
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
        let margin = (app.windowWidth - this.slotW * 6 - this.slotSpace * 4 - this.midSpace * 2) / 2
        let col = (index % 6) + 1

        if (index % 6 >= 3) {
            return margin + (this.slotW + this.slotSpace) * (col - 2) + this.slotW + this.midSpace * 2
        } else {
            return margin + (this.slotSpace + this.slotW) * (col - 1)
        }
    }
    //获取slot的纵坐标
    getSlotY(index) {
        let row = ~~(index / 6) + 1
        return app.windowHeight - 100 - (this.slotH) * row
    }
    //随机移动左右槽的玩家
    randMoveSlotItem() {
        this.leftSlot.forEach((slot) => {
            if (!slot.isEmpty && !slot.item.moving && !slot.item.isPlayer && this.doMove()) {
                this.moveTo('right', slot)
            }
        })
        this.rightSlot.forEach((slot) => {
            if (!slot.isEmpty && !slot.item.moving && !slot.item.isPlayer && this.doMove()) {
                this.moveTo('left', slot)
            }
        })
    }
    //将玩家从一个槽移动到另一个槽
    moveTo(direction, slot) {
        if (direction === 'right') {
            for (let i = 0; i < this.rightSlot.length; i++) {
                let rslot = this.rightSlot[i]
                if (rslot.isEmpty && !rslot.item.moving) {
                    slot.item.moving = false
                    slot.item.sx = slot.x
                    slot.item.sy = slot.y
                    slot.item.fx = rslot.x
                    slot.item.fy = rslot.y
                    slot.item.xDirt = '+'
                    slot.item.speed = 6
                    rslot.item = slot.item
                    rslot.item.moving = true
                    rslot.fill()
                    slot.empty()
                    slot.item = {}
                    return
                }
            }
        } else {
            for (let i = 0; i < this.leftSlot.length; i++) {
                let lslot = this.leftSlot[i]
                if (lslot.isEmpty && !lslot.item.moving) {
                    slot.item.moving = false
                    slot.item.sx = slot.x
                    slot.item.sy = slot.y
                    slot.item.fx = lslot.x
                    slot.item.fy = lslot.y
                    slot.item.xDirt = '-'
                    slot.item.speed = 6
                    lslot.item = slot.item
                    lslot.item.moving = true
                    lslot.fill()
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