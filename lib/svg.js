class SVG {
    constructor() {
        this.text = "";
        this.shape = "";
    }

    render() {
        return `<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">${this.shape}${this.text}</svg>`;
    }

    setText(innerHTML, color) {
        if (innerHTML.length > 3 || innerHTML.length < 1) {
            throw new Error("You must stay between 1 and 3 characters.");
        }
        this.text = `<text x="150" y="125" font-size="60" text-anchor="middle" fill="${color}">${innerHTML}</text>`;
    }

    setShape(shape) {
        this.shape = shape.render();
    }
}


export default SVG