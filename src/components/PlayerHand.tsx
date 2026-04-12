import Cube from './Cube'
import type { PlayerSetup } from './NewGameDialog'
import '../styles/PlayerHand.css'

interface PlayerHandProps {
  player: PlayerSetup
  index: number
  tiles: number[]
  isActive: boolean
  winningTiles?: ReadonlySet<number>
}

const SMALL = 0.55

export default function PlayerHand({ player, index, tiles, isActive, winningTiles }: PlayerHandProps) {
  const isWinner = winningTiles && winningTiles.size > 0

  return (
    <div
      className={`player-hand ${isActive ? 'active' : ''} ${isWinner ? 'winner' : ''}`}
      style={{ '--player-color': player.color } as React.CSSProperties}
    >
      <div className="player-hand-header">
        <span className="player-hand-turn-arrow">{isActive ? '▶' : isWinner ? '★' : ''}</span>
        <span className="player-hand-name">P{index + 1}: {player.name}</span>
        <span className="player-hand-count">{tiles.length} cube{tiles.length !== 1 ? 's' : ''}</span>
      </div>
      <div className="player-hand-cubes">
        {tiles.length === 0
          ? <span className="player-hand-empty">—</span>
          : tiles.map(n => (
              <div key={n} className={`player-hand-cube ${winningTiles?.has(n) ? 'winning' : ''}`}>
                <Cube number={n} scale={SMALL} />
              </div>
            ))
        }
      </div>
    </div>
  )
}
