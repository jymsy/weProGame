export default class Slot 
{
    constructor(x, y, isPlayer = false) {
        this.x = x
        this.y = y
        this.isEmpty = true
        this.item = {}
        this.isPlayer = isPlayer
        this.isMoving = false
    }

    fill() {
        this.isEmpty = false
    }

    empty() {
        this.isEmpty = true
    }
}