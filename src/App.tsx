import { useState } from 'react'
import { Button, H1, H2 } from '@blueprintjs/core'
import NewGameDialog from './components/NewGameDialog'
import GameBoard from './components/GameBoard'
import type { PlayerSetup } from './components/NewGameDialog'

export default function App() {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [players, setPlayers] = useState<[PlayerSetup, PlayerSetup] | null>(null)

  function handleStart(p: [PlayerSetup, PlayerSetup]) {
    setPlayers(p)
  }

  return (
    <div className="app">
      <H1>Game 15</H1>

      {players ? (
        <>
          <div className="player-badges">
            {players.map((p, i) => (
              <div key={i} className="player-badge" style={{ borderColor: p.color }}>
                <span className="player-dot" style={{ background: p.color }} />
                <span style={{ color: p.color }}>{p.name}</span>
              </div>
            ))}
          </div>
          <GameBoard />
        </>
      ) : (
        <H2 className="subtitle">Press New Game to get started</H2>
      )}

      <Button
        intent="primary"
        icon="add"
        large
        onClick={() => setDialogOpen(true)}
      >
        New Game
      </Button>

      <NewGameDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onStart={handleStart}
      />
    </div>
  )
}
