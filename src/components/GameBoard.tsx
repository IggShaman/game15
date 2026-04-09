import Cube from './Cube'
import '../styles/GameBoard.css'

export default function GameBoard() {
  return (
    <div className="game-board">
      {Array.from({ length: 9 }, (_, i) => (
        <div key={i + 1} className="cube-cell">
          <Cube number={i + 1} />
        </div>
      ))}
    </div>
  )
}
