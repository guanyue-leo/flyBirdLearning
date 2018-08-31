import DataStore from "./base/DataStore.js";
import UpPencil from "./runtime/UpPencil.js";
import DownPencil from "./runtime/DownPencil.js";

class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
        this.moveSpeed = 2;
        this.restart = 0;
        this.pause = false;
    }

    // 单例函数，确保导演唯一
    static getInstance() {
        if(!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance
    }

    // 铅笔创造函数
    createPencil() {
        const minTop = window.innerHeight / 8;
        const maxTop = window.innerHeight / 2;
        let top = minTop + Math.random() * (maxTop - minTop);
        this.dataStore.get('pencils').push(new UpPencil(top));
        this.dataStore.get('pencils').push(new DownPencil(top));
    }

    // 原碰撞判断函数
    static isStrike(birdBorder, pencilBorder) {
        let result = false;
        if(birdBorder.top > pencilBorder.bottom ||
            birdBorder.bottom < pencilBorder.top ||
            birdBorder.right < pencilBorder.left ||
            birdBorder.left > pencilBorder.right
        ){
            result = true;
        }
        return !result;
    }

    // 转化后的碰撞判断函数
    static isStrikeReal(birdBorder, pencilBorder) {
        let result = false;
        if(birdBorder.top < pencilBorder.bottom && // true
            birdBorder.bottom > pencilBorder.top && // true
            birdBorder.right > pencilBorder.left && // true
            birdBorder.left < pencilBorder.right // true
        ){
            console.log('birdBorder', birdBorder);
            console.log('pencilBorder', pencilBorder);
            result = true;
        }
        return result;
    }

    // 总碰撞判断函数（包括地板与加分逻辑）
    check() {
        let birds = this.dataStore.get('birds');
        let land = this.dataStore.get('land');
        if(birds.birdsY[0] + birds.birdsHeight[0] >= land.y) {
            console.log('撞击了');
            this.isGameOver = true;
        }
        // 小鸟的碰撞模型
        const birdBorder = {
            top: birds.birdsY[0],
            bottom: birds.birdsY[0] + birds.birdsHeight[0],
            left: birds.birdsX[0],
            right: birds.birdsX[0] + birds.birdsWidth[0]
        };
        const pencils = this.dataStore.get('pencils');
        const score = this.dataStore.get('score');
        const length = pencils.length;
        for(let i=0; i < length; i++) {
            const pencil = pencils[i];
            // 铅笔的碰撞模型
            const pencilBorder = {
                top: pencil.y,
                bottom: pencil.y + pencil.height,
                left: pencil.x,
                right: pencil.x + pencil.width
            };
            if(Director.isStrikeReal(birdBorder, pencilBorder)) {
                console.log('撞到了');
                this.isGameOver = true;
            }
        }

        //加分逻辑
        if(birds.birdsX[0] > (pencils[0].x + pencils[0].width) && score.isScore) {
            score.isScore = false;
            score.scoreNumber++;
        }
    }

    // 小鸟初始化函数
    birdsEvent() {
        for(let i=0; i<=2; i++){
            this.dataStore.get('birds').y[i] = this.dataStore.get('birds').birdsY[i];
            this.dataStore.get('birds').time = 0;
        }
    }

    // 主逻辑函数
    run() {
        // todo 分块，注释
        // todo 完整小游戏上线流程
        // todo coco框架了解
        if(!this.isGameOver) {
            this.check();
            let timer = requestAnimationFrame(()=>this.run());
            // 地板绘制
            this.dataStore.get('background').draw();
            this.dataStore.put('timer', timer);

            const pencil = this.dataStore.get('pencils');
            // 铅笔销毁
            if(pencil[0].x + pencil[0].width <= 0 && pencil.length === 4){
                pencil.shift();
                pencil.shift();
                this.dataStore.get('score').isScore = true;
            }
            // 铅笔创建
            if(pencil[0].x <= (window.innerWidth - pencil[0].width) / 2 && pencil.length === 2) {
                this.createPencil();
            }
            // 铅笔绘制
            this.dataStore.get('pencils').forEach((value)=>{
                value.draw();
            });
            // 地板、分数、小鸟绘制
            this.dataStore.get('land').draw();
            this.dataStore.get('score').draw();
            this.dataStore.get('birds').draw();
        } else {
            console.log('游戏结束');
            this.dataStore.get('startButton').draw();
            this.restart = (new Date()).getTime();
            // 停止循环
            cancelAnimationFrame(this.dataStore.get('timer'));
            // 数据销毁
            this.dataStore.destroy();
        }
    }
}
export default Director