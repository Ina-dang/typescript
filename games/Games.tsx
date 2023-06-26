import * as React from "react"
import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import GameMatcher from "./GameMatcherClass"
import GameMatcherClass from "./GameMatcherClass"

const Games = () => {
  return (
    <BrowserRouter>
      <div>
        <Link to="/game/number-baseball?limit=10&skip=5&page=3">숫자야구</Link>
        &nbsp;
        <Link to="/game/rock-scissors-paper">가위바위보</Link>
        &nbsp;
        <Link to="/game/lotto-generator">로또생성기</Link>
        &nbsp;
        <Link to="/game/index">게임 매쳐</Link>
      </div>
      <div>
        <Routes>
          <Route path="/" Component={GameMatcher} />
          <Route path="/game/:name" Component={GameMatcher} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default Games
