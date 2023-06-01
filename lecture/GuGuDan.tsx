import * as React from "react"
import { useState, useRef } from "react"
const GuGuDan = () => {
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9))
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9))
  const [value, setValue] = useState("")
  const [result, setResult] = useState("")
  const inputEl = useRef<HTMLInputElement>(null) // 제너릭 넣어줘야함

  const onSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const input = inputEl.current
    if (parseInt(value) === first * second) {
      setResult("정답")
      setFirst(Math.ceil(Math.random() * 9))
      setSecond(Math.ceil(Math.random() * 9))
      setValue("")
      if (input) {
        input!.focus() //작은 확률이라도 ! 는 에러가 날 수 있으니 조건문에 감싸주기
      }
    } else {
      setResult("땡")
      if (input) {
        input!.focus()
      }
    }
  }

  return (
    <>
      <div>
        {first} * {second} 는 ?
      </div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputEl}
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      <div>{result}</div>
    </>
  )
}

export default GuGuDan
