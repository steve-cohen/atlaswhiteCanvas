import React from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './Components/Home/Home'
import Search from './Components/Search/Search'
import './App.css'

function App() {
	return (
		<div className='App'>
			<Switch>
				<Route exact path='/' component={Home} />
				<Route path='/*' component={Search} />
			</Switch>
		</div>
	)
}

export default App
