import DataStore from "./base/DataStore.js";

class Director {
    constructor() {
        this.dataStore = DataStore.getInstance();
    }

    static getInstance() {
        if(!Director.instance) {
            Director.instance = new Director();
        }
        return Director.instance
    }

    run() {
        this.dataStore.get('background').draw();
    }
}
export default Director