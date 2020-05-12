declare global {
  interface Window {
    webkitSpeechRecognition: any
  }
}

class Speech {
  public result: string | undefined
  public onComplete: Function | undefined
  public recognition: any
  public listenTimeout: ReturnType<typeof setTimeout> | undefined

  constructor() {
    if (!this.isAvailable()) {
      return
    }

    const { webkitSpeechRecognition } = window
    const recognition = new webkitSpeechRecognition()

    recognition.continuous = true
    recognition.interimResults = true
    recognition.onresult = this.handleResult

    this.recognition = recognition
  }

  isAvailable() {
    return 'webkitSpeechRecognition' in window
  }

  async audioPermission() {
    return await navigator.mediaDevices.getUserMedia({ audio: true })
  }

  listen(duration = 5) {
    this.clear()
    this.recognition.start()
    this.setListenTimeout(duration)
  }

  clear() {
    this.result = undefined
  }

  setListenTimeout(duration: number) {
    this.listenTimeout = setTimeout(this.stop, duration * 1000)
  }

  unsetListenTimeout() {
    if (this.listenTimeout) {
      clearTimeout(this.listenTimeout)
    }
  }

  stop = () => {
    this.recognition.stop()
    this.unsetListenTimeout()

    setTimeout(() => {
      this.complete()
    }, 500)
  }

  getFirstWord(): string {
    if (!this.result) {
      return ''
    }

    const splittedResult = this.result.split(' ')
    return splittedResult[0]
  }

  complete() {
    if (!this.onComplete) {
      return
    }

    const firstWord = this.getFirstWord()
    this.onComplete(firstWord)
  }

  handleResult = (event: any) => {
    this.result = event.results[0][0].transcript
  }
}

export default Speech
