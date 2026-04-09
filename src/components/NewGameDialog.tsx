import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  FormGroup,
  InputGroup,
} from '@blueprintjs/core'

export interface PlayerSetup {
  name: string
  color: string
}

interface NewGameDialogProps {
  isOpen: boolean
  onClose: () => void
  onStart: (players: [PlayerSetup, PlayerSetup]) => void
}

const COLORS = [
  { value: '#E05C5C', label: 'Red' },
  { value: '#E07A2F', label: 'Orange' },
  { value: '#D4A017', label: 'Gold' },
  { value: '#5A9E5A', label: 'Green' },
  { value: '#2E9E8A', label: 'Teal' },
  { value: '#3D7EC9', label: 'Blue' },
  { value: '#7B52C9', label: 'Purple' },
  { value: '#C94F8A', label: 'Pink' },
]

const FUNNY_NAMES = [
  'Lee Know-it-All',
  'Changbin-go!',
  'HyunJin Tiles',
  'Felix Lucky Draw',
  'Bang Chan-cellor',
  'Seungmin-imum Effort',
  'I.N-vincible',
  'Han-dling It',
]

function ColorPicker({
  value,
  onChange,
  disabledColor,
}: {
  value: string
  onChange: (c: string) => void
  disabledColor?: string
}) {
  return (
    <div className="color-picker">
      {COLORS.map((c) => (
        <button
          key={c.value}
          className={`color-swatch${value === c.value ? ' selected' : ''}${disabledColor === c.value ? ' disabled' : ''}`}
          style={{ background: c.value }}
          title={c.label}
          disabled={disabledColor === c.value}
          onClick={() => onChange(c.value)}
          aria-label={c.label}
          aria-pressed={value === c.value}
          type="button"
        />
      ))}
    </div>
  )
}

export default function NewGameDialog({ isOpen, onClose, onStart }: NewGameDialogProps) {
  const [p1, setP1] = useState<PlayerSetup>({ name: FUNNY_NAMES[0], color: COLORS[0].value })
  const [p2, setP2] = useState<PlayerSetup>({ name: FUNNY_NAMES[1], color: COLORS[5].value })

  function handleStart() {
    onStart([p1, p2])
    onClose()
  }

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="New Game" icon="people">
      <DialogBody>
        <div className="player-setup-grid">
          <div className="player-setup">
            <h3 style={{ color: p1.color }}>Player 1</h3>
            <FormGroup label="Name">
              <InputGroup
                value={p1.name}
                onChange={(e) => setP1({ ...p1, name: e.target.value })}
                leftIcon="person"
              />
            </FormGroup>
            <FormGroup label="Color">
              <ColorPicker
                value={p1.color}
                onChange={(color) => setP1({ ...p1, color })}
                disabledColor={p2.color}
              />
            </FormGroup>
          </div>

          <div className="player-setup-divider" />

          <div className="player-setup">
            <h3 style={{ color: p2.color }}>Player 2</h3>
            <FormGroup label="Name">
              <InputGroup
                value={p2.name}
                onChange={(e) => setP2({ ...p2, name: e.target.value })}
                leftIcon="person"
              />
            </FormGroup>
            <FormGroup label="Color">
              <ColorPicker
                value={p2.color}
                onChange={(color) => setP2({ ...p2, color })}
                disabledColor={p1.color}
              />
            </FormGroup>
          </div>
        </div>
      </DialogBody>

      <DialogFooter
        actions={
          <>
            <Button onClick={onClose}>Cancel</Button>
            <Button
              intent="primary"
              icon="play"
              onClick={handleStart}
              disabled={!p1.name.trim() || !p2.name.trim()}
            >
              Start Game
            </Button>
          </>
        }
      />
    </Dialog>
  )
}
