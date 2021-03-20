import { element } from "../utils/element";

export default class Component {
    constructor(classname) {
        this.container = element('div', {
            className: classname,
        });
    }
}