import Pencil from "./Pencil.js";
import Sprite from "../base/Sprite.js";

class UpPencil extends Pencil{
    constructor(top){
        const image = Sprite.get('pencilUp');
        super(image,top)
    }

    draw() {
        this.y = this.top - this.height;
        super.draw()
    }
}
export default UpPencil