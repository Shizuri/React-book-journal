import React from 'react'
import './App.css'
import FindBook from './FindBook'
import Journal from './Journal'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'

function App() {
	return (
		<div className='App'>
			<nav style={{paddingBottom: '20px'}}>
				<NavLink to='/' style={{paddingRight: '20px'}}>Find Book</NavLink>
				<NavLink to='/journal'>Book Journal</NavLink>
			</nav>

			<Switch>
				<Route exact path='/'>
					<FindBook />
					{/* <Redirect exact from="/" to="search" /> */}
				</Route>
				<Route exact path='/journal'>
					<Journal />
				</Route>
			</Switch>
		</div>
	)
}

export default App
