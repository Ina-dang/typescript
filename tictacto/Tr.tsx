import * as React from "react"
import { Dispatch, useMemo, memo, FC } from "react"
import Td from "./Td"

interface Props {
  rowData: string[]
  rowIndex: number
  dispatch: Dispatch<any>
}

const Tr: FC<Props> = memo(({ rowData, rowIndex, dispatch }) => {
  return (
    <tr>
      {Array(rowData.length)
        .fill(null)
        .map((tr, i) =>
          useMemo(
            () => (
              <Td
                key={i}
                dispatch={dispatch}
                rowIndex={rowIndex}
                cellIndex={i}
                cellData={rowData[i]}
              >
                {""}
              </Td>
            ),
            [rowData[i]]
          )
        )}
    </tr>
  )
})

export default Tr
