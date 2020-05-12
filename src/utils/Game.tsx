import names from '../data/names.json'

export const isCorrectAnswer = (firstAnswer: string, secondAnswer: string, history: string[]) => {
  const hasAnswer = history.find((answer) => answer.toLowerCase() === secondAnswer.toLowerCase())

  if (!secondAnswer || hasAnswer) {
    return false
  }

  const firstAnswersLastChar = firstAnswer[firstAnswer.length - 1].toLowerCase()
  const secondAnswerFirstChar = secondAnswer[0].toLowerCase()

  return firstAnswersLastChar === secondAnswerFirstChar
}

export const getRandomNumber = (max = 5, mistakePossibility = 0) => {
  const mistakePossibilityCount = (max / 100) * mistakePossibility
  const count = max + mistakePossibilityCount
  const random = Math.random() * count

  return Math.floor(random)
}

export const getRandomName = (mistakeProbability = 0, list: string[] = names) => {
  const randomNumber = getRandomNumber(list.length, mistakeProbability)
  return list[randomNumber] || ''
}

export const findNamesByFirstCharacter = (character: string): string[] =>
  names.filter((name) => name[0].toLowerCase() === character[0].toLowerCase())
