class Director {
    constructor() {
        console.log('constructor')
    }
    static getInstance() {
        if(!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance
    }
}
export default Director