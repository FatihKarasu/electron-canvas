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
    metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;
  element.width = Math.ceil(metrics.width);
  element.height = fontHeight;
  ctx.strokeStyle = element.stroke;
  ctx.strokeRect(element.x, element.y, element.width, element.height);
  return element;
};

const drawImage = (element) => {
  if (element.image === null) {
    const image = new Image();
    image.src = element.src;
    element.image = image;
    image.onload = () => {
      ctx.strokeStyle = element.stroke;
      ctx.strokeRect(element.x, element.y, element.width, element.height);
      ctx.drawImage(
        element.image,
        element.x,
        element.y,
        element.width,
        element.height
      );
      drawAll(elements)
    };
    return element;
  } else {
    ctx.strokeStyle = element.stroke;
    ctx.strokeRect(element.x, element.y, element.width, element.height);
    ctx.drawImage(
      element.image,
      element.x,
      element.y,
      element.width,
      element.height
    );
  }
};
const drawAll = (elements) => {
  
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  const sorted = sortElementsbyOrder(elements);
  for (const el in sorted) {
    let result = drawFunctions[elements[el].type](elements[el]);
    if (result === undefined) continue;
    elements[el] = result;
  }
};
const drawGuide = (element) => {
  ctx.strokeStyle ="#990000"
  ctx.beginPath();
  ctx.moveTo(element.x, element.y);
  ctx.lineTo(element.width, element.height);
  ctx.stroke();
};
const drawFunctions = {
  rectangle: (element) => drawRect(element),
  fillText: (element) => fillText(element),
  image: (element) => drawImage(element),
  guide: (element) => drawGuide(element),
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
  if(element.width<30) element.width=30
  if(element.height<30) element.height=30
  return element;
};

const appendElements = () => {
  const elementsDiv = document.getElementById("elements");

  for (const el in elements) {
    let element = document.createElement("div");
    element.classList.add("element", "px-2", "py-1");
    element.innerText = `${elements[el].type} - ${el}`;
    element.addEventListener("click", () => {
      selectedElement = elements[el];
      updateElements(el);
      printSelected(selectedElement)
    });
    elementsDiv.appendChild(element);
  }
};

const updateElements = (key) => {
  delete elements[key];
  elements[key] = selectedElement;
  drawAll(elements);
};

const sortElementsbyOrder = (elements) => {
  const sortable = Object.fromEntries(
    Object.entries(elements).sort(([, a], [, b]) => a.order - b.order)
  );
  return sortable;
};
