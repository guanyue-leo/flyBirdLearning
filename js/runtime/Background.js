import Sprite from "../base/Sprite.js";

class Background extends Sprite{
    constructor() {
        const image = Background.get('background');
        super(image,
            0,0,
            image.width,image.height,
            0,0,
            window.innerWidth,window.innerHeight
        )
    }
}
export default Background