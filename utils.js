const isColliding = (pos, element) => {
  if (
    pos.x < element.x ||
    pos.x > element.x + element.width ||
    pos.y < element.y ||
    pos.y > element.y + element.height
  ) {
    return false;
  }
  return true;
};

const drawRect = (element) => {
  ctx.fillStyle = element.fill;
  ctx.strokeStyle = element.stroke;
  ctx.fillRect(element.x, element.y, element.width, element.height);
  ctx.strokeRect(element.x, element.y, element.width, element.height);
};
const fillText = (element) => {
  ctx.textBaseline = "top";
  ctx.fillStyle = element.color;
  ctx.font = element.font;
  ctx.fillText(element.text, element.x, element.y);
  let metrics = ctx.measureText(element.text);
  let fontHeight =
    metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent;
  element.width = Math.ceil(metrics.width);
  element.height = fontHeight;
  return element;
};

const drawAll = (elements) => {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  for (const el in elements) {
    let result = drawFunctions[elements[el].type](elements[el]);
    if (result === undefined) continue;
    elements[el] = result;
  }
};
const drawFunctions = {
  rectangle: (element) => drawRect(element),
  fillText: (element) => fillText(element),
};
const checkMoveBounds = (element) => {
  if (element.x < 0) {
    element.x = 0;
  }
  if (element.x + element.width > CANVAS_WIDTH) {
    element.x = CANVAS_WIDTH - element.width;
  }
  if (element.y < 0) {
    element.y = 0;
  }
  if (element.y + element.height > CANVAS_HEIGHT) {
    element.y = CANVAS_HEIGHT - element.height;
  }
  return element;
};

const checkThreshold = (element, pos) => {
  if (element.type === "fillText") return "center";
  if (pos.x < element.x + THRESHOLD && pos.y < element.y + THRESHOLD) {
    return "top-left";
  }
  if (
    pos.x > element.x + element.width - THRESHOLD &&
    pos.y < element.y + THRESHOLD
  ) {
    return "top-right";
  }
  if (
    pos.x < element.x + THRESHOLD &&
    pos.y > element.y + element.height - THRESHOLD
  ) {
    return "bottom-left";
  }
  if (
    pos.x > element.x + element.width - THRESHOLD &&
    pos.y > element.y + element.height - THRESHOLD
  ) {
    return "bottom-right";
  }
  if (pos.x < element.x + THRESHOLD) {
    return "left";
  }
  if (pos.y < element.y + THRESHOLD) {
    return "top";
  }
  if (pos.x > element.x + element.width - THRESHOLD) {
    return "right";
  }
  if (pos.y > element.y + element.height - THRESHOLD) {
    return "bottom";
  }
  return "center";
};

const printSelected = (element) => {
  var div = document.getElementById("selected");

  div.innerText =
    element === null
      ? "Nothing"
      : `x:${element.x} \r\n y:${element.y} \r\n width:${element.width} \r\n height:${element.height}  `;
};

const checkResizeBounds = (element) => {
  if (element.x < 0) {
    element.x = 0;
  }
  if (element.y < 0) {
    element.y = 0;
  }
  if (element.x + element.width > CANVAS_WIDTH) {
    element.width = CANVAS_WIDTH - element.x;
  }
  if (element.y + element.height > CANVAS_WIDTH) {
    element.height = CANVAS_HEIGHT - element.y;
  }
  return element;
};

const resizeRight = (e) => {
  selectedElement.width += e.offsetX - pos.x;
  selectedElement = checkResizeBounds(selectedElement);
  printSelected(selectedElement);
  delete elements[index];
  elements[index] = selectedElement;
  drawAll(elements);
  pos.x = e.offsetX;
};
const resizeLeft = (e) => {
  if (selectedElement.x != 0) selectedElement.width -= e.offsetX - pos.x;
  selectedElement.x += e.offsetX - pos.x;
  selectedElement = checkResizeBounds(selectedElement);
  printSelected(selectedElement);
  delete elements[index];
  elements[index] = selectedElement;
  drawAll(elements);
  pos.x = e.offsetX;
};
const resizeBottom = (e) => {
  selectedElement.height += e.offsetY - pos.y;
  selectedElement = checkResizeBounds(selectedElement);
  printSelected(selectedElement);
  delete elements[index];
  elements[index] = selectedElement;
  drawAll(elements);
  pos.y = e.offsetY;
};
const resizeTop = (e) => {
  if (selectedElement.y != 0) selectedElement.height -= e.offsetY - pos.y;
  selectedElement.y += e.offsetY - pos.y;
  selectedElement = checkResizeBounds(selectedElement);
  printSelected(selectedElement);
  delete elements[index];
  elements[index] = selectedElement;
  drawAll(elements);
  pos.y = e.offsetY;
};

const resizeBottomRight = (e) => {
  selectedElement.width += e.offsetX - pos.x;
  selectedElement.height += e.offsetY - pos.y;
  selectedElement = checkResizeBounds(selectedElement);
  printSelected(selectedElement);
  delete elements[index];
  elements[index] = selectedElement;
  drawAll(elements);
  pos.x = e.offsetX;
  pos.y = e.offsetY;
};

const resizeBottomLeft = (e) => {
  if (selectedElement.x != 0) selectedElement.width -= e.offsetX - pos.x;
  selectedElement.x += e.offsetX - pos.x;
  selectedElement.height += e.offsetY - pos.y;
  selectedElement = checkResizeBounds(selectedElement);
  printSelected(selectedElement);
  delete elements[index];
  elements[index] = selectedElement;
  drawAll(elements);
  pos.x = e.offsetX;
  pos.y = e.offsetY;
};

const resizeTopLeft = (e) => {
  if (selectedElement.x != 0) selectedElement.width -= e.offsetX - pos.x;
  if (selectedElement.y != 0) selectedElement.height -= e.offsetY - pos.y;
  selectedElement.x += e.offsetX - pos.x;
  selectedElement.y += e.offsetY - pos.y;
  selectedElement = checkResizeBounds(selectedElement);
  printSelected(selectedElement);
  delete elements[index];
  elements[index] = selectedElement;
  drawAll(elements);
  pos.x = e.offsetX;
  pos.y = e.offsetY;
};
const resizeTopRight = (e) => {
  if (selectedElement.y != 0) selectedElement.height -= e.offsetY - pos.y;
  selectedElement.width += e.offsetX - pos.x;
  selectedElement.y += e.offsetY - pos.y;
  selectedElement = checkResizeBounds(selectedElement);
  printSelected(selectedElement);
  delete elements[index];
  elements[index] = selectedElement;
  drawAll(elements);
  pos.x = e.offsetX;
  pos.y = e.offsetY;
};

const moveObject = (e) => {
  selectedElement.x += e.offsetX - pos.x;
  selectedElement.y += e.offsetY - pos.y;
  selectedElement = checkMoveBounds(selectedElement);
  printSelected(selectedElement);
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  delete elements[index];
  elements[index] = selectedElement;
  drawAll(elements);
  pos.x = e.offsetX;
  pos.y = e.offsetY;
};
