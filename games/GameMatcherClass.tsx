import * as React from "react"
import { Component } from "react"
import NumberBaseBall from "../number-baseball/NumberBaseballClass"
import RSP from "../rsp/RSPClass"
import Lotto from "../lotto/LottoClass"
import { RouteChildrenProps } from "react-router"

class GameMatcherClass extends Component<RouteChildrenProps<{ name: string }>> {
  render() {
    if (!this.props.match) {
      return <div> 일치하는 게임이 없습니다</div>
    }

    let urlSearchParams = new URLSearchParams(
      this.props.location.search.slice(1)
    )
    console.log(urlSearchParams.get("page"))
    if (this.props.match.params.name === "number-baseball") {
      return <NumberBaseBall />
    } else if (this.props.match.params.name === "rock-scissors-paper") {
      return <RSP />
    } else if (this.props.match.params.name === "lotto-generator") {
      return <Lotto />
    }
  }
}
export default GameMatcherClass
