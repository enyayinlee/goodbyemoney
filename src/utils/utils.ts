export const getScaledWH = ({
  curH,
  curW,
  box,
}: {
  curH: number;
  curW: number;
  box?: { height: number; width: number };
}) => {
  if (!box) return { width: curW, height: curH };
  let newW = curW,
    newH = curH;
  if (newW > box.width) {
    newH = resize(curW, curH, box.width);
  }
  if (newH > box.height) {
    return { width: resize(curH, curW, box.height), height: box.height };
  }
  return { width: newW, height: newH };
};

const resize = (fixed: number, adjusted: number, base: number) => {
  return Math.round((fixed * adjusted) / base);
};
