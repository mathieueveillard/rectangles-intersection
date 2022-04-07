import IdentityFunctor from "./utils/IdentityFunctor";

interface Coordinates {
  readonly x: number;
  readonly y: number;
}

export interface Rectangle {
  readonly topLeft: Coordinates;
  readonly bottomRight: Coordinates;
}

export type Intersection = Rectangle | "NO_INTERSECTION";

const intersectionExists = (intersection: Intersection): intersection is Rectangle =>
  intersection !== "NO_INTERSECTION";

interface TwoRectangles {
  r1: Rectangle;
  r2: Rectangle;
}

export const computeIntersection = ({ r1, r2 }: TwoRectangles): Intersection => {
  if (r2.topLeft.y > r1.topLeft.y && r2.bottomRight.y < r1.bottomRight.y) {
    return {
      topLeft: { x: r2.topLeft.x, y: r1.topLeft.y },
      bottomRight: { x: Math.min(r2.bottomRight.x, r1.bottomRight.x), y: r1.bottomRight.y },
    };
  }

  if (r2.topLeft.y > r1.topLeft.y || r2.topLeft.x < r1.topLeft.x) {
    return backToDefaultProblemByRotation({ r1, r2 });
  }

  if (r2.topLeft.x >= r1.bottomRight.x || r1.bottomRight.y >= r2.topLeft.y) {
    return "NO_INTERSECTION";
  }

  return {
    topLeft: r2.topLeft,
    bottomRight: {
      x: Math.min(r1.bottomRight.x, r2.bottomRight.x),
      y: Math.max(r1.bottomRight.y, r2.bottomRight.y),
    },
  };
};

type Rotation = "Pi/2" | "-Pi/2";

export const rotate =
  (rotation: Rotation) =>
  (rectangle: Rectangle): Rectangle => {
    switch (rotation) {
      case "Pi/2":
        const { topLeft, bottomRight } = rectangle;
        return {
          topLeft: { x: -topLeft.y, y: bottomRight.x },
          bottomRight: { x: -bottomRight.y, y: topLeft.x },
        };
      case "-Pi/2":
        return IdentityFunctor(rectangle) //
          .map(rotate("Pi/2"))
          .map(rotate("Pi/2"))
          .map(rotate("Pi/2"))
          .get();
    }
  };

const backToDefaultProblemByRotation = ({ r1, r2 }: TwoRectangles): Intersection => {
  const intersection = computeIntersection({
    r1: rotate("Pi/2")(r1),
    r2: rotate("Pi/2")(r2),
  });
  if (intersectionExists(intersection)) {
    return rotate("-Pi/2")(intersection);
  }
  return "NO_INTERSECTION";
};
