import * as React from "react"
import * as ReactDOM from "react-dom"
import {  BrowserRouter } from "react-router-dom"

import Provider from "./Provider"

ReactDOM.render(
	<BrowserRouter>
		<Provider />
	</BrowserRouter>,
	document.getElementById("__root")
)