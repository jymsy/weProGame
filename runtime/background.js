import Sprite from '../base/sprite'

const BG_IMG_SRC = '../../images/grass.jpg'
const BG_WIDTH = 512
const BG_HEIGHT = 512
const app = getApp()
/**
 * 游戏背景类
 * 提供update和render函数实现无限滚动的背景功能
 */
export default class BackGround extends Sprite {
    constructor(ctx) {
        super(BG_IMG_SRC, BG_WIDTH, BG_HEIGHT)
        this.top = 0
        this.render(ctx)
    }

    update() {
        this.top += 2
        if (this.top >= app.windowHeight) {
            this.top = 0
        }
    }

    /**
     * 背景图重绘函数
     * 绘制两张图片，两张图片大小和屏幕一致
     * 第一张漏出高度为top部分，其余的隐藏在屏幕上面
     * 第二张补全除了top高度之外的部分，其余的隐藏在屏幕下面
     */
    render(ctx) {
        ctx.drawImage(
            this.imgSrc,
            0,
            -app.windowHeight + this.top,
            app.windowWidth,
            app.windowHeight
        )

        ctx.drawImage(
            this.imgSrc,
            0,
            this.top,
            app.windowWidth,
            app.windowHeight
        )
    }
}
