import React from 'react'
import './App.css'
import BookBrowser from './BookBrowser'
import BookDetails from './BookDetails'
import Journal from './Journal'
import JournaEntryDetails from './JournaEntryDetails'
import EditJournalEntry from './EditJournalEntry'
import { NavLink, Route, Switch, Redirect, useHistory } from 'react-router-dom'

const App = props => {
	// The code here is for the purpose of swipe navigation on mobile devices
	const history = useHistory()

	// Swipe Up / Down / Left / Right
	let initialX = null
	let initialY = null

	const startTouch = e => {
		initialX = e.touches[0].clientX
		initialY = e.touches[0].clientY
	}

	const moveTouch = e => {
		if (!initialX || !initialY) {
			return
		}

		const currentX = e.touches[0].clientX
		const currentY = e.touches[0].clientY

		const diffX = initialX - currentX
		const diffY = initialY - currentY

		if (Math.abs(diffX) > Math.abs(diffY)) {
			// sliding horizontally
			if (diffX > 0) {
				// swiped left
				if (history.location.pathname === '/book-browser') {
					history.push('/journal')
				}
			} else {
				// swiped right
				if (history.location.pathname === '/journal') {
					history.push('/book-browser')
				}
			}
		} else {
			// sliding vertically
			if (diffY > 0) {
				// swiped up
			} else {
				// swiped down
			}
		}

		initialX = null
		initialY = null

		e.preventDefault()
	}

	document.addEventListener('touchstart', startTouch, false)
	document.addEventListener('touchmove', moveTouch, false)

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
