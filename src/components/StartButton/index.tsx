import React, { FC } from 'react'
import './StartButton.scss'

type Props = JSX.IntrinsicElements['button']

const StartButton: FC<Props> = (props: Props) => {
  return (
    <button className="btn btn-gameStart" {...props}>
      BAŞLA
    </button>
  )
}

export default StartButton
