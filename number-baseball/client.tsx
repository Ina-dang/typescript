import * as React from "react"
import { createRoot } from "react-dom/client"

import NumberBaseballClass from "./NumberBaseballClass"

const container = document.getElementById("root")
const root = createRoot(container!) // createRoot(container!) if you use TypeScript
root.render(<NumberBaseballClass />)
