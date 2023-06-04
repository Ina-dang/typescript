import * as React from "react"
import { createRoot } from "react-dom/client"

import NumberBaseball from "./NumberBaseball"

const container = document.getElementById("root")
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(<NumberBaseball />)
