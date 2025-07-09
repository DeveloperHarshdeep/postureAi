export const getAngle = (a, b, c) => {
  if (!a || !b || !c) return 180;

  const ab = { x: a.x - b.x, y: a.y - b.y };
  const cb = { x: c.x - b.x, y: c.y - b.y };

  const dot = ab.x * cb.x + ab.y * cb.y;
  const magAB = Math.sqrt(ab.x ** 2 + ab.y ** 2);
  const magCB = Math.sqrt(cb.x ** 2 + cb.y ** 2);

  const angle = Math.acos(dot / (magAB * magCB));
  return Math.round((angle * 180) / Math.PI);
};

export const getDistance = (a, b) => {
  if (!a || !b) return 0;
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
};
