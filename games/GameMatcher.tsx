import * as React from "react"
import { Component } from "react"
import { useParams } from "react-router-dom"

import NumberBaseBall from "../number-baseball/NumberBaseballClass"
import RSP from "../rsp/RSPClass"
import Lotto from "../lotto/LottoClass"

const GameMatcher = () => {
  const params = useParams()

  if (!params) {
    return <div>일치하는 게임이 없습니다</div>
  }
  if (params.name === "number-baseball") {
    return <NumberBaseBall />
  } else if (params.name === "rock-scissors-paper") {
    return <RSP />
  } else if (params.name === "lotto-generator") {
    return <Lotto />
  } else {
    return <div>일치하는 게임이 없습니다.</div>
  }
}

export default GameMatcher
