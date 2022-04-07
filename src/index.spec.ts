import { computeIntersection, Intersection, Rectangle, rotate } from ".";
import IdentityFunctor from "./utils/IdentityFunctor";

describe("computeIntersection", function () {
  describe("Default case", function () {
    test("Default case", function () {
      /*
       *    * * * * * r1
       *    *       *
       *    *   * * * * * r2
       *    *   *   *   *
       *    * * * * *   *
       *        *       *
       *        * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 0, y: 3 },
        bottomRight: { x: 3, y: 1 },
      };

      const r2: Rectangle = {
        topLeft: { x: 2, y: 2 },
        bottomRight: { x: 4, y: 0 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = {
        topLeft: { x: 2, y: 2 },
        bottomRight: { x: 3, y: 1 },
      };

      expect(actual).toEqual(expected);
    });

    test("[Control]", function () {
      /*    r1
       *    * * * * * * * r2
       *    *   *   *   *
       *    * * * * *   *
       *        *       *
       *        * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 0, y: 2 },
        bottomRight: { x: 3, y: 1 },
      };

      const r2: Rectangle = {
        topLeft: { x: 2, y: 2 },
        bottomRight: { x: 4, y: 0 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = {
        topLeft: { x: 2, y: 2 },
        bottomRight: { x: 3, y: 1 },
      };

      expect(actual).toEqual(expected);
    });

    test("[Control]", function () {
      /*
       *    * * * r1
       *    *   *
       *    * * * * * r2
       *    *   *   *
       *    * * *   *
       *    *       *
       *    * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 2, y: 3 },
        bottomRight: { x: 3, y: 1 },
      };

      const r2: Rectangle = {
        topLeft: { x: 2, y: 2 },
        bottomRight: { x: 4, y: 0 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = {
        topLeft: { x: 2, y: 2 },
        bottomRight: { x: 3, y: 1 },
      };

      expect(actual).toEqual(expected);
    });

    test("[Control]", function () {
      /*    r1
       *    * * * * * r2
       *    *   *   *
       *    * * *   *
       *    *       *
       *    * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 2, y: 3 },
        bottomRight: { x: 3, y: 1 },
      };

      const r2: Rectangle = {
        topLeft: { x: 2, y: 3 },
        bottomRight: { x: 4, y: 0 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected = r1;
      expect(actual).toEqual(expected);
    });

    test("No intersection (x)", function () {
      /*
       *    * * * * * r1
       *    *       *
       *    *       * * * * r2
       *    *       *     *
       *    * * * * *     *
       *            *     *
       *            * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 0, y: 3 },
        bottomRight: { x: 3, y: 1 },
      };

      const r2: Rectangle = {
        topLeft: { x: 3, y: 2 },
        bottomRight: { x: 4, y: 0 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = "NO_INTERSECTION";

      expect(actual).toEqual(expected);
    });

    test("No intersection (y)", function () {
      /*
       *    * * * * * r1
       *    *       *
       *    *       *
       *    *       *
       *    * * * * * * * r2
       *        *       *
       *        * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 0, y: 3 },
        bottomRight: { x: 3, y: 1 },
      };

      const r2: Rectangle = {
        topLeft: { x: 2, y: 1 },
        bottomRight: { x: 4, y: 0 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = "NO_INTERSECTION";
      expect(actual).toEqual(expected);
    });

    test("One 'contains' the other (x)", function () {
      /*    r1
       *    * * * * * * * * *
       *    *   r2          *
       *    *   * * * * *   *
       *    *   *       *   *
       *    * * * * * * * * *
       *        *       *
       *        * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 0, y: 3 },
        bottomRight: { x: 4, y: 1 },
      };

      const r2: Rectangle = {
        topLeft: { x: 2, y: 2 },
        bottomRight: { x: 3, y: 0 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = {
        topLeft: { x: 2, y: 2 },
        bottomRight: { x: 3, y: 1 },
      };

      expect(actual).toEqual(expected);
    });

    test("One 'contains' the other (x)", function () {
      /*
       *        r2
       *        * * * * *
       *    r1  *       *
       *    * * * * * * * * *
       *    *   *       *   *
       *    * * * * * * * * *
       *        *       *
       *        * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 0, y: 2 },
        bottomRight: { x: 3, y: 1 },
      };

      const r2: Rectangle = {
        topLeft: { x: 1, y: 3 },
        bottomRight: { x: 2, y: 0 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = {
        topLeft: { x: 1, y: 2 },
        bottomRight: { x: 2, y: 1 },
      };

      expect(actual).toEqual(expected);
    });

    test("One 'contains' the other (x)", function () {
      /*
       *        r2
       *        * * * * *
       *    r1  *       *
       *    * * * * *   *
       *    *   *   *   *
       *    * * * * *   *
       *        *       *
       *        * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 0, y: 2 },
        bottomRight: { x: 2, y: 1 },
      };

      const r2: Rectangle = {
        topLeft: { x: 1, y: 3 },
        bottomRight: { x: 3, y: 0 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = {
        topLeft: { x: 1, y: 2 },
        bottomRight: { x: 2, y: 1 },
      };

      expect(actual).toEqual(expected);
    });

    test("One 'contains' the other (y)", function () {
      /*
       *    * * * * * r1
       *    *       *
       *    *   * * * * * r2
       *    *   *   *   *
       *    *   * * * * *
       *    *       *
       *    * * * * *
       */
      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 0, y: 3 },
        bottomRight: { x: 3, y: 0 },
      };

      const r2: Rectangle = {
        topLeft: { x: 2, y: 2 },
        bottomRight: { x: 4, y: 1 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = {
        topLeft: { x: 2, y: 2 },
        bottomRight: { x: 3, y: 1 },
      };

      expect(actual).toEqual(expected);
    });

    test("[control]", function () {
      /*    r1
       *    * * * * * * * * *
       *    *   r2          *
       *    *   * * * * *   *
       *    *   *       *   *
       *    *   * * * * *   *
       *    *               *
       *    * * * * * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 0, y: 3 },
        bottomRight: { x: 3, y: 0 },
      };

      const r2: Rectangle = {
        topLeft: { x: 1, y: 2 },
        bottomRight: { x: 2, y: 1 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected = r2;
      expect(actual).toEqual(expected);
    });
  });

  describe("Back to default problem by -Pi/2, then Pi/2 rotation", function () {
    test("Back to default problem", function () {
      /*        r2
       *        * * * * *
       *    r1  *       *
       *    * * * * *   *
       *    *   *   *   *
       *    *   * * * * *
       *    *       *
       *    * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 0, y: 3 },
        bottomRight: { x: 3, y: 1 },
      };

      const r2: Rectangle = {
        topLeft: { x: 2, y: 4 },
        bottomRight: { x: 4, y: 2 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = {
        topLeft: { x: 2, y: 3 },
        bottomRight: { x: 3, y: 2 },
      };

      expect(actual).toEqual(expected);
    });

    test("Back to default problem", function () {
      /*        r1
       *        * * * * *
       *    r2  *       *
       *    * * * * *   *
       *    *   *   *   *
       *    *   * * * * *
       *    *       *
       *    * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 2, y: 4 },
        bottomRight: { x: 4, y: 2 },
      };

      const r2: Rectangle = {
        topLeft: { x: 0, y: 3 },
        bottomRight: { x: 3, y: 1 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = {
        topLeft: { x: 2, y: 3 },
        bottomRight: { x: 3, y: 2 },
      };

      expect(actual).toEqual(expected);
    });

    test("No intersection", function () {
      /*        r2
       *        * * * * *
       *        *       *
       *        * * * * *
       *    r1
       *    * * * * *
       *    *       *
       *    *       *
       *    *       *
       *    * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 0, y: 2 },
        bottomRight: { x: 3, y: 1 },
      };

      const r2: Rectangle = {
        topLeft: { x: 2, y: 4 },
        bottomRight: { x: 4, y: 3 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = "NO_INTERSECTION";

      expect(actual).toEqual(expected);
    });

    test("[control]", function () {
      /*
       *    * * * * * r2
       *    *       *
       *    *   * * * * * r1
       *    *   *   *   *
       *    * * * * *   *
       *        *       *
       *        * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 2, y: 2 },
        bottomRight: { x: 4, y: 0 },
      };

      const r2: Rectangle = {
        topLeft: { x: 0, y: 3 },
        bottomRight: { x: 3, y: 1 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = {
        topLeft: { x: 2, y: 2 },
        bottomRight: { x: 3, y: 1 },
      };

      expect(actual).toEqual(expected);
    });

    test("[control]", function () {
      /*        r1
       *        * * * * *
       *    r2  *       *
       *    * * * * *   *
       *    *   *   *   *
       *    * * * * *   *
       *        *       *
       *        * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 2, y: 4 },
        bottomRight: { x: 4, y: 0 },
      };

      const r2: Rectangle = {
        topLeft: { x: 1, y: 3 },
        bottomRight: { x: 3, y: 1 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = {
        topLeft: { x: 2, y: 3 },
        bottomRight: { x: 3, y: 1 },
      };

      expect(actual).toEqual(expected);
    });

    test("[control]", function () {
      /*        r1
       *        * * * * *
       *    r2  *       *
       *    * * * * * * * * *
       *    *   *       *   *
       *    * * * * * * * * *
       *        *       *
       *        * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 2, y: 4 },
        bottomRight: { x: 3, y: 0 },
      };

      const r2: Rectangle = {
        topLeft: { x: 1, y: 3 },
        bottomRight: { x: 4, y: 1 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = {
        topLeft: { x: 2, y: 3 },
        bottomRight: { x: 3, y: 1 },
      };

      expect(actual).toEqual(expected);
    });

    test("[control]", function () {
      /*        r1
       *        * * * * *
       *        *       *
       *        * * * * *
       *    r2
       *    * * * * *
       *    *       *
       *    *       *
       *    *       *
       *    * * * * *
       */

      // GIVEN
      const r1: Rectangle = {
        topLeft: { x: 2, y: 4 },
        bottomRight: { x: 4, y: 3 },
      };

      const r2: Rectangle = {
        topLeft: { x: 0, y: 2 },
        bottomRight: { x: 3, y: 1 },
      };

      // WHEN
      const actual = computeIntersection({ r1, r2 });

      // THEN
      const expected: Intersection = "NO_INTERSECTION";

      expect(actual).toEqual(expected);
    });
  });
});

describe("rotate", function () {
  test("Pi/2", function () {
    // GIVEN
    const r: Rectangle = {
      topLeft: { x: 1, y: 2 },
      bottomRight: { x: 3, y: 1 },
    };

    // WHEN
    const actual = rotate("Pi/2")(r);

    // THEN
    const expected: Rectangle = {
      topLeft: { x: -2, y: 3 },
      bottomRight: { x: -1, y: 1 },
    };
    expect(actual).toEqual(expected);
  });

  test("[Control]", function () {
    // GIVEN
    const r: Rectangle = {
      topLeft: { x: 1, y: 2 },
      bottomRight: { x: 3, y: 1 },
    };

    // WHEN
    const actual = IdentityFunctor(r) //
      .map(rotate("Pi/2"))
      .map(rotate("Pi/2"))
      .map(rotate("Pi/2"))
      .map(rotate("Pi/2"))
      .get();

    // THEN
    const expected = r;
    expect(actual).toEqual(expected);
  });

  test("-Pi/2", function () {
    // GIVEN
    const r: Rectangle = {
      topLeft: { x: 1, y: 2 },
      bottomRight: { x: 3, y: 1 },
    };

    // WHEN
    const actual = rotate("-Pi/2")(r);

    // THEN
    const expected: Rectangle = {
      topLeft: { x: 1, y: -1 },
      bottomRight: { x: 2, y: -3 },
    };
    expect(actual).toEqual(expected);
  });
});
