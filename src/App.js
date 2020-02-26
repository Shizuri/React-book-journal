import React from 'react'
import './App.css'
import BookBrowser from './BookBrowser'
import BookDetails from './BookDetails'
import Journal from './Journal'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'

function App() {
	return (
		<div className='App'>
			<nav style={{ marginTop: '2px' }}>
				<NavLink exact to='/book-browser' activeClassName='App-nav-active' style={{ marginRight: '20px' }}>Book Browser</NavLink>
				<NavLink exact to='/journal' activeClassName='App-nav-active'>Book Journal</NavLink>
			</nav>
			<hr style={{ marginBottom: '20px' }} />

			<Switch>
				<Route exact path='/book-browser'>
					<BookBrowser />
				</Route>
				<Route exact path='/journal'>
					<Journal />
				</Route>
				<Route exact path={'/book-browser/:bookId'}>
					<BookDetails />
				</Route>
				<Redirect exact from='/' to='/book-browser' />
			</Switch>
		</div>
	)
}

export default App
