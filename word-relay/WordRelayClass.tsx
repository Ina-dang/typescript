import * as React from "react"
import { Component, createRef } from "react"

interface State {
  word: string
  value: string
  result: string
}

class WordRelayClass extends Component<{}, State> {
  state = {
    word: "이나당",
    value: "",
    result: "",
  }

  onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = this.onRefInput.current //createRef 사용
    if (this.state.word[this.state.word.length - 1] === this.state.value[0]) {
      this.setState((prevState) => {
        return {
          result: prevState.value + "으로 끝말잇기!!",
          word: this.state.value,
          value: "",
        }
      })
      if (this.input) {
        this.input.focus()
      }
    } else {
      this.setState({
        result: "땡",
        value: "",
      })
      if (this.input) {
        this.input.focus()
      }
    }
  }
  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ value: e.target.value })
  }

  input: HTMLInputElement | null = null

  onRefInput = createRef<HTMLInputElement>()

  render() {
    return (
      <>
        <div>{this.state.word} </div>
        <form onSubmit={this.onSubmit}>
          <input
            ref={this.onRefInput}
            value={this.state.value}
            onChange={this.onChange}
          />
          <button>클릭!</button>
        </form>
        <div>{this.state.result}</div>
      </>
    )
  }
}

export default WordRelayClass
