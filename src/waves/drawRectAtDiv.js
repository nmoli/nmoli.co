import drawRect from "./drawRect";

const drawRectAtDiv = (div) => {
  const rect = div.getBoundingClientRect();
  const x = rect.left + window.scrollX;
  const y = rect.top + window.scrollY;
  const width = rect.width;
  const height = rect.height;

  return drawRect({
    x,
    y,
    x2: x + width,
    y2: y + height,
    borderRadius: 15,
    t: 0, // Assuming t is not used in this context
    stepSize: 3,
  });
};

export default drawRectAtDiv;
