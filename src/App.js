import React from 'react'
import './App.css'
import BookBrowser from './BookBrowser'
import BookDetails from './BookDetails'
import Journal from './Journal'
import JournaEntryDetails from './JournaEntryDetails'
import EditJournalEntry from './EditJournalEntry'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'

const App = props => {
	return (
		<div className='App'>
			<nav className='App-nav'>
				<NavLink exact to='/book-browser' activeClassName='App-nav-active' className='App-nav-link'>Book Browser</NavLink>
				<NavLink exact to='/journal' activeClassName='App-nav-active' className='App-nav-link'>Book Journal</NavLink>
			</nav>

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
				<Route exact path={'/journal/:bookId'}>
					<JournaEntryDetails />
				</Route>
				<Route exact path={'/journal/edit/:bookId'}>
					<EditJournalEntry />
				</Route>
				<Redirect exact from='/' to='/book-browser' />
			</Switch>
		</div>
	)
}

export default App
