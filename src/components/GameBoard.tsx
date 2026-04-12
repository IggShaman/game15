import Cube, { CUBE_W, CUBE_H } from './Cube'
import '../styles/GameBoard.css'

interface GameBoardProps {
  remaining: Set<number>
  onPick: (n: number) => void
}

export default function GameBoard({ remaining, onPick }: GameBoardProps) {
  return (
    <div className="game-board">
      {Array.from({ length: 9 }, (_, i) => {
        const n = i + 1
        const available = remaining.has(n)
        return (
          <div
            key={n}
            className={`cube-cell ${available ? 'available' : 'taken'}`}
            onClick={available ? () => onPick(n) : undefined}
          >
            {available
              ? <Cube number={n} />
              : <div className="cube-placeholder" style={{ width: CUBE_W, height: CUBE_H }} />
            }
          </div>
        )
      })}
    </div>
  )
}
