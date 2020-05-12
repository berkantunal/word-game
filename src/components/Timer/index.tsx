import React, { FC, useEffect, useState } from 'react'
import cx from 'classnames'
import './Timer.scss'

type Props = JSX.IntrinsicElements['div'] & {
  duration: number
  onTimeout: Function
}

const Timer: FC<Props> = ({ className, duration, onTimeout }: Props) => {
  const [number, setNumber] = useState(0)
  const [animate, setAnimate] = useState(false)

  const incrementNumber = () => {
    setNumber(number + 1)

    if (number === duration) {
      setAnimate(false)
      onTimeout()
      return
    }

    if (!animate) {
      setAnimate(true)
    }
  }

  useEffect(() => {
    const timeout = setTimeout(incrementNumber, 1000)

    return () => {
      clearTimeout(timeout)
    }
  }, [number])

  useEffect(() => {
    incrementNumber()
  }, [])

  return (
    <div className={cx('timer', className)}>
      <div className={cx('timer-number', { 'timer-number-animate': animate })}>{number}</div>
    </div>
  )
}

export default Timer
