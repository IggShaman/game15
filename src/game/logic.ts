// All triplets from {1..9} that sum to 15 — same as the 8 lines of the 3×3 magic square.
export const WINNING_TRIPLETS: readonly [number, number, number][] = [
  [1, 5, 9], [1, 6, 8],
  [2, 4, 9], [2, 5, 8], [2, 6, 7],
  [3, 4, 8], [3, 5, 7],
  [4, 5, 6],
]

/**
 * Returns the first winning triplet found in `tiles`, or null if none exists.
 */
export function findWinningTriplet(tiles: number[]): [number, number, number] | null {
  const owned = new Set(tiles)
  for (const triplet of WINNING_TRIPLETS) {
    if (triplet.every(n => owned.has(n))) return triplet
  }
  return null
}
