// 循环渲染三只小鸟，同一个图的三个部分
import Sprite from "../base/Sprite.js";

class Birds extends Sprite{
    constructor() {
        const image = Sprite.get('birds');
        super(image,
            0,0,
            image.width,image.height,
            0,0,
            image.width,image.height
            );
        this.clippingX = [9,
            9 + 34 + 18,
            9 + 34 + 18 + 34 + 18
        ];
        this.clippingY = [10, 10, 10];
        this.clippingWidth = [34, 34, 34];
        this.clippingHeight = [24, 24, 24];
        const birdX = window.innerWidth / 4;
        const birdY = window.innerHeight / 2;
        const birdWidth = 34;
        const birdHeight = 24;
        this.birdsX = [birdX, birdX, birdX];
        this.birdsY = [birdY, birdY, birdY];
        this.birdsWidth = [birdWidth, birdWidth, birdWidth];
        this.birdsHeight = [birdHeight, birdHeight, birdHeight];
        this.y = [birdY, birdY, birdY];
        this.index = 0;
        this.count = 0;
        this.time = 0;
    }

    draw() {
        const speed = 0.2;
        this.count = this.count + speed;
        if(this.index >= 2) this.count = 0;
        this.index = Math.floor(this.count);

        const g = 0.98 / 2.4;
        const offsetTop = 30;
        const offsetY = (g * this.time * (this.time - offsetTop)) / 2;
        for(let i=0; i<this.birdsY.length; i++) {
            this.birdsY[i] = this.y[i] + offsetY;
        }
        this.time ++;
        super.draw(this.img,
            this.clippingX[this.index], this.clippingY[this.index],
            this.clippingWidth[this.index], this.clippingHeight[this.index],
            this.birdsX[this.index], this.birdsY[this.index],
            this.birdsWidth[this.index], this.birdsHeight[this.index]
            )
    }
}
export default Birds