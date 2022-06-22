var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
const CANVAS_WIDTH = 512;
const CANVAS_HEIGHT = 512;
const THRESHOLD = 10;
canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

var elements = {
  "rect-1": {
    x: 150,
    y: 100,
    width: 100,
    height: 100,
    fill: "#3A5BA0",
    stroke: "transparent",
    type: "rectangle",
    order: 3,
  },
  "rect-2": {
    x: 100,
    y: 100,
    width: 100,
    height: 100,
    fill: "#4C3575",
    stroke: "transparent",
    type: "rectangle",
    order: 2,
  },
  "text-1": {
    x: 100,
    y: 300,
    height: 30,
    width: 0,
    font: "30px Arial",
    text: "Hello World",
    color: "#1B2430",
    type: "fillText",
    stroke: "transparent",
    order: 4,
  },
  "image-1": {
    x: 100,
    y: 100,
    height: 200,
    width: 200,
    src: "public/1.jpg",
    image: null,
    stroke: "transparent",
    type: "image",
    order: 1,
  },
};

const functions = {
  center: moveObject,
  right: resizeRight,
  left: resizeLeft,
  bottom: resizeBottom,
  top: resizeTop,
  "bottom-right": resizeBottomRight,
  "bottom-left": resizeBottomLeft,
  "top-left": resizeTopLeft,
  "top-right": resizeTopRight,
};
let selectedFunc = null;
let pos = { x: 0, y: 0 };
let selectedElement = null;
let index = null;

canvas.addEventListener("mousedown", (e) => {
  pos = { x: e.offsetX, y: e.offsetY };
  selectedElement = null;
  index = null;
  const sorted = sortElementsbyOrder(elements);
  for (var el in sorted) {
    if (isColliding(pos, elements[el])) {
      selectedElement = elements[el];
      index = el;
    }
  }

  printSelected(selectedElement);
  if (selectedElement === null) return;

  // selectedElement.stroke = "red";
  drawAll(elements);
  selectedFunc = functions[checkThreshold(selectedElement, pos)];
  canvas.addEventListener("mousemove", selectedFunc);
});

canvas.addEventListener("mouseup", () => {
  if (selectedElement === null) return;
  removeGuides();
  selectedElement.stroke = "transparent";
  drawAll(elements);
  canvas.removeEventListener("mousemove", selectedFunc);
});

canvas.addEventListener("mouseleave", () => {
  if (selectedFunc === null) return;
  removeGuides();
  selectedElement.stroke = "transparent";
  drawAll(elements);
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

appendElements();

drawAll(elements);
