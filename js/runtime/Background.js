import Sprite from "../base/Sprite.js";

class Background extends Sprite{
    constructor(ctx,image) {
        super(ctx,image,
            0,0,
            image.width,image.height,
            0,0,
            window.innerWidth,window.innerHeight
        )
    }
}
export default Background