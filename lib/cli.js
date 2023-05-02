import inquirer from "inquirer";
import { writeFile } from "fs/promises";
// import { Circle, Triangle, Square } from "./shapes"
import SVG from './svg.js';

class Shape {
    constructor() {
        this.color = ""
    }
    setColor(color) {
        this.color = color
    }
}

class Circle extends Shape {
    render() {
        return `<circle cx="150" cy="100" r="80" fill="${this.color}" />`
    }
}

class Triangle extends Shape {
    render() {
        return `<polygon points="150, 18 244, 182 56, 182" fill="${this.color}" />`
    }
}

class Square extends Shape {
    render() {
        return `<rect x="90" y="40" width="120" height="120" fill="${this.color}" />`
    }
}


class CLI {
    run() {
        return inquirer.prompt([
            {
                type: "list",
                name: "shape",
                message: "What shape would you like your SVG to be?",
                choices: ["Circle", "Triangle", "Square"]
            },
            {
                type: "input",
                name: "shapeColor",
                message: "What color would you like your shape to be? (Blue, Red, Green, Purple etc..)"
            },
            {
                type: "input",
                name: "text",
                message: "What 1-3 letters would you like inside your SVG?"
            },
            {
                type: "input",
                name: "textColor",
                message: "What color would you like your text to be? (Blue, Red, Green, Purple etc..)"
            },
        ]).then((res) => {
            const { shape, shapeColor, text, textColor } = res;
            let svgShape;
            if (shape === "Circle") {
                svgShape = new Circle()
            }
            if (shape === "Triangle") {
                svgShape = new Triangle()
            }
            if (shape === "Square") {
                svgShape = new Square()
            }
            svgShape.setColor(shapeColor)
            const result = new SVG()
            result.setShape(svgShape)
            result.setText(text, textColor);
            return writeFile("./examples/logo.svg", result.render())
        })
            .then(() => {
                console.log("Your SVG was created in /examples/logo.svg")
            })
            .catch((err) => {
                console.log(err)
            })
    }
}

export default CLI