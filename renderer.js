var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 512;
const THRESHOLD = 10;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var elements = [
  {
    x: 150,
    y: 100,
    width: 100,
    height: 100,
    fill: "#3A5BA0",
    stroke: "transparent",
    type: "rectangle",
  },
  {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: "blue",
    stroke: "transparent",
    type: "rectangle",
  },
  {
    x: 100,
    y: 300,
    height: 30,
    width: 0,
    font: "30px Arial",
    text: "Hello World",
    color: "red",
    type: "fillText",
  },
];

const functions = {
  center: (e) => moveObject(e),
  right: (e) => resizeRight(e),
  left: (e) => resizeLeft(e),
  bottom: (e) => resizeBottom(e),
  top: (e) => resizeTop(e),
  "bottom-right": (e) => resizeBottomRight(e),
  "bottom-left": (e) => resizeBottomLeft(e),
  "top-left": (e) => resizeTopLeft(e),
  "top-right": (e) => resizeTopRight(e),
};
let selectedFunc = null;
let pos = { x: 0, y: 0 };
let selectedElement = null;
let index = null;

drawAll(elements);

// canvas.addEventListener("click", (e) => {

//   let pos = { x: e.offsetX, y: e.offsetY };
//   let selectedShape = null;
//   let index = null;
//   for (let i = 0; i < shapes.length; i++) {
//     if (isColliding(pos, shapes[i])) {
//       selectedShape = shapes[i];
//       index = i;
//     }
//   }
//   console.log("click");
//   if (selectedShape !== null) {
//     canvas.addEventListener("mousedown", () => {
//       console.log("down");
//       canvas.addEventListener("mousemove", mouseMoveHandler);
//     });
//     canvas.addEventListener("mouseup", () => {
//       console.log("up");
//       canvas.removeEventListener("mousemove", mouseMoveHandler);
//     });
//   }

// });

canvas.addEventListener("mousedown", (e) => {
  pos = { x: e.offsetX, y: e.offsetY };
  selectedElement = null;
  index = null;
  for (let i = 0; i < elements.length; i++) {
    if (isColliding(pos, elements[i])) {
      selectedElement = elements[i];
      index = i;
    }
  }

  printSelected(selectedElement);
  if (selectedElement === null) return;
  elements.splice(index, 1);
  elements.push(selectedElement);
  index = elements.length - 1;
  drawAll(elements);
  selectedFunc = functions[checkThreshold(selectedElement, pos)];
  canvas.addEventListener("mousemove", selectedFunc);
});

canvas.addEventListener("mouseup", () => {
  canvas.style.cursor = `default`;
  if (selectedElement === null) return;
  canvas.removeEventListener("mousemove", selectedFunc);
});

canvas.addEventListener("mouseleave", () => {
  if (selectedFunc === null) return;
  canvas.removeEventListener("mousemove", selectedFunc);
  selectedFunc = null;
});

var download = function () {
  var link = document.createElement("a");
  link.download = "filename.png";
  link.href = document.getElementById("canvas").toDataURL();
  link.click();
};

document.getElementById("download-btn").addEventListener("click", () => {
  download();
});

const printElements = () => {
  const elementsDiv = document.getElementById("elements");

  for (let i = 0; i < elements.length; i++) {
    let element = document.createElement("div");
    element.classList.add("element", "px-2", "py-1");
    element.innerText = `${elements[i].type} - ${i}`;
    element.addEventListener("click", () => {
      selectedElement = elements[i];
      elements.splice(i, 1);
      elements.push(selectedElement);
      index = elements.length - 1;
      drawAll(elements);
    });
    elementsDiv.appendChild(element);
  }
};
printElements();
