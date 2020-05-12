import React, { FC } from 'react'

type Props = JSX.IntrinsicElements['audio'] & {
  autoPlay?: boolean
}

const SoundEffect: FC<Props> = ({ src, autoPlay = true }: Props) => {
  return (
    <audio autoPlay={autoPlay}>
      <source src={`/sounds/${src}`} type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  )
}

export default SoundEffect
