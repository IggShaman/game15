import { useState } from 'react'
import { Button, H1, H2 } from '@blueprintjs/core'
import NewGameDialog from './components/NewGameDialog'
import GameBoard from './components/GameBoard'
import PlayerHand from './components/PlayerHand'
import RulesCard from './components/RulesCard'
import type { PlayerSetup } from './components/NewGameDialog'
import { findWinningTriplet } from './game/logic'
import './styles/RulesCard.css'

const ALL_TILES = [1, 2, 3, 4, 5, 6, 7, 8, 9]

type Outcome = { kind: 'win'; player: 0 | 1; triplet: [number, number, number] } | { kind: 'draw' }

interface GameState {
  players: [PlayerSetup, PlayerSetup]
  remaining: Set<number>
  owned: [number[], number[]]
  currentPlayer: 0 | 1
  outcome: Outcome | null
}

export default function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [rulesOpen, setRulesOpen] = useState(false)
  const [game, setGame] = useState<GameState | null>(null)

  function handleStart(players: [PlayerSetup, PlayerSetup]) {
    setGame({
      players,
      remaining: new Set(ALL_TILES),
      owned: [[], []],
      currentPlayer: 0,
      outcome: null,
    })
  }

  function handlePick(n: number) {
    setGame(prev => {
      if (!prev || prev.outcome !== null) return prev

      const picker = prev.currentPlayer
      const newOwned: [number[], number[]] = [prev.owned[0].slice(), prev.owned[1].slice()]
      newOwned[picker] = [...newOwned[picker], n].sort((a, b) => a - b)

      const newRemaining = new Set(prev.remaining)
      newRemaining.delete(n)

      // Check win for the player who just picked
      const triplet = findWinningTriplet(newOwned[picker])
      if (triplet) {
        return { ...prev, owned: newOwned, remaining: newRemaining, outcome: { kind: 'win', player: picker, triplet } }
      }

      // Check draw: board empty, no winner
      if (newRemaining.size === 0) {
        return { ...prev, owned: newOwned, remaining: newRemaining, outcome: { kind: 'draw' } }
      }

      return { ...prev, owned: newOwned, remaining: newRemaining, currentPlayer: picker === 0 ? 1 : 0 }
    })
  }

  const winningTiles: [ReadonlySet<number>, ReadonlySet<number>] = [new Set(), new Set()]
  if (game?.outcome?.kind === 'win') {
    winningTiles[game.outcome.player] = new Set(game.outcome.triplet)
  }

  return (
    <div className="app">
      <H1>Game 15</H1>

      {game ? (
        <div className="game-layout">
          {/* Turn / result indicator */}
          {game.outcome === null ? (
            <div className="turn-indicator" style={{ color: game.players[game.currentPlayer].color }}>
              <span className="turn-dot" style={{ background: game.players[game.currentPlayer].color }} />
              {game.players[game.currentPlayer].name}'s turn
            </div>
          ) : (
            <div className={`result-banner ${game.outcome.kind}`}
              style={game.outcome.kind === 'win'
                ? { '--win-color': game.players[game.outcome.player].color } as React.CSSProperties
                : undefined}
            >
              {game.outcome.kind === 'win'
                ? <>{game.players[game.outcome.player].name} wins! <span className="result-hint">({game.outcome.triplet.join(' + ')} = 15)</span></>
                : "It's a draw!"
              }
            </div>
          )}

          <GameBoard remaining={game.remaining} onPick={game.outcome ? () => {} : handlePick} />

          <div className="player-hands">
            {game.players.map((p, i) => (
              <PlayerHand
                key={i}
                player={p}
                index={i}
                tiles={game.owned[i]}
                isActive={game.outcome === null && game.currentPlayer === i}
                winningTiles={winningTiles[i]}
              />
            ))}
          </div>
        </div>
      ) : (
        <H2 className="subtitle">Press New Game to get started</H2>
      )}

      <Button intent="primary" icon="add" large onClick={() => setDialogOpen(true)}>
        New Game
      </Button>

      <NewGameDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onStart={handleStart}
      />

      <Button
        className="rules-fab"
        intent="none"
        onClick={() => setRulesOpen(true)}
        aria-label="Game rules"
      >?</Button>

      <RulesCard isOpen={rulesOpen} onClose={() => setRulesOpen(false)} />
    </div>
  )
}
