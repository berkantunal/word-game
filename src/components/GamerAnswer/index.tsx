import React, { FC } from 'react'
import cx from 'classnames'
import './GamerAnswer.scss'

type Props = JSX.IntrinsicElements['div'] & {
  top?: boolean
  bottom?: boolean
  active?: boolean
  placeholder: string
}

const GamerAnswer: FC<Props> = ({
  active,
  className,
  top,
  bottom,
  children,
  placeholder,
}: Props) => {
  return (
    <div
      className={cx(
        'gamer-answer',
        { 'gamer-answer-active': active, 'gamer-answer-top': top, 'gamer-answer-bottom': bottom },
        className
      )}
    >
      {active ? placeholder : children}
    </div>
  )
}

export default GamerAnswer
