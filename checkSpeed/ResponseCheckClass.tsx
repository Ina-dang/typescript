import * as React from "react"
import { Component, createRef } from "react"

interface State {
  state: "waiting" | "now" | "ready"
  message: string
  result: number[]
}

class ResponseCheck extends Component<{}, State> {
  state: State = {
    state: "waiting",
    message: "클릭해서 시작하세요",
    result: [],
  }

  timeout: number | null = null
  startTime: number | null = null
  endTime: number | null = null

  onClickScreen = () => {
    const { state } = this.state
    if (state === "waiting") {
      this.timeout = window.setTimeout(() => {
        this.setState({ state: "now", message: "지금 클릭" })
        this.startTime = new Date().getTime()
      }, Math.floor(Math.random() * 1000) + 2000)
      this.setState({ state: "now", message: "초록색이 되면 클릭하세요." })
    } else if (state === "ready") {
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
      this.setState({
        state: "now",
        message: "너무 빨라요! 초록색이 되면 클릭하세요.",
      })
    } else if (state === "now") {
      this.endTime = new Date().getTime()
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요.",
          result: [...prevState.result, this.endTime! - this.startTime!],
        }
      })
      if (this.timeout) {
        clearTimeout(this.timeout)
      }
    }
  }

  onReset = () => {
    this.setState({
      result: [],
    })
  }

  renderAverage = () => {
    const { result } = this.state
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
    )
  }
  render() {
    const { state, message } = this.state
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {this.renderAverage()}
      </>
    )
  }
}

export default ResponseCheck
