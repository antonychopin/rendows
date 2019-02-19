import * as React from "react"
import { RouteComponentProps } from "react-router"

import "styles/main"

export default class Application extends React.Component<RouteComponentProps, any> {
	render() {
		return (
			<h1>Hello, Rendows!</h1>
		)
	}
}