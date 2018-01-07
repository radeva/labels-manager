export default class Label {
    id: string;
    url: string;
    name: string;
    color: string;
    "default": boolean;

    constructor(id: string, url: string, name: string, color: string, _default: boolean) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.color = color;
        this.default = _default;
    }
}