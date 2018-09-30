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
            if (!slot.isEmpty && !slot.isMoving && this.doMove()) {
                this.moveTo('right', slot)
            }
        })
        // this.rightSlot.forEach((item) => {
        //     if (!item.isEmpty && this.doMove()) {
        //         this.moveTo('left')
        //     }
        // })
    }

    moveTo(direction, slot) {
        slot.isMoving = true
        if (direction === 'right') {
            this.rightSlot.forEach((rslot) => {
                if (rslot.isEmpty && !rslot.isMoving) {
                    rslot.isMoving = true
                    rslot.fill()
                    rslot.item = slot.item
                    
                }
            })
        } else {

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