import * as React from "react"
import { Switch, Route } from "react-router-dom"

import "ts-polyfill"

import Application from "./Application"

export default class AppProvider extends React.Component {
	render() {
		return (
			<Switch>
				<Route path="/" render={props => {
					return <Application {...props} />
				}} />
			</Switch>
		)
	}
}