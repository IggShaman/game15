import { useState } from 'react'
import { Button, Overlay2, Card, H4 } from '@blueprintjs/core'
import MagicTrickCard from './MagicTrickCard'
import '../styles/RulesCard.css'

interface RulesCardProps {
  isOpen: boolean
  onClose: () => void
}

export default function RulesCard({ isOpen, onClose }: RulesCardProps) {
  const [magicOpen, setMagicOpen] = useState(false)

  return (
    <>
      <Overlay2 isOpen={isOpen} onClose={onClose}>
        <Card className="rules-card" elevation={4}>
          <div className="rules-card-header">
            <H4>How to Play</H4>
            <Button icon="cross" variant="minimal" onClick={onClose} aria-label="Close" />
          </div>
          <ol className="rules-list">
            <li>There are <strong>9 cubes</strong> numbered 1–9 in the common pool.</li>
            <li>Players <strong>alternate turns</strong>, each picking one cube from the pool.</li>
            <li>
              You win if <strong>any 3 cubes from your collection add up to 15</strong> —
              it doesn't matter how many cubes you own in total, only that some
              combination of exactly 3 of them sums to 15.
            </li>
            <li>If all cubes are taken and nobody has won, the game is a <strong>draw</strong>.</li>
          </ol>
          <p className="rules-tip">
            Fun fact: this game is mathematically equivalent to Tic-Tac-Toe played
            on a magic square, where every row, column, and diagonal sums to 15.
            {' '}
            <button className="rules-link" onClick={() => setMagicOpen(true)}>
              Magic trick
            </button>
          </p>
          <Button fill intent="primary" onClick={onClose} style={{ marginTop: 8 }}>Got it</Button>
        </Card>
      </Overlay2>

      <MagicTrickCard isOpen={magicOpen} onClose={() => setMagicOpen(false)} />
    </>
  )
}
