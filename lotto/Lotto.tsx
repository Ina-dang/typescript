import * as React from "react"
import { useState, useRef, useMemo, useCallback } from "react"

function getWinNumbers() {
  console.log("getWinNumbers")
  const candidate = Array(45)
    .fill(null)
    .map((v, i) => i + 1)
  const shuffle = []
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    )
  }
  const bonusNumber = shuffle[shuffle.length - 1]
  const winNumbers = shuffle.slice(0.6).sort((p, c) => p - c)
  return [...winNumbers, bonusNumber]
}

const Lotto = () => {
  const lottoNumbers = useMemo(() => getWinNumbers(), [])
  const [winNumbers, setWinNumbers] = useState(lottoNumbers)
  const [winBalls, setWinballs] = useState<number[]>([])
  const [bonus, setBonus] = useState<number | null>(null)
  const [redo, setRedo] = useState(false)
  const timeouts = useRef<number[]>([])

  const onClickRedo = useCallback(() => {
    setWinNumbers(getWinNumbers())
    setWinballs([])
    setBonus(null)
    setRedo(false)
    timeouts.current = []
  }, [winNumbers])

  return (
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스</div>
      {bonus && <Ball number={bonus} />}
      {redo && <button onClick={onClickRedo}>한 번 더!</button>}
    </>
  )
}

export default Lotto
