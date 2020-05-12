import React, { FC } from 'react'
import cx from 'classnames'
import './GameOver.scss'
import SoundEffect from '../SoundEffect'

type Props = JSX.IntrinsicElements['div'] & {
  loser: string | undefined
  score: number
}

const GameOver: FC<Props> = ({ className, loser, score }: Props) => {
  if (!loser) {
    return null
  }

  return (
    <div className={cx('game-over text-center', className)}>
      <div className="h1">{loser === 'gamer' ? 'Kaybettin :(' : 'Kazandın :)'}</div>
      <div className="h4">Score: {score}</div>
      <SoundEffect src={loser === 'gamer' ? 'lose-alert.mp3' : 'win-alert.mp3'} />
    </div>
  )
}

export default GameOver
