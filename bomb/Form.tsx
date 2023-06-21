import * as React from "react"
import { useEffect, useState, useCallback, useContext, memo } from "react"
import { TableContext } from "./MimeSerach"
import { startGame } from "./action"

const Form = () => {
  const [row, setRow] = useState(10)
  const [cell, setCell] = useState(10)
  const [mine, setMine] = useState(20)
  const { dispatch } = useContext(TableContext)

  const onChangeRow = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value))
  }, [])

  const onChangeCell = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value))
  }, [])

  const onChangeMine = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setRow(Number(e.target.value))
  }, [])

  const onClickBtn = useCallback(() => {
    dispatch(startGame(row, cell, mine))
  }, [row, cell, mine])

  return (
    <div>
      <input
        type="number"
        placeholder="세로"
        value={row}
        onChange={onChangeRow}
      ></input>
      <input
        type="number"
        placeholder="가로"
        value={cell}
        onChange={onChangeCell}
      ></input>
      <input
        type="number"
        placeholder="지뢰"
        value={mine}
        onChange={onChangeMine}
      ></input>
      <button onClick={onClickBtn}>시작</button>
    </div>
  )
}

export default memo(Form)
