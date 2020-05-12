import React, { FC } from 'react'
import cx from 'classnames'
import './AnswerHistory.scss'

type Props = JSX.IntrinsicElements['div'] & {
  history: string[]
}

const AnswerHistory: FC<Props> = ({ className, history, ...props }: Props) => {
  return (
    <div className={cx('answers', className)} {...props}>
      <div className="h4">CEVAPLAR</div>
      <ul className="list-unstyled">
        {history.map((answer, index) => (
          <li key={index}>
            {index + 1}.) {answer}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default AnswerHistory
