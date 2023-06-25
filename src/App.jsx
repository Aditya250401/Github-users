import React from 'react'
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { GithubProvider } from './context/context'

function App() {
	return (
		<GithubProvider>
			<Router>
				<Switch>
					<Route path="/" exact>
						<Dashboard></Dashboard>
					</Route>
					<Route path="/login">
						<Login />
					</Route>
					<Route path="*">
						<Error />
					</Route>
				</Switch>
			</Router>
		</GithubProvider>
	)
}

export default App
