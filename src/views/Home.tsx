import React, { Component } from 'react'

import StartButton from '../components/StartButton'
import Timer from '../components/Timer'
import GamerAnswer from '../components/GamerAnswer'
import AnswerHistory from '../components/AnswerHistory'
import GameOver from '../components/GameOver'
import SoundEffect from '../../src/components/SoundEffect'
import * as Game from '../utils/Game'

import Speech from '../libs/Speech'

type Props = {
  speech: Speech
}

type State = {
  whoseTurn?: string
  timer: boolean
  start: boolean
  history: string[]
  answers: { computer: string; gamer: string }
  loser?: string
  score: number
}

class Home extends Component<Props, State> {
  duration = 5 // 5 seconds
  mistakeProbability = 20 // 20 percent
  speech: Speech

  constructor(props: Props) {
    super(props)

    this.speech = this.props.speech

    this.state = {
      whoseTurn: undefined,
      timer: false,
      start: false,
      history: [],
      answers: { computer: '', gamer: '' },
      loser: undefined,
      score: 0,
    }

    this.handleClickStart = this.handleClickStart.bind(this)
    this.handleTimeout = this.handleTimeout.bind(this)
    this.handleSpeechComplete = this.handleSpeechComplete.bind(this)
  }

  componentDidMount() {
    this.speech.onComplete = this.handleSpeechComplete
  }

  start() {
    this.setState({ start: true })
    this.computerGuess()
  }

  addAnswerToHistory(answer: string) {
    const history = [...this.state.history]
    history.push(answer)

    return history
  }

  setAnswer(whose: string, answer: string) {
    const history = this.addAnswerToHistory(answer)

    this.setState(({ answers }) => ({
      answers: { ...answers, [whose]: answer },
      history,
    }))
  }

  changeTurn(whose?: string) {
    this.setState(() => ({ whoseTurn: whose }))
  }

  setTimer(state: boolean) {
    this.setState(() => ({ timer: state }))
  }

  increaseScore() {
    this.setState(({ score }) => ({ score: score + 1 }))
  }

  listenGamer = () => {
    this.changeTurn('gamer')
    this.setTimer(true)
    this.speech.listen()
  }

  finish(loser: string) {
    this.setState(() => ({ loser }))
  }

  computerGuess(answer?: string) {
    const { answers, history } = this.state
    let randomName: string
    let timeout = Game.getRandomNumber(this.duration) * 1000

    if (answer) {
      const lastChar = answer[answer.length - 1]
      const names = Game.findNamesByFirstCharacter(lastChar)
      randomName = Game.getRandomName(this.mistakeProbability, names)

      this.changeTurn('computer')
      this.setTimer(true)

      if (!Game.isCorrectAnswer(answers.gamer, randomName, history)) {
        this.finish('computer')
        return
      }
    } else {
      randomName = Game.getRandomName()
      timeout = 0
    }

    setTimeout(() => {
      this.setAnswer('computer', randomName)
      this.setTimer(false)
      this.listenGamer()
    }, timeout)
  }

  handleSpeechComplete(guess: string) {
    const { answers, history } = this.state
    this.setAnswer('gamer', guess)
    this.changeTurn()

    if (Game.isCorrectAnswer(answers.computer, guess, history)) {
      this.increaseScore()
      this.computerGuess(guess)
      return
    }

    this.finish('gamer')
  }

  handleTimeout() {
    this.setTimer(false)
  }

  handleClickStart() {
    this.start()
  }

  render() {
    const { start, score, loser, whoseTurn, answers, timer, history } = this.state

    if (!start) {
      return <StartButton onClick={this.handleClickStart} />
    }

    if (loser) {
      return <GameOver loser={loser} score={score} />
    }

    return (
      <>
        <AnswerHistory history={history} />
        {timer && <Timer onTimeout={this.handleTimeout} duration={this.duration} />}

        <GamerAnswer top active={whoseTurn === 'computer'} placeholder="BENİM SIRAM">
          {answers.computer}
        </GamerAnswer>
        <GamerAnswer bottom active={whoseTurn === 'gamer'} placeholder="SENİN SIRAN">
          {answers.gamer}
        </GamerAnswer>

        {score > 0 && <SoundEffect key={score} src="confirm-alert.mp3" />}
      </>
    )
  }
}

export default Home
