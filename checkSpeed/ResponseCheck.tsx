import * as React from "react"
import { useRef, useState, useCallback } from "react"

const ResponseCheck = () => {
  const [state, setState] = useState("waiting")
  const [message, setMessage] = useState("클릭해서 시작하세요.")
  const [result, setResult] = useState<number[]>([])
  const timeout = useRef<number | null>(null) // Ref는 3가지가 오버로딩 되어있어서 3개중에 맞는걸 골라줘야한다.
  const startTime = useRef(0)
  const endTime = useRef(0)

  const onClickScreen = useCallback(() => {
    if (state === "waiting") {
      timeout.current = window.setTimeout(() => {
        // node인지 브라우저인지 확실하게 명시해주기
        setState("now")
        setMessage("지금 클릭")
        startTime.current = new Date().getTime()
        // }, Math.floor(Math.random() * 1000)+ 2000) as unknown as number
        //  뒤에 as unknown as number로 강제로도 가능하지만 window를 붙여주기
      }, Math.floor(Math.random() * 1000) + 2000)
      setState("ready")
      setMessage("초록색이 되면 클릭하세요.")
    } else if (state === "ready") {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
      setState("waiting")
      setMessage("너무 빨라요! 초록색이 되면 클릭하세요.")
    } else if (state === "now") {
      endTime.current = new Date().getTime()
      setState("waiting")
      setMessage("클릭해서 시작하세요.")
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current]
      })
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [state])

  const onReset = useCallback(() => {
    setResult([])
  }, [])

  const renderAverage = useCallback(() => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋</button>
      </>
    )
  }, [])

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {renderAverage()}
    </>
  )
}

export default ResponseCheck
