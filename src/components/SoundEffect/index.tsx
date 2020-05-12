import React, { FC } from 'react'

type Props = JSX.IntrinsicElements['audio'] & {
  autoPlay?: boolean
}

const SoundEffect: FC<Props> = ({ src, autoPlay = true }: Props) => {
  return (
    <audio autoPlay={autoPlay}>
      <source src={`/sounds/${src}`} type="audio/mpeg" />
    </audio>
  )
}

export default SoundEffect
