import Sprite from "../base/Sprite.js";

class StartButton extends Sprite{
    constructor() {
        const image = Sprite.get('startButton');
        super(image,
            0,0,
            image.width, image.height,
            (window.innerWidth - image.width) / 2, (window.innerHeight - image.height) / 2.5,
            image.width, image.height
        );
    }
}
export default StartButton