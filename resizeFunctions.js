const MIN_WIDTH = 30;
const MIN_HEIGHT = 30;

const resizeRight = (e) => {
  selectedElement.width += e.offsetX - pos.x;
  selectedElement = checkResizeBounds(selectedElement);
  drawGuides(selectedElement);
  printSelected(selectedElement);
  updateElements(index);
  pos.x = e.offsetX;
};
const resizeLeft = (e) => {
  if (selectedElement.width !== MIN_WIDTH)
    selectedElement.x += e.offsetX - pos.x;
  if (selectedElement.x != 0 ) selectedElement.width -= e.offsetX - pos.x;
  selectedElement = checkResizeBounds(selectedElement);
  console.log(e.offsetX - pos.x)
  drawGuides(selectedElement);
  printSelected(selectedElement);
  updateElements(index);
  pos.x = e.offsetX;
};
const resizeBottom = (e) => {
  selectedElement.height += e.offsetY - pos.y;
  selectedElement = checkResizeBounds(selectedElement);
  drawGuides(selectedElement);
  printSelected(selectedElement);
  updateElements(index);
  pos.y = e.offsetY;
};
const resizeTop = (e) => {
  if (selectedElement.height != MIN_HEIGHT)
    selectedElement.y += e.offsetY - pos.y;
  if (selectedElement.y != 0) selectedElement.height -= e.offsetY - pos.y;

  selectedElement = checkResizeBounds(selectedElement);
  drawGuides(selectedElement);
  printSelected(selectedElement);
  updateElements(index);
  pos.y = e.offsetY;
};

const resizeBottomRight = (e) => {
  selectedElement.width += e.offsetX - pos.x;
  selectedElement.height += e.offsetY - pos.y;
  selectedElement = checkResizeBounds(selectedElement);
  drawGuides(selectedElement);
  printSelected(selectedElement);
  updateElements(index);
  pos.x = e.offsetX;
  pos.y = e.offsetY;
};

const resizeBottomLeft = (e) => {
  if (selectedElement.width !== MIN_WIDTH)
    selectedElement.x += e.offsetX - pos.x;
  if (selectedElement.x != 0) selectedElement.width -= e.offsetX - pos.x;

  selectedElement.height += e.offsetY - pos.y;
  selectedElement = checkResizeBounds(selectedElement);
  drawGuides(selectedElement);
  printSelected(selectedElement);
  updateElements(index);
  pos.x = e.offsetX;
  pos.y = e.offsetY;
};

const resizeTopLeft = (e) => {
  if (selectedElement.width !== MIN_WIDTH)
    selectedElement.x += e.offsetX - pos.x;
  if (selectedElement.height !== MIN_HEIGHT)
    selectedElement.y += e.offsetY - pos.y;
  if (selectedElement.x != 0) selectedElement.width -= e.offsetX - pos.x;
  if (selectedElement.y != 0) selectedElement.height -= e.offsetY - pos.y;
  selectedElement = checkResizeBounds(selectedElement);
  drawGuides(selectedElement);
  printSelected(selectedElement);
  updateElements(index);
  pos.x = e.offsetX;
  pos.y = e.offsetY;
};
const resizeTopRight = (e) => {
  if (selectedElement.height !== MIN_HEIGHT)
    selectedElement.y += e.offsetY - pos.y;
  if (selectedElement.y != 0) selectedElement.height -= e.offsetY - pos.y;
  selectedElement.width += e.offsetX - pos.x;

  selectedElement = checkResizeBounds(selectedElement);
  drawGuides(selectedElement);
  printSelected(selectedElement);
  updateElements(index);
  pos.x = e.offsetX;
  pos.y = e.offsetY;
};

const moveObject = (e) => {
  selectedElement.x += e.offsetX - pos.x;
  selectedElement.y += e.offsetY - pos.y;
  selectedElement = checkMoveBounds(selectedElement);
  drawGuides(selectedElement);
  printSelected(selectedElement);
  updateElements(index);
  pos.x = e.offsetX;
  pos.y = e.offsetY;
};

const drawGuides = (element) => {
  if (element == null) return;
  removeGuides();
  let x1 = element.x;
  let x2 = element.x + element.width;
  let y1 = element.y;
  let y2 = element.y + element.height;
  for (const el in elements) {
    let count = 0;
    let elX1 = elements[el].x;
    let elY1 = elements[el].y;
    let elX2 = elements[el].x + elements[el].width;
    let elY2 = elements[el].y + elements[el].height;
    if (element.order === elements[el].order) continue;
    if (x1 == elX1) {
      let guide = {
        x: x1,
        y: y1 < elY1 ? y1 : elY1,
        width: elX1,
        height: elY2 > y2 ? elY2 : y2,
        type: "guide",
        order: 999,
      };
      elements["guide" + el + count] = guide;
      count++;
    }
    if (x1 == elX2) {
      let guide = {
        x: x1,
        y: y1 < elY1 ? y1 : elY1,
        width: elX2,
        height: elY2 > y2 ? elY2 : y2,
        type: "guide",
        order: 999,
      };
      elements["guide" + el + count] = guide;
      count++;
    }
    if (x2 == elX1) {
      let guide = {
        x: x2,
        y: y1 < elY1 ? y1 : elY1,
        width: elX1,
        height: elY2 > y2 ? elY2 : y2,
        type: "guide",
        order: 999,
      };
      elements["guide" + el + count] = guide;
      count++;
    }
    if (x2 == elX2) {
      let guide = {
        x: x2,
        y: y1 < elY1 ? y1 : elY1,
        width: elX2,
        height: elY2 > y2 ? elY2 : y2,
        type: "guide",
        order: 999,
      };
      elements["guide" + el + count] = guide;
      count++;
    }
    if (y1 == elY1) {
      let guide = {
        x: x1 < elX1 ? x1 : elX1,
        y: y1,
        width: elX2 > x2 ? elX2 : x2,
        height: elY1,
        type: "guide",
        order: 999,
      };
      elements["guide" + el + count] = guide;
      count++;
    }
    if (y1 == elY2) {
      let guide = {
        x: x1 < elX1 ? x1 : elX1,
        y: y1,
        width: elX2 > x2 ? elX2 : x2,
        height: elY2,
        type: "guide",
        order: 999,
      };
      elements["guide" + el + count] = guide;
      count++;
    }
    if (y2 == elY1) {
      let guide = {
        x: x1 < elX1 ? x1 : elX1,
        y: y2,
        width: elX2 > x2 ? elX2 : x2,
        height: elY1,
        type: "guide",
        order: 999,
      };
      elements["guide" + el + count] = guide;
      count++;
    }
    if (y2 == elY2) {
      let guide = {
        x: x1 < elX1 ? x1 : elX1,
        y: y2,
        width: elX2 > x2 ? elX2 : x2,
        height: elY2,
        type: "guide",
        order: 999,
      };
      elements["guide" + el + count] = guide;
      count++;
    }
  }
};
const removeGuides = () => {
  for (const key in elements) {
    if (elements[key].type === "guide") {
      delete elements[key];
    }
  }
};
