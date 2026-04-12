import { Button, Overlay2, Card, H4 } from '@blueprintjs/core'
import '../styles/MagicTrickCard.css'

interface MagicTrickCardProps {
  isOpen: boolean
  onClose: () => void
}

const GRID = [2, 7, 6, 9, 5, 1, 4, 3, 8]

export default function MagicTrickCard({ isOpen, onClose }: MagicTrickCardProps) {
  return (
    <Overlay2 isOpen={isOpen} onClose={onClose}>
      <Card className="magic-card" elevation={4}>
        <div className="magic-card-header">
          <H4>The Magic Trick</H4>
          <Button icon="cross" minimal onClick={onClose} aria-label="Close" />
        </div>

        <p className="magic-p">
          Arrange the 9 cubes in this 3×3 grid — known as a <strong>magic square</strong>.
          Every row, column, and diagonal adds up to exactly 15.
        </p>

        <div className="magic-square">
          {GRID.map((n, i) => (
            <div
              key={i}
              className="magic-cell"
              style={{ '--hue': `${Math.round((n - 1) / 8 * 240)}` } as React.CSSProperties}
            >
              {n}
            </div>
          ))}
        </div>

        <p className="magic-p">
          Now imagine the two players are playing <strong>Tic-Tac-Toe</strong> on this grid,
          each claiming the square that matches the cube they picked. Three in a row —
          horizontally, vertically, or diagonally — means those three numbers sum to 15,
          which is exactly the winning condition.
        </p>

        <p className="magic-p">
          This means every winning strategy from Tic-Tac-Toe applies here:
          watch for your opponent building a line of two, try to control the
          center (5) and corners (2, 4, 6, 8), and create forks so your
          opponent can't block every threat at once.
        </p>

        <Button fill intent="primary" onClick={onClose} style={{ marginTop: 8 }}>Got it</Button>
      </Card>
    </Overlay2>
  )
}
