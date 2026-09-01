export interface BoundingBox {
  x: number;
  y: number;
  w: number;
  h: number;
}

export function checkOverlap(boxA: BoundingBox, boxB: BoundingBox, margin = 4): boolean {
  return (
    boxA.x < boxB.x + boxB.w + margin &&
    boxA.x + boxA.w + margin > boxB.x &&
    boxA.y < boxB.y + boxB.h + margin &&
    boxA.y + boxA.h + margin > boxB.y
  );
}

/**
 * Calculates a non-overlapping position for a pin by shifting it vertically if collisions are detected.
 */
export function getNonOverlappingPosition(
  initialBox: BoundingBox,
  existingBoxes: BoundingBox[],
  stepY = 40,
  maxAttempts = 10
): BoundingBox {
  let currentBox = { ...initialBox };
  let attempts = 0;

  while (attempts < maxAttempts) {
    const hasCollision = existingBoxes.some((placed) => checkOverlap(currentBox, placed));
    if (!hasCollision) {
      break;
    }
    // Shift down to clear collision
    currentBox.y += stepY;
    attempts++;
  }

  return currentBox;
}
