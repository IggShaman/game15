// Cube dimensions
const W = 80   // front face width
const H = 80   // front face height
const DX = 20  // depth offset right (cabinet projection)
const DY = 11  // depth offset up

// SVG canvas size: (W+DX) × (H+DY)
// Front face occupies (0, DY) → (W, DY+H)
// Top face  : parallelogram (0,DY),(W,DY),(W+DX,0),(DX,0)
// Right face: parallelogram (W,DY),(W,DY+H),(W+DX,H),(W+DX,0)

function hsl(h: number, s: number, l: number) {
  return `hsl(${h},${s}%,${l}%)`
}

function cubeColors(n: number) {
  const hue = Math.round(((n - 1) / 8) * 240)
  return {
    front: hsl(hue, 62, 76),
    top:   hsl(hue, 50, 89),
    right: hsl(hue, 68, 56),
  }
}

const STROKE = '#1c1c2e'
const STROKE_W = 2.5

interface CubeProps {
  number: number
}

export default function Cube({ number }: CubeProps) {
  const { front, top, right } = cubeColors(number)
  const uid = `cube-${number}`

  const topPts    = `${0},${DY} ${W},${DY} ${W+DX},${0} ${DX},${0}`
  const rightPts  = `${W},${DY} ${W},${DY+H} ${W+DX},${H} ${W+DX},${0}`

  return (
    <svg
      viewBox={`0 0 ${W + DX} ${H + DY}`}
      width={W + DX}
      height={H + DY}
      style={{ overflow: 'visible', display: 'block' }}
      aria-label={`Tile ${number}`}
    >
      <defs>
        {/* Subtle highlight gradient on the front face */}
        <linearGradient id={`${uid}-grad`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%"   stopColor="white" stopOpacity="0.28" />
          <stop offset="55%"  stopColor="white" stopOpacity="0" />
          <stop offset="100%" stopColor="black" stopOpacity="0.08" />
        </linearGradient>

        {/* Drop shadow for the whole cube */}
        <filter id={`${uid}-shadow`} x="-10%" y="-10%" width="130%" height="140%">
          <feDropShadow dx="3" dy="5" stdDeviation="4" floodColor="rgba(0,0,0,0.22)" />
        </filter>
      </defs>

      <g filter={`url(#${uid}-shadow)`}>
        {/* Top face */}
        <polygon
          points={topPts}
          fill={top}
          stroke={STROKE}
          strokeWidth={STROKE_W}
          strokeLinejoin="round"
        />

        {/* Right face */}
        <polygon
          points={rightPts}
          fill={right}
          stroke={STROKE}
          strokeWidth={STROKE_W}
          strokeLinejoin="round"
        />

        {/* Front face — base color */}
        <rect
          x={0} y={DY} width={W} height={H}
          fill={front}
          stroke={STROKE}
          strokeWidth={STROKE_W}
        />

        {/* Front face — gradient overlay */}
        <rect
          x={0} y={DY} width={W} height={H}
          fill={`url(#${uid}-grad)`}
        />

        {/* Subtle inner highlight lines (top + left edge of front face) */}
        <line
          x1={5} y1={DY + 5} x2={W - 5} y2={DY + 5}
          stroke="white" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round"
        />
        <line
          x1={5} y1={DY + 5} x2={5} y2={DY + H - 5}
          stroke="white" strokeOpacity="0.35" strokeWidth="2.5" strokeLinecap="round"
        />

        {/* Number label */}
        <text
          x={W / 2}
          y={DY + H / 2 + 1}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize="34"
          fontWeight="800"
          fontFamily="system-ui, 'Segoe UI', sans-serif"
          fill={STROKE}
          style={{ userSelect: 'none', paintOrder: 'stroke' }}
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="4"
        >
          {number}
        </text>
      </g>
    </svg>
  )
}
